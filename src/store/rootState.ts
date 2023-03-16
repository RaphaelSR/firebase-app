import { TodoState } from "./todo/types";
import { UserState } from "./user/types";

export interface RootState {
  user: UserState;
  todo: TodoState;
}
