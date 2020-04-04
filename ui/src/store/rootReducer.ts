import { combineReducers } from "redux";

import { uiReducer as ui } from "./ui/reducer";
import { userReducer as user } from "./user/reducer";

export const rootReducer = combineReducers({
  ui,
  user,
});
