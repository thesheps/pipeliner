import {
  UIActionTypes,
  SET_SHOW_REGISTER_MODAL,
  SHOW_ERROR,
  HIDE_ERROR,
  SHOW_SUCCESS,
  HIDE_SUCCESS,
} from "./types";

export const showError = (errorMessage: string): UIActionTypes => ({
  type: SHOW_ERROR,
  errorMessage,
});

export const hideError = (): UIActionTypes => ({
  type: HIDE_ERROR,
});

export const showSuccess = (message: string): UIActionTypes => ({
  type: SHOW_SUCCESS,
  successMessage: message,
});

export const hideSuccess = (): UIActionTypes => ({
  type: HIDE_SUCCESS,
});

export const setShowRegisterModal = (show: boolean): UIActionTypes => ({
  type: SET_SHOW_REGISTER_MODAL,
  show,
});
