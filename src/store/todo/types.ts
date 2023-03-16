// Actions Types
export enum TodoActionTypes {
  CREATE_TODO_REQUEST = '@todo/CREATE_TODO_REQUEST',
  CREATE_TODO_SUCCESS = '@todo/CREATE_TODO_SUCCESS',
  CREATE_TODO_FAILURE = '@todo/CREATE_TODO_FAILURE',
  UPDATE_TODO_REQUEST = '@todo/UPDATE_TODO_REQUEST',
  UPDATE_TODO_SUCCESS = '@todo/UPDATE_TODO_SUCCESS',
  UPDATE_TODO_FAILURE = '@todo/UPDATE_TODO_FAILURE',
  DELETE_TODO_REQUEST = '@todo/DELETE_TODO_REQUEST',
  DELETE_TODO_SUCCESS = '@todo/DELETE_TODO_SUCCESS',
  DELETE_TODO_FAILURE = '@todo/DELETE_TODO_FAILURE',
  FETCH_TODOS_REQUEST = '@todo/FETCH_TODOS_REQUEST',
  FETCH_TODOS_SUCCESS = '@todo/FETCH_TODOS_SUCCESS',
  FETCH_TODOS_FAILURE = '@todo/FETCH_TODOS_FAILURE',
}

// Data Types
export interface Todo {
  id: string;
  title: string;
  completed: boolean;
  createdAt: number;
  updatedAt: number | null;
}

// State Type
export interface TodoState {
  readonly todos: Todo[];
  readonly error: boolean;
  readonly loading: boolean;
}
