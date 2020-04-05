import { PipelinerState } from "../../types";
import { uiSelector } from "../selectors";
import { UIState } from "../types";

describe("UI Selector", () => {
  const ui: UIState = {
    showError: true,
    errorMessage: "Error Message",
    showSuccess: false,
    successMessage: "",
    showRegisterModal: false,
    showSignInModal: false,
  };

  const state: PipelinerState = {
    ui,
    user: {
      isAuthenticating: true,
      isSignedIn: true,
    },
  };

  it("selects the UI state from the PipelinerState", () => {
    const uiState = uiSelector(state);
    expect(uiState).toEqual(ui);
  });
});
