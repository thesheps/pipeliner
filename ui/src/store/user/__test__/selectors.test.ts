import { PipelinerState } from "../../types";
import { userSelector } from "../selectors";
import { UserState } from "../types";

describe("User Selector", () => {
  const user: UserState = {
    authToken: "MY_AUTH_TOKEN",
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
    },
    user,
  };

  it("selects the User state from the PipelinerState", () => {
    const userState = userSelector(state);
    expect(userState).toEqual(user);
  });
});
