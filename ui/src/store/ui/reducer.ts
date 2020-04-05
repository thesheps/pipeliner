import { initialUIState } from "./initialState";
import {
  UIState,
  UIActionTypes,
  SHOW_ERROR,
  HIDE_ERROR,
  SET_SHOW_REGISTER_MODAL,
} from "./types";

export const uiReducer = (
  state: UIState = initialUIState,
  action: UIActionTypes
): UIState => {
  switch (action.type) {
    case SHOW_ERROR:
      return { ...state, showError: true, errorMessage: action.errorMessage };
    case HIDE_ERROR:
      return { ...state, showError: false, errorMessage: "" };
    case SET_SHOW_REGISTER_MODAL:
      return { ...state, showRegisterModal: action.show };
    default:
      return state;
  }
};
