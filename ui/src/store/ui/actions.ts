import {
  SHOW_ERROR,
  HIDE_ERROR,
  SHOW_REGISTER_MODAL,
  HIDE_REGISTER_MODAL,
  UIActionTypes,
} from "./types";

export const showError = (errorMessage: string): UIActionTypes => ({
  type: SHOW_ERROR,
  errorMessage,
});

export const hideError = (): UIActionTypes => ({
  type: HIDE_ERROR,
});

export const showRegisterModal = (): UIActionTypes => ({
  type: SHOW_REGISTER_MODAL,
});

export const hideRegisterModal = (): UIActionTypes => ({
  type: HIDE_REGISTER_MODAL,
});
