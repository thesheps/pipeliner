import {
  SET_IS_AUTHENTICATING,
  SET_AUTH_TOKEN,
  SET_AUTH_FAILED,
  SIGN_OUT,
} from "../types";
import {
  setIsAuthenticating,
  setAuthToken,
  setAuthFailed,
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
    it("creates setAuthToken action with the specified auth token", () => {
      const authToken = "my lovely horse";
      const action = setAuthToken(authToken);

      expect(action).toEqual({
        type: SET_AUTH_TOKEN,
        authToken,
      });
    });

    it("creates setAuthFailed action with the specified error message", () => {
      const errorMessage = "my lovely error";
      const action = setAuthFailed(errorMessage);

      expect(action).toEqual({
        type: SET_AUTH_FAILED,
        errorMessage: errorMessage,
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
