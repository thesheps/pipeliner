import { UIState } from "./ui/types";
import { UserState } from "./user/types";

export interface PipelinerState {
  ui: UIState;
  user: UserState;
}
