import {
  UserActionTypes,
  SET_IS_AUTHENTICATING,
  SET_AUTH_FAILED,
  SIGN_OUT,
  SIGN_IN,
} from "./types";

export const setIsAuthenticating = (
  isAuthenticating: boolean
): UserActionTypes => ({
  type: SET_IS_AUTHENTICATING,
  isAuthenticating,
});

export const setAuthFailed = (errorMessage: string): UserActionTypes => ({
  type: SET_AUTH_FAILED,
  errorMessage,
});

export const signInUser = (): UserActionTypes => ({
  type: SIGN_IN,
});

export const signOutUser = (): UserActionTypes => ({
  type: SIGN_OUT,
});
