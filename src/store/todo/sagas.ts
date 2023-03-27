import { call, put, takeLatest } from "redux-saga/effects";
import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";
import { TodoActionTypes } from "./types";
import {
  createTodoRequest,
  createTodoSuccess,
  createTodoFailure,
  updateTodoRequest,
  updateTodoSuccess,
  updateTodoFailure,
  deleteTodoRequest,
  deleteTodoSuccess,
  deleteTodoFailure,
  fetchTodosRequest,
  fetchTodosSuccess,
  fetchTodosFailure,
} from "./actions";
import { Todo } from "./types";

function* createTodo({
  payload: { title },
}: ReturnType<typeof createTodoRequest>) {
  try {
    const currentUser = auth().currentUser;
    if (!currentUser) {
      throw new Error("User not logged in.");
    }
    const userId = currentUser.uid;
    const newTodoDoc = firestore()
      .collection("users")
      .doc(userId)
      .collection("todos")
      .doc();
    const newTodo: Todo = {
      id: newTodoDoc.id,
      title,
      completed: false,
      createdAt: Date.now(),
      updatedAt: null,
    };

    yield call(() => newTodoDoc.set(newTodo));
    yield put(createTodoSuccess(newTodo));
  } catch (error) {
    yield put(createTodoFailure());
  }
}

function* updateTodo({
  payload: { id, title, completed },
}: ReturnType<typeof updateTodoRequest>) {
  try {
    const currentUser = auth().currentUser;
    if (!currentUser) {
      throw new Error("User not logged in.");
    }
    const userId = currentUser.uid;
    const todoDocRef = firestore()
      .collection("users")
      .doc(userId)
      .collection("todos")
      .doc(id);
    const updatedTodoData: Partial<Todo> = {
      title,
      completed,
      updatedAt: Date.now(),
    };

    yield call(() => todoDocRef.update(updatedTodoData));
    const updatedTodo: Todo = {
      id,
      ...updatedTodoData,
    } as Todo;
    yield put(updateTodoSuccess(updatedTodo));
  } catch (error) {
    yield put(updateTodoFailure());
  }
}

function* deleteTodo({
  payload: { id },
}: ReturnType<typeof deleteTodoRequest>) {
  try {
    const currentUser = auth().currentUser;
    if (!currentUser) {
      throw new Error("User not logged in.");
    }
    const userId = currentUser.uid;
    const todoDocRef = firestore()
      .collection("users")
      .doc(userId)
      .collection("todos")
      .doc(id);

    yield call(() => todoDocRef.delete());

    yield put(deleteTodoSuccess(id));
  } catch (error) {
    yield put(deleteTodoFailure());
  }
}

async function fetchTodosFromFirestore(): Promise<Todo[]> {
  const currentUser = auth().currentUser;
  if (!currentUser) {
    throw new Error("User not logged in.");
  }
  const userId = currentUser.uid;
  const todosSnapshot = await firestore()
    .collection("users")
    .doc(userId)
    .collection("todos")
    .get();
  return todosSnapshot.docs.map((doc) => doc.data() as Todo);
}

function* fetchTodos(_: ReturnType<typeof fetchTodosRequest>) {
  try {
    const todos: Todo[] = yield call(fetchTodosFromFirestore);
    yield put(fetchTodosSuccess(todos));
  } catch (error) {
    yield put(fetchTodosFailure());
  }
}

export default function* todoSaga() {
  yield takeLatest(TodoActionTypes.CREATE_TODO_REQUEST, createTodo);
  yield takeLatest(TodoActionTypes.UPDATE_TODO_REQUEST, updateTodo);
  yield takeLatest(TodoActionTypes.DELETE_TODO_REQUEST, deleteTodo);
  yield takeLatest(TodoActionTypes.FETCH_TODOS_REQUEST, fetchTodos);
}
