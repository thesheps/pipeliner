export const SET_IS_REGISTERING = "SET_IS_REGISTERING";
export const SET_AUTH_TOKEN = "SET_AUTH_TOKEN";
export const SET_AUTH_FAILED = "SET_AUTH_FAILED";

export interface SetIsRegisteringAction {
  type: typeof SET_IS_REGISTERING;
  isRegistering: boolean;
}

export interface SetAuthTokenAction {
  type: typeof SET_AUTH_TOKEN;
  authToken: string;
}

export interface SetAuthFailedAction {
  type: typeof SET_AUTH_FAILED;
  errorMessage: string;
}

export type UserActionTypes =
  | SetIsRegisteringAction
  | SetAuthTokenAction
  | SetAuthFailedAction;

export interface UserState {
  isSignedIn: boolean;
  isRegistering: boolean;
  authToken: string;
  registerUserError: string;
}
