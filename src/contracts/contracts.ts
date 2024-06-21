export type EntityIdContract = string;

export interface TodoBodyContract {
  text: string;
  isDone: boolean;
}

export interface TodoContract extends TodoBodyContract {
  id: EntityIdContract;
}

export enum TodoStatusContract {
  ACTIVE = 'active',
  COMPLETED = 'completed',
  ALL = 'all',
}

export interface MockApiGateContract {
  fetchTodoList(params: { todoStatus: TodoStatusContract }): TodoContract[];
  addTodo(params: { todoBody: TodoBodyContract }): EntityIdContract;
  patchTodo(params: { todoId: EntityIdContract; todoBody: TodoBodyContract }): void;
  deleteTodo(params: { todoId: EntityIdContract }): void;
  toggleDone(params: { todoId: EntityIdContract }): void;
  clearCompleted(): void;
}

export enum MockApiGateErrorMessagesContract {
  UNKNOWN_TODO_ID = 'UNKNOWN_TODO_ID',
}

export type ParentCSSelectorContract = string;

export enum RenderErrorMsgContract {
  ERROR_MOUNT = 'ошибка монтирования',
}
