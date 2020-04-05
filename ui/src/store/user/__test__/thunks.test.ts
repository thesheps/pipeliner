import { UserService } from "../../../services";
import {
  registerUserThunk,
  signInUserThunk,
  signOutUserThunk,
} from "../thunks";
import { setIsAuthenticating, setAuthToken, signOutUser } from "../actions";
import {
  showError,
  setShowRegisterModal,
  showSuccess,
  setShowSignInModal,
} from "../../ui/actions";

jest.mock("../../../services");

describe("User Registration", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("dispatches setIsAuthenticating and setAuthToken on happy registration", async () => {
    const authToken = "TEST_AUTH";
    const dispatch = jest.fn();
    UserService.prototype.registerUser = (): Promise<string> =>
      new Promise((res: Function) => res(authToken));

    await registerUserThunk("joe.bloggs", "joe.bloggs@invalid.com", "password")(
      dispatch,
      jest.fn(),
      {}
    );

    expect(dispatch).toHaveBeenNthCalledWith(1, setIsAuthenticating(true));
    expect(dispatch).toHaveBeenNthCalledWith(2, setAuthToken(authToken));
    expect(dispatch).toHaveBeenNthCalledWith(
      3,
      showSuccess("Registration Successful!")
    );
    expect(dispatch).toHaveBeenNthCalledWith(4, setShowRegisterModal(false));
    expect(dispatch).toHaveBeenNthCalledWith(5, setIsAuthenticating(false));
  });

  it("dispatches setIsAuthenticating and showError on sad registration", async () => {
    const sadMessage = "It went bad :(";
    const dispatch = jest.fn();
    UserService.prototype.registerUser = (): Promise<string> =>
      new Promise((res: Function, rej: Function) => rej(new Error(sadMessage)));

    await registerUserThunk("joe.bloggs", "joe.bloggs@invalid.com", "password")(
      dispatch,
      jest.fn(),
      {}
    );

    expect(dispatch).toHaveBeenNthCalledWith(1, setIsAuthenticating(true));
    expect(dispatch).toHaveBeenNthCalledWith(2, showError(sadMessage));
    expect(dispatch).toHaveBeenNthCalledWith(3, setIsAuthenticating(false));
  });
});

describe("User SignIn", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("dispatches setIsAuthenticating and setAuthToken on happy sign-in", async () => {
    const authToken = "TEST_AUTH";
    const dispatch = jest.fn();
    UserService.prototype.signInUser = (): Promise<string> =>
      new Promise((res: Function) => res(authToken));

    await signInUserThunk("joe.bloggs@invalid.com", "password")(
      dispatch,
      jest.fn(),
      {}
    );

    expect(dispatch).toHaveBeenNthCalledWith(1, setIsAuthenticating(true));
    expect(dispatch).toHaveBeenNthCalledWith(2, setAuthToken(authToken));
    expect(dispatch).toHaveBeenNthCalledWith(
      3,
      showSuccess("Sign-In Successful!")
    );
    expect(dispatch).toHaveBeenNthCalledWith(4, setShowSignInModal(false));
    expect(dispatch).toHaveBeenNthCalledWith(5, setIsAuthenticating(false));
  });

  it("dispatches setIsAuthenticating and showError on sad sign-in", async () => {
    const sadMessage = "It went bad :(";
    const dispatch = jest.fn();
    UserService.prototype.signInUser = (): Promise<string> =>
      new Promise((res: Function, rej: Function) => rej(new Error(sadMessage)));

    await signInUserThunk("joe.bloggs@invalid.com", "password")(
      dispatch,
      jest.fn(),
      {}
    );

    expect(dispatch).toHaveBeenNthCalledWith(1, setIsAuthenticating(true));
    expect(dispatch).toHaveBeenNthCalledWith(2, showError(sadMessage));
    expect(dispatch).toHaveBeenNthCalledWith(3, setIsAuthenticating(false));
  });

  it("dispatches signOut and showSuccess on sign-out", async () => {
    const successMessage = "Sign-Out Successful!";
    const dispatch = jest.fn();

    await signOutUserThunk()(dispatch, jest.fn(), {});

    expect(dispatch).toHaveBeenNthCalledWith(1, signOutUser());
    expect(dispatch).toHaveBeenNthCalledWith(2, showSuccess(successMessage));
  });
});
