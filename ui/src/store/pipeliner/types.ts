export const SHOW_ERROR = "SHOW_ERROR";
export const HIDE_ERROR = "HIDE_ERROR";

export interface ShowErrorAction {
  type: typeof SHOW_ERROR;
  errorMessage: string;
}

export interface HideErrorAction {
  type: typeof HIDE_ERROR;
}

export type PipelinerActionTypes = ShowErrorAction | HideErrorAction;

export interface PipelinerState {
  showError: boolean;
  errorMessage: string;
}
