import { PipelinerState } from "../../types";
import { uiSelector } from "../selectors";

describe("UI Selector", () => {
  const ui = {
    errorMessage: "Error Message",
    showError: true,
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
