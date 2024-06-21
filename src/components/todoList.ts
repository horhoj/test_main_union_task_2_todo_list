import { EntityIdContract } from './../contracts/contracts';
import { TodoStatusContract } from '~/contracts/contracts';
import { mount } from '~/helpers';
import { mockApiGate } from '~/mockApiGate';
import { MockApiGate } from '~/mockApiGate/mockApiGate';

interface TodoListDependency {
  mockApiGate: MockApiGate;
}

class TodoList {
  private WRAPPER_ID = 'todo-list-wrapper';
  private LIST_ID = 'todo-list';
  private FILTERS_ID = 'filters';
  private FILTERS_BTN = 'filters-filters-btn';
  private CHANGE_IS_DONE_BTN = 'change-is-done-btn';
  private DELETE_BTN = 'delete-btn';
  private DATA_ATTR_CLK_EL_BTN = 'data-clk-el-btn';
  private DATA_ATTR_ID = 'data-id';
  private ADD_FORM_ID = 'add-form';
  private ADD_FORM_INPUT_ID = 'add-form-input';
  private dependency: TodoListDependency;
  private todoStatus: TodoStatusContract = TodoStatusContract.ALL;

  public constructor(dependency: TodoListDependency) {
    this.dependency = dependency;
  }

  private onClick = (e: MouseEvent) => {
    const element = e.target as HTMLElement;
    const id = element.getAttribute(this.DATA_ATTR_ID);
    const dataBtn = element.getAttribute(this.DATA_ATTR_CLK_EL_BTN);
    if (dataBtn === this.CHANGE_IS_DONE_BTN && id !== null) {
      this.changeIsDoneStatus(id);
    }
    if (dataBtn === this.FILTERS_BTN && id !== null) {
      this.changeTodoStatus(id as TodoStatusContract);
    }
    if (dataBtn === this.DELETE_BTN && id !== null) {
      this.deleteTodo(id);
    }
  };

  private changeTodoStatus(todoStatus: TodoStatusContract) {
    this.todoStatus = todoStatus;
    this.filtersRender();
    this.todoListRender();
  }

  private changeIsDoneStatus(id: EntityIdContract) {
    this.dependency.mockApiGate.toggleDone({ todoId: id });
    this.todoListRender();
  }

  private deleteTodo(id: EntityIdContract) {
    this.dependency.mockApiGate.deleteTodo({ todoId: id });
    this.todoListRender();
  }

  private addFormSubmit = (e: SubmitEvent) => {
    e.preventDefault();
    const input = document.getElementById(this.ADD_FORM_INPUT_ID);
    if (input) {
      const value = (input as HTMLInputElement).value.trim();
      if (value.length > 0) {
        this.dependency.mockApiGate.addTodo({ todoBody: { isDone: false, text: value } });
        this.todoListRender();
        (input as HTMLInputElement).value = '';
      }
    }
  };

  private wrapperRender() {
    mount(
      'body',
      ` 
        <div class="todo_list_widget" id=${this.WRAPPER_ID}>
          <div class="filters" id="${this.FILTERS_ID}"></div>
          <form class="add-form" id=${this.ADD_FORM_ID} autocomplete="off">
            <input placeholder="Введите текст" id="${this.ADD_FORM_INPUT_ID}" autocomplete="off" />
            <button type="submit"></button>
          </form>
          <ul class="todo-list" id="${this.LIST_ID}"></ul>
        </div>
      `,
    );
    const wrapper = document.getElementById(this.WRAPPER_ID);
    if (wrapper) {
      wrapper.addEventListener('click', this.onClick);
    }
    const addForm = document.getElementById(this.ADD_FORM_ID);
    if (addForm) {
      addForm.addEventListener('submit', this.addFormSubmit);
    }
  }

  private filtersRender() {
    const wrapper = document.getElementById(this.FILTERS_ID);
    if (wrapper) {
      while (wrapper.firstChild && wrapper.lastChild) {
        wrapper.removeChild(wrapper.lastChild);
      }

      const allClass = this.todoStatus === TodoStatusContract.ALL ? 'active' : '';
      const completedClass = this.todoStatus === TodoStatusContract.COMPLETED ? 'active' : '';
      const activeClass = this.todoStatus === TodoStatusContract.ACTIVE ? 'active' : '';

      const filters = `
        <button class="${allClass}" ${this.DATA_ATTR_CLK_EL_BTN}="${this.FILTERS_BTN}" ${this.DATA_ATTR_ID}="${TodoStatusContract.ALL}">Все</button>
        <button class="${completedClass}" ${this.DATA_ATTR_CLK_EL_BTN}="${this.FILTERS_BTN}" ${this.DATA_ATTR_ID}="${TodoStatusContract.COMPLETED}">Выполненные</button>
        <button class="${activeClass}" ${this.DATA_ATTR_CLK_EL_BTN}="${this.FILTERS_BTN}" ${this.DATA_ATTR_ID}="${TodoStatusContract.ACTIVE}">Активные</button>
      `;
      wrapper.innerHTML = filters;
    }
  }

  private todoListRender() {
    const todoList = this.dependency.mockApiGate.fetchTodoList({ todoStatus: this.todoStatus });
    const wrapper = document.getElementById(this.LIST_ID);
    if (wrapper) {
      while (wrapper.firstChild && wrapper.lastChild) {
        wrapper.removeChild(wrapper.lastChild);
      }

      for (const todo of todoList) {
        const checkBtnClass = 'check-btn ' + (todo.isDone ? 'complete' : '');
        const txtClass = 'txt ' + (todo.isDone ? 'complete' : '');
        const deleteBtnClass = 'delete-btn';
        const todoItem = `
          <button class="${checkBtnClass}" ${this.DATA_ATTR_ID}=${todo.id} ${this.DATA_ATTR_CLK_EL_BTN}="${this.CHANGE_IS_DONE_BTN}">${todo.isDone ? 'X' : ''}</button>
          <div class="${txtClass}">${todo.text}</div>
          <button class="${deleteBtnClass}" ${this.DATA_ATTR_ID}=${todo.id} ${this.DATA_ATTR_CLK_EL_BTN}="${this.DELETE_BTN}">X</button>
        `;
        const child = document.createElement('ul');
        child.className = 'todo-item_wrapper';
        child.innerHTML = todoItem;
        wrapper.appendChild(child);
      }

      if (todoList.length === 0) {
        const child = document.createElement('ul');
        child.innerText = 'Ничего не найдено';
        wrapper.appendChild(child);
      }
    }
  }

  public mount() {
    this.wrapperRender();
    this.filtersRender();
    this.todoListRender();
  }
}

export const todoList = new TodoList({ mockApiGate });
