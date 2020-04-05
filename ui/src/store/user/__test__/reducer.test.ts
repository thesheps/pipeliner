import { UserState } from "../types";
import { userReducer } from "../reducer";
import { setIsAuthenticating, signOutUser } from "../actions";

describe("Reducers", () => {
  const initialState: UserState = {
    isSignedIn: false,
    isAuthenticating: false,
  };

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
    });
  });
});
