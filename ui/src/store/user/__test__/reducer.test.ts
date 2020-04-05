import { UserState } from "../types";
import { userReducer } from "../reducer";
import { setAuthToken, setIsAuthenticating, signOutUser } from "../actions";

describe("Reducers", () => {
  const initialState: UserState = {
    authToken: "",
    isSignedIn: false,
    isAuthenticating: false,
  };

  it("returns a state containing the updated authToken", () => {
    const authToken = "my lovely horse";
    const newState = userReducer(initialState, setAuthToken(authToken));

    expect(newState).toEqual({
      ...initialState,
      authToken,
      isSignedIn: true,
    });
  });

  it("returns a state containing the updated isAuthenticating value", () => {
    const isAuthenticating = true;
    const newState = userReducer(
      initialState,
      setIsAuthenticating(isAuthenticating)
    );

    expect(newState).toEqual({
      ...initialState,
      isAuthenticating,
    });
  });

  it("returns a state with the user signed out", () => {
    const newState = userReducer(initialState, signOutUser());

    expect(newState).toEqual({
      ...initialState,
      isSignedIn: false,
      authToken: null,
    });
  });
});
