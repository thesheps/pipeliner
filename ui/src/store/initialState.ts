import { initialUserState } from "./user/initialState";
import { initialPipelinerState } from "./pipeliner/initialState";

export const initialState = {
  ...initialUserState,
  ...initialPipelinerState,
};
