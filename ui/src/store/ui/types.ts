export const SET_SHOW_REGISTER_MODAL = "SET_SHOW_REGISTER_MODAL";
export const SHOW_ERROR = "SHOW_ERROR";
export const HIDE_ERROR = "HIDE_ERROR";

export interface ShowErrorAction {
  type: typeof SHOW_ERROR;
  errorMessage: string;
}

export interface HideErrorAction {
  type: typeof HIDE_ERROR;
}

export interface SetShowRegisterModalAction {
  type: typeof SET_SHOW_REGISTER_MODAL;
  show: boolean;
}

export type UIActionTypes =
  | ShowErrorAction
  | HideErrorAction
  | SetShowRegisterModalAction;

export interface UIState {
  showRegisterModal: boolean;
  showError: boolean;
  errorMessage: string;
}
