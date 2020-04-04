import { SHOW_ERROR, HIDE_ERROR, PipelinerActionTypes } from "./types";

export const showError = (errorMessage: string): PipelinerActionTypes => ({
  type: SHOW_ERROR,
  errorMessage,
});

export const hideError = (): PipelinerActionTypes => ({
  type: HIDE_ERROR,
});
