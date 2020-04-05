import { PipelinerState } from "../../types";
import { userSelector } from "../selectors";
import { UserState } from "../types";

describe("User Selector", () => {
  const user: UserState = {
    isAuthenticating: true,
    isSignedIn: true,
  };

  const state: PipelinerState = {
    ui: {
      showError: true,
      errorMessage: "Error Message",
      showSuccess: false,
      successMessage: "",
      showRegisterModal: false,
      showSignInModal: false,
    },
    user,
  };

  it("selects the User state from the PipelinerState", () => {
    const userState = userSelector(state);
    expect(userState).toEqual(user);
  });
});
