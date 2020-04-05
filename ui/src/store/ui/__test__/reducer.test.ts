import { uiReducer } from "../reducer";
import { initialUIState } from "../initialState";
import { showError, setShowRegisterModal, showSuccess } from "../actions";

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

  it("returns a state containing the the specified success message", () => {
    const successMessage = "Something Works!!!";
    const newState = uiReducer(initialUIState, showSuccess(successMessage));

    expect(newState).toEqual({
      ...initialUIState,
      successMessage,
      showSuccess: true,
    });
  });

  it("returns a state setting showRegisterModal to true", () => {
    const newState = uiReducer(initialUIState, setShowRegisterModal(true));

    expect(newState).toEqual({
      ...initialUIState,
      showRegisterModal: true,
    });
  });

  it("returns a state setting showRegisterModal to false", () => {
    const newState = uiReducer(initialUIState, setShowRegisterModal(false));

    expect(newState).toEqual({
      ...initialUIState,
      showRegisterModal: false,
    });
  });
});
