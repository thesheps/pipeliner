import { UserService } from "../../../services";
import { registerUser } from "../thunks";
import { setIsRegistering, setAuthToken, setAuthFailed } from "../actions";

jest.mock("../../../services");

describe("User thunks", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("dispatches setIsRegistering and setAuthToken on happy registration", async () => {
    const authToken = "TEST_AUTH";
    const dispatch = jest.fn();
    UserService.prototype.registerUser = (): Promise<string> =>
      new Promise((res: Function) => res(authToken));

    await registerUser("joe.bloggs", "joe.bloggs@invalid.com", "password")(
      dispatch,
      jest.fn(),
      {}
    );

    expect(dispatch).toHaveBeenNthCalledWith(1, setIsRegistering(true));
    expect(dispatch).toHaveBeenNthCalledWith(2, setAuthToken(authToken));
    expect(dispatch).toHaveBeenNthCalledWith(3, setIsRegistering(false));
  });

  it("dispatches setIsRegistering and setAuthFailed on sad registration", async () => {
    const sadMessage = "It went bad :(";
    const dispatch = jest.fn();
    UserService.prototype.registerUser = (): Promise<string> =>
      new Promise((res: Function, rej: Function) => rej(new Error(sadMessage)));

    await registerUser("joe.bloggs", "joe.bloggs@invalid.com", "password")(
      dispatch,
      jest.fn(),
      {}
    );

    expect(dispatch).toHaveBeenNthCalledWith(1, setIsRegistering(true));
    expect(dispatch).toHaveBeenNthCalledWith(2, setAuthFailed(sadMessage));
    expect(dispatch).toHaveBeenNthCalledWith(3, setIsRegistering(false));
  });
});
