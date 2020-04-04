export const SHOW_REGISTER_MODAL = "SHOW_REGISTER_MODAL";
export const HIDE_REGISTER_MODAL = "HIDE_REGISTER_MODAL";
export const SHOW_ERROR = "SHOW_ERROR";
export const HIDE_ERROR = "HIDE_ERROR";

export interface ShowErrorAction {
  type: typeof SHOW_ERROR;
  errorMessage: string;
}

export interface HideErrorAction {
  type: typeof HIDE_ERROR;
}

export interface ShowRegisterModalAction {
  type: typeof SHOW_REGISTER_MODAL;
}

export interface HideRegisterModalAction {
  type: typeof HIDE_REGISTER_MODAL;
}

export type UIActionTypes =
  | ShowErrorAction
  | HideErrorAction
  | ShowRegisterModalAction
  | HideRegisterModalAction;

export interface UIState {
  showRegisterModal: boolean;
  showError: boolean;
  errorMessage: string;
}
