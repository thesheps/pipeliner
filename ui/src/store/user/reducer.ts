import { initialUserState } from "./initialState";
import {
  UserState,
  UserActionTypes,
  SET_IS_AUTHENTICATING,
  SET_AUTH_TOKEN,
  SIGN_OUT,
} from "./types";

export const userReducer = (
  state: UserState = initialUserState,
  action: UserActionTypes
): UserState => {
  switch (action.type) {
    case SET_IS_AUTHENTICATING:
      return { ...state, isAuthenticating: action.isAuthenticating };
    case SET_AUTH_TOKEN:
      return { ...state, authToken: action.authToken, isSignedIn: true };
    case SIGN_OUT:
      return { ...state, authToken: null, isSignedIn: false };
    default:
      return state;
  }
};