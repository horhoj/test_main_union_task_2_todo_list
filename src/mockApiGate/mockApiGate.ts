import { MockApiGateConstructorData } from './mockApiGate.types';
import {
  MockApiGateContract,
  MockApiGateErrorMessagesContract,
  TodoBodyContract,
  TodoContract,
  TodoStatusContract,
} from '~/contracts/contracts';

export class MockApiGate implements MockApiGateContract {
  private dependencies: MockApiGateConstructorData;
  public constructor(dependencies: MockApiGateConstructorData) {
    this.dependencies = dependencies;
  }

  public fetchTodoList(params: { todoStatus: TodoStatusContract }): TodoContract[] {
    return this.dependencies.store.filter((todo) => {
      if (params.todoStatus === TodoStatusContract.ACTIVE) {
        return todo.isDone === false;
      }
      if (params.todoStatus === TodoStatusContract.COMPLETED) {
        return todo.isDone === true;
      }
      return true;
    });
  }

  public addTodo(params: { todoBody: TodoBodyContract }): string {
    const id = this.dependencies.getUniqueId();
    this.dependencies.store.unshift({
      id,
      ...params.todoBody,
    });

    this.dependencies.saveStore();

    return id;
  }

  public patchTodo(params: { todoId: string; todoBody: TodoBodyContract }): void {
    const index = this.dependencies.store.findIndex((todo) => todo.id === params.todoId);
    if (index === -1) {
      throw new Error(MockApiGateErrorMessagesContract.UNKNOWN_TODO_ID);
    }
    this.dependencies.store[index] = { id: params.todoId, ...params.todoBody };
    this.dependencies.saveStore();
  }

  public deleteTodo(params: { todoId: string }): void {
    const index = this.dependencies.store.findIndex((todo) => todo.id === params.todoId);
    if (index === -1) {
      throw new Error(MockApiGateErrorMessagesContract.UNKNOWN_TODO_ID);
    }
    this.dependencies.store.splice(index, 1);
    this.dependencies.saveStore();
  }

  public clearCompleted(): void {
    this.dependencies.makeDelay();
    const result = this.dependencies.store.filter((todo) => !todo.isDone);
    this.dependencies.store.splice(0, this.dependencies.store.length);
    this.dependencies.store.push(...result);
    this.dependencies.saveStore();
  }
}
