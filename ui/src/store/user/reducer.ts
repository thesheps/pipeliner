import {
  UserState,
  UserActionTypes,
  SET_IS_REGISTERING,
  SET_AUTH_FAILED,
  SET_AUTH_TOKEN
} from "./types";
import { initialUserState } from "./initialState";

export const userReducer = (
  state = initialUserState,
  action: UserActionTypes
): UserState => {
  switch (action.type) {
    case SET_IS_REGISTERING:
      return { ...state, isRegistering: action.isRegistering };
    case SET_AUTH_FAILED:
      return { ...state, registerUserError: action.errorMessage };
    case SET_AUTH_TOKEN:
      return { ...state, authToken: action.authToken };
    default:
      return state;
  }
};
