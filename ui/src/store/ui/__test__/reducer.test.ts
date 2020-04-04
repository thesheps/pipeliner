import { uiReducer } from "../reducer";
import { showError } from "../actions";
import { initialUIState } from "../initialState";

describe("Reducers", () => {
  it("returns a state containing the the specified error message", () => {
    const errorMessage = "Something Broke!!!";
    const newState = uiReducer(initialUIState, showError(errorMessage));

    expect(newState).toEqual({
      ...initialUIState,
      errorMessage,
      showError: true,
    });
  });
});
