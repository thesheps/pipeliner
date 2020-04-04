import { PipelinerState } from "../../types";
import { userSelector } from "../selectors";

describe("User Selector", () => {
  const user = {
    authToken: "MY_AUTH_TOKEN",
    isRegistering: true,
    isSignedIn: true,
  };

  const state: PipelinerState = {
    ui: {
      errorMessage: "Error Message",
      showError: true,
      showRegisterModal: false,
    },
    user,
  };

  it("selects the User state from the PipelinerState", () => {
    const userState = userSelector(state);
    expect(userState).toEqual(user);
  });
});
