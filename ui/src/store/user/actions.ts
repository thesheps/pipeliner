import {
  UserActionTypes,
  SET_IS_AUTHENTICATING,
  SET_AUTH_TOKEN,
  SET_AUTH_FAILED,
  SIGN_OUT,
} from "./types";

export const setIsAuthenticating = (
  isAuthenticating: boolean
): UserActionTypes => ({
  type: SET_IS_AUTHENTICATING,
  isAuthenticating,
});

export const setAuthToken = (authToken: string): UserActionTypes => ({
  type: SET_AUTH_TOKEN,
  authToken,
});

export const setAuthFailed = (errorMessage: string): UserActionTypes => ({
  type: SET_AUTH_FAILED,
  errorMessage,
});

export const signOutUser = (): UserActionTypes => ({
  type: SIGN_OUT,
});
