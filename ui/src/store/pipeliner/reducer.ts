import { initialPipelinerState } from "./initialState";
import {
  PipelinerState,
  PipelinerActionTypes,
  SHOW_ERROR,
  HIDE_ERROR,
} from "./types";

export const pipelinerReducer = (
  state = initialPipelinerState,
  action: PipelinerActionTypes
): PipelinerState => {
  switch (action.type) {
    case SHOW_ERROR:
      return { ...state, showError: true, errorMessage: action.errorMessage };
    case HIDE_ERROR:
      return { ...state, showError: false, errorMessage: "" };
    default:
      return state;
  }
};
