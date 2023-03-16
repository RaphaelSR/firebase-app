import {Todo, TodoActionTypes} from './types';

export const createTodoRequest = (title: string) => ({
  type: TodoActionTypes.CREATE_TODO_REQUEST,
  payload: {title},
});

export const createTodoSuccess = (todo: Todo) => ({
  type: TodoActionTypes.CREATE_TODO_SUCCESS,
  payload: {todo},
});

export const createTodoFailure = () => ({
  type: TodoActionTypes.CREATE_TODO_FAILURE,
});

export const updateTodoRequest = (id: string, title: string, completed: boolean) => ({
  type: TodoActionTypes.UPDATE_TODO_REQUEST,
  payload: {id, title, completed},
});

export const updateTodoSuccess = (todo: Todo) => ({
  type: TodoActionTypes.UPDATE_TODO_SUCCESS,
  payload: {todo},
});

export const updateTodoFailure = () => ({
  type: TodoActionTypes.UPDATE_TODO_FAILURE,
});

export const deleteTodoRequest = (id: string) => ({
  type: TodoActionTypes.DELETE_TODO_REQUEST,
  payload: {id},
});

export const deleteTodoSuccess = (id: string) => ({
  type: TodoActionTypes.DELETE_TODO_SUCCESS,
  payload: {id},
});

export const deleteTodoFailure = () => ({
  type: TodoActionTypes.DELETE_TODO_FAILURE,
});

export const fetchTodosRequest = () => ({
  type: TodoActionTypes.FETCH_TODOS_REQUEST,
});

export const fetchTodosSuccess = (todos: Todo[]) => ({
  type: TodoActionTypes.FETCH_TODOS_SUCCESS,
  payload: {todos},
});

export const fetchTodosFailure = () => ({
  type: TodoActionTypes.FETCH_TODOS_FAILURE,
});
