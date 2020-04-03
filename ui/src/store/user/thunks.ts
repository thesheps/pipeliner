import { AnyAction } from "redux";
import { ThunkAction, ThunkDispatch } from "redux-thunk";

import { setIsRegistering, setAuthToken, setAuthFailed } from "./actions";
import { UserService } from "../../services";

export const registerUser = (
  username: string,
  email: string,
  password: string
): ThunkAction<Promise<void>, {}, {}, AnyAction> => async (
  dispatch: ThunkDispatch<{}, {}, AnyAction>
) => {
  const userService = new UserService(process.env.PIPELINER_API_URL);
  dispatch(setIsRegistering(true));

  try {
    const token = await userService.registerUser(username, email, password);
    dispatch(setAuthToken(token));
  } catch (error) {
    dispatch(setAuthFailed(error.message));
  } finally {
    dispatch(setIsRegistering(false));
  }
};
