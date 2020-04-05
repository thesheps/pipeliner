import { UserService } from "../../../services";
import { registerUser } from "../thunks";
import { setIsAuthenticating, setAuthToken } from "../actions";
import { showError, setShowRegisterModal, showSuccess } from "../../ui/actions";

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

    await registerUser("joe.bloggs", "joe.bloggs@invalid.com", "password")(
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

    await registerUser("joe.bloggs", "joe.bloggs@invalid.com", "password")(
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

  it("dispatches setIsAuthenticating and setAuthToken on happy registration", async () => {
    const authToken = "TEST_AUTH";
    const dispatch = jest.fn();
    UserService.prototype.registerUser = (): Promise<string> =>
      new Promise((res: Function) => res(authToken));

    await registerUser("joe.bloggs", "joe.bloggs@invalid.com", "password")(
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

    await registerUser("joe.bloggs", "joe.bloggs@invalid.com", "password")(
      dispatch,
      jest.fn(),
      {}
    );

    expect(dispatch).toHaveBeenNthCalledWith(1, setIsAuthenticating(true));
    expect(dispatch).toHaveBeenNthCalledWith(2, showError(sadMessage));
    expect(dispatch).toHaveBeenNthCalledWith(3, setIsAuthenticating(false));
  });
});
