import { setIsRegistering, setAuthToken, setAuthFailed } from "../actions";
import { SET_IS_REGISTERING, SET_AUTH_TOKEN, SET_AUTH_FAILED } from "../types";

describe("SetIsRegisteringAction", () => {
  it("creates an action with isRegistering as true", () => {
    const action = setIsRegistering(true);

    expect(action).toEqual({
      type: SET_IS_REGISTERING,
      isRegistering: true
    });
  });

  it("creates an action with isRegistering as false", () => {
    const action = setIsRegistering(false);

    expect(action).toEqual({
      type: SET_IS_REGISTERING,
      isRegistering: false
    });
  });
});

describe("Auth Tokens", () => {
  it("creates setAuthToken action with the specified auth token", () => {
    const authToken = "my lovely horse";
    const action = setAuthToken(authToken);

    expect(action).toEqual({
      type: SET_AUTH_TOKEN,
      authToken
    });
  });

  it("creates setAuthFailed action with the specified error message", () => {
    const errorMessage = "my lovely error";
    const action = setAuthFailed(errorMessage);

    expect(action).toEqual({
      type: SET_AUTH_FAILED,
      errorMessage: errorMessage
    });
  });
});
