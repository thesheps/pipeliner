export const SET_IS_AUTHENTICATING = "SET_IS_AUTHENTICATING";
export const SET_AUTH_FAILED = "SET_AUTH_FAILED";
export const SIGN_IN = "SIGN_IN";
export const SIGN_OUT = "SIGN_OUT";

export interface SetIsAuthenticatingAction {
  type: typeof SET_IS_AUTHENTICATING;
  isAuthenticating: boolean;
}

export interface SetAuthFailedAction {
  type: typeof SET_AUTH_FAILED;
  errorMessage: string;
}

export interface SignInAction {
  type: typeof SIGN_IN;
}

export interface SignOutAction {
  type: typeof SIGN_OUT;
}

export type UserActionTypes =
  | SetIsAuthenticatingAction
  | SetAuthFailedAction
  | SignInAction
  | SignOutAction;

export interface UserState {
  isSignedIn: boolean;
  isAuthenticating: boolean;
}
