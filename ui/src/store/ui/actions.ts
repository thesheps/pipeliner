import {
  SHOW_ERROR,
  HIDE_ERROR,
  SET_SHOW_REGISTER_MODAL,
  UIActionTypes,
} from "./types";

export const showError = (errorMessage: string): UIActionTypes => ({
  type: SHOW_ERROR,
  errorMessage,
});

export const hideError = (): UIActionTypes => ({
  type: HIDE_ERROR,
});

export const setShowRegisterModal = (show: boolean): UIActionTypes => ({
  type: SET_SHOW_REGISTER_MODAL,
  show,
});
