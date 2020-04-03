import { UserState } from "../types";
import { userReducer } from "../reducer";
import { setAuthToken, setIsRegistering, setAuthFailed } from "../actions";

describe("Reducers", () => {
  const initialState: UserState = {
    authToken: "",
    isSignedIn: false,
    isRegistering: false,
    registerUserError: ""
  };

  it("returns a state containing the updated authToken", () => {
    const authToken = "my lovely horse";
    const newState = userReducer(initialState, setAuthToken(authToken));

    expect(newState).toEqual({
      ...initialState,
      authToken
    });
  });

  it("returns a state containing the updated isRegistering value", () => {
    const isRegistering = true;
    const newState = userReducer(initialState, setIsRegistering(isRegistering));

    expect(newState).toEqual({
      ...initialState,
      isRegistering
    });
  });

  it("returns a state containing the updated registerUserError", () => {
    const registerUserError = "my lovely horse";
    const newState = userReducer(
      initialState,
      setAuthFailed(registerUserError)
    );

    expect(newState).toEqual({
      ...initialState,
      registerUserError
    });
  });
});
