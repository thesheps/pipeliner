export const SET_IS_AUTHENTICATING = "SET_IS_AUTHENTICATING";
export const SET_AUTH_TOKEN = "SET_AUTH_TOKEN";
export const SET_AUTH_FAILED = "SET_AUTH_FAILED";

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

export type UserActionTypes =
  | SetIsAuthenticatingAction
  | SetAuthTokenAction
  | SetAuthFailedAction;

export interface UserState {
  isSignedIn: boolean;
  isAuthenticating: boolean;
  authToken: string;
}
