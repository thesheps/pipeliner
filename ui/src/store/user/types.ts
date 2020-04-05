export const SET_IS_AUTHENTICATING = "SET_IS_AUTHENTICATING";
export const SET_AUTH_TOKEN = "SET_AUTH_TOKEN";
export const SET_AUTH_FAILED = "SET_AUTH_FAILED";
export const SIGN_OUT = "SIGN_OUT";

export interface SetIsAuthenticatingAction {
  type: typeof SET_IS_AUTHENTICATING;
  isAuthenticating: boolean;
}

export interface SetAuthTokenAction {
  type: typeof SET_AUTH_TOKEN;
  authToken: string;
}

export interface SetAuthFailedAction {
  type: typeof SET_AUTH_FAILED;
  errorMessage: string;
}

export interface SignOutAction {
  type: typeof SIGN_OUT;
}

export type UserActionTypes =
  | SetIsAuthenticatingAction
  | SetAuthTokenAction
  | SetAuthFailedAction
  | SignOutAction;

export interface UserState {
  isSignedIn: boolean;
  isAuthenticating: boolean;
  authToken: string;
}
