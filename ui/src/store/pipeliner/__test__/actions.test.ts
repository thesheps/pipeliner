import { showError, hideError } from "../actions";
import { SHOW_ERROR, HIDE_ERROR } from "../types";

describe("ShowError", () => {
  it("creates an action with the specified error message", () => {
    const errorMessage = "Whoops!!";
    const action = showError(errorMessage);

    expect(action).toEqual({
      type: SHOW_ERROR,
      errorMessage,
    });
  });

  it("creates an action with the correct type", () => {
    const action = hideError();

    expect(action).toEqual({
      type: HIDE_ERROR,
    });
  });
});
