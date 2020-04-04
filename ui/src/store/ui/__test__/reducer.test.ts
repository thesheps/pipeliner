import { uiReducer } from "../reducer";
import { initialUIState } from "../initialState";
import { showError, showRegisterModal, hideRegisterModal } from "../actions";

describe("UI Reducers", () => {
  it("returns a state containing the the specified error message", () => {
    const errorMessage = "Something Broke!!!";
    const newState = uiReducer(initialUIState, showError(errorMessage));

    expect(newState).toEqual({
      ...initialUIState,
      errorMessage,
      showError: true,
    });
  });

  it("returns a state setting showRegisterModal to true", () => {
    const newState = uiReducer(initialUIState, showRegisterModal());

    expect(newState).toEqual({
      ...initialUIState,
      showRegisterModal: true,
    });
  });

  it("returns a state setting showRegisterModal to false", () => {
    const newState = uiReducer(initialUIState, hideRegisterModal());

    expect(newState).toEqual({
      ...initialUIState,
      showRegisterModal: false,
    });
  });
});
