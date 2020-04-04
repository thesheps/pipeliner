import {
  UserActionTypes,
  SET_IS_REGISTERING,
  SET_AUTH_TOKEN,
  SET_AUTH_FAILED,
} from "./types";

export const setIsRegistering = (isRegistering: boolean): UserActionTypes => ({
  type: SET_IS_REGISTERING,
  isRegistering,
});

export const setAuthToken = (authToken: string): UserActionTypes => ({
  type: SET_AUTH_TOKEN,
  authToken,
});

export const setAuthFailed = (errorMessage: string): UserActionTypes => ({
  type: SET_AUTH_FAILED,
  errorMessage,
});
