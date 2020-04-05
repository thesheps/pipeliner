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
  };

  const state: PipelinerState = {
    ui,
    user: {
      authToken: "MY_AUTH_TOKEN",
      isRegistering: true,
      isSignedIn: true,
    },
  };

  it("selects the UI state from the PipelinerState", () => {
    const uiState = uiSelector(state);
    expect(uiState).toEqual(ui);
  });
});
