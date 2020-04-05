import {
  SET_IS_AUTHENTICATING,
  SET_AUTH_FAILED,
  SIGN_IN,
  SIGN_OUT,
} from "../types";
import {
  setIsAuthenticating,
  setAuthFailed,
  signInUser,
  signOutUser,
} from "../actions";

describe("User actions", () => {
  describe("SetIsAuthenticatingAction", () => {
    it("creates an action with isAuthenticating as true", () => {
      const action = setIsAuthenticating(true);

      expect(action).toEqual({
        type: SET_IS_AUTHENTICATING,
        isAuthenticating: true,
      });
    });

    it("creates an action with isAuthenticating as false", () => {
      const action = setIsAuthenticating(false);

      expect(action).toEqual({
        type: SET_IS_AUTHENTICATING,
        isAuthenticating: false,
      });
    });
  });

  describe("Auth Tokens", () => {
    it("creates setAuthFailed action with the specified error message", () => {
      const errorMessage = "my lovely error";
      const action = setAuthFailed(errorMessage);

      expect(action).toEqual({
        type: SET_AUTH_FAILED,
        errorMessage: errorMessage,
      });
    });

    it("signs the user in", () => {
      const action = signInUser();

      expect(action).toEqual({
        type: SIGN_IN,
      });
    });

    it("signs the user out", () => {
      const action = signOutUser();

      expect(action).toEqual({
        type: SIGN_OUT,
      });
    });
  });
});
