import { SHOW_ERROR, HIDE_ERROR, UIActionTypes } from "./types";

export const showError = (errorMessage: string): UIActionTypes => ({
  type: SHOW_ERROR,
  errorMessage,
});

export const hideError = (): UIActionTypes => ({
  type: HIDE_ERROR,
});
