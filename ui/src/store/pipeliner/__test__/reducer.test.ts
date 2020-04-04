import { pipelinerReducer } from "../reducer";
import { showError } from "../actions";
import { initialState } from "../../initialState";

describe("Reducers", () => {
  it("returns a state containing the the specified error message", () => {
    const errorMessage = "Something Broke!!!";
    const newState = pipelinerReducer(initialState, showError(errorMessage));

    expect(newState).toEqual({
      ...initialState,
      errorMessage,
      showError: true,
    });
  });
});
