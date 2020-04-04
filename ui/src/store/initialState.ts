import { initialUIState } from "./ui/initialState";
import { initialUserState } from "./user/initialState";
import { PipelinerState } from "./types";

export const initialState: PipelinerState = {
  ui: initialUIState,
  user: initialUserState,
};
