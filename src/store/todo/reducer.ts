import produce from "immer";
import { TodoActionTypes, TodoState } from "./types";

const INITIAL_STATE: TodoState = {
  todos: [],
  error: false,
  loading: false,
};

export default function todo(
  state = INITIAL_STATE,
  action: { type: TodoActionTypes; payload: any }
): TodoState {
  return produce(state, (draft) => {
    switch (action.type) {
      case TodoActionTypes.CREATE_TODO_REQUEST:
      case TodoActionTypes.UPDATE_TODO_REQUEST:
      case TodoActionTypes.DELETE_TODO_REQUEST:
      case TodoActionTypes.FETCH_TODOS_REQUEST:
        draft.loading = true;
        break;
      case TodoActionTypes.CREATE_TODO_SUCCESS:
        draft.todos.push(action.payload.todo);
        draft.error = false;
        draft.loading = false;
        break;
      case TodoActionTypes.UPDATE_TODO_SUCCESS:
        const indexToUpdate = draft.todos.findIndex(
          (todo) => todo.id === action.payload.todo.id
        );
        if (indexToUpdate !== -1) {
          draft.todos[indexToUpdate] = action.payload.todo;
        }
        draft.error = false;
        draft.loading = false;
        break;
      case TodoActionTypes.DELETE_TODO_SUCCESS:
        draft.todos = draft.todos.filter(
          (todo) => todo.id !== action.payload.id
        );
        draft.error = false;
        draft.loading = false;
        break;
      case TodoActionTypes.FETCH_TODOS_SUCCESS:
        draft.todos = action.payload.todos;
        draft.error = false;
        draft.loading = false;
        break;
      case TodoActionTypes.CREATE_TODO_FAILURE:
      case TodoActionTypes.UPDATE_TODO_FAILURE:
      case TodoActionTypes.DELETE_TODO_FAILURE:
      case TodoActionTypes.FETCH_TODOS_FAILURE:
        draft.error = true;
        draft.loading = false;
        break;
      default:
        break;
    }
  });
}
