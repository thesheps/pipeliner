import { initialUserState } from "./initialState";
import {
  UserState,
  UserActionTypes,
  SET_IS_AUTHENTICATING,
  SIGN_IN,
  SIGN_OUT,
} from "./types";

export const userReducer = (
  state: UserState = initialUserState,
  action: UserActionTypes
): UserState => {
  switch (action.type) {
    case SET_IS_AUTHENTICATING:
      return { ...state, isAuthenticating: action.isAuthenticating };
    case SIGN_IN:
      return { ...state, isSignedIn: true };
    case SIGN_OUT:
      return { ...state, isSignedIn: false };
    default:
      return state;
  }
};
