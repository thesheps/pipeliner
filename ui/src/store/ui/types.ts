export const SET_SHOW_REGISTER_MODAL = "SET_SHOW_REGISTER_MODAL";
export const SET_SHOW_SIGN_IN_MODAL = "SET_SHOW_SIGN_IN_MODAL";
export const SHOW_ERROR = "SHOW_ERROR";
export const HIDE_ERROR = "HIDE_ERROR";
export const SHOW_SUCCESS = "SHOW_SUCCESS";
export const HIDE_SUCCESS = "HIDE_SUCCESS";

export interface ShowErrorAction {
  type: typeof SHOW_ERROR;
  errorMessage: string;
}

export interface HideErrorAction {
  type: typeof HIDE_ERROR;
}

export interface ShowSuccessAction {
  type: typeof SHOW_SUCCESS;
  successMessage: string;
}

export interface HideSuccessAction {
  type: typeof HIDE_SUCCESS;
}

export interface SetShowRegisterModalAction {
  type: typeof SET_SHOW_REGISTER_MODAL;
  show: boolean;
}

export interface SetShowSignInModalAction {
  type: typeof SET_SHOW_SIGN_IN_MODAL;
  show: boolean;
}

export type UIActionTypes =
  | ShowErrorAction
  | HideErrorAction
  | ShowSuccessAction
  | HideSuccessAction
  | SetShowRegisterModalAction
  | SetShowSignInModalAction;

export interface UIState {
  showRegisterModal: boolean;
  showSignInModal: boolean;
  showError: boolean;
  showSuccess: boolean;
  errorMessage: string;
  successMessage: string;
}
