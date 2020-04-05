import { AnyAction } from "redux";
import { ThunkAction, ThunkDispatch } from "redux-thunk";

import { setIsRegistering, setAuthToken } from "./actions";
import { UserService } from "../../services";
import { showError, setShowRegisterModal } from "../ui/actions";

export const registerUser = (
  username: string,
  emailAddress: string,
  password: string
): ThunkAction<Promise<void>, {}, {}, AnyAction> => async (
  dispatch: ThunkDispatch<{}, {}, AnyAction>
) => {
  const userService = new UserService(process.env.PIPELINER_API_URL);
  dispatch(setIsRegistering(true));

  try {
    const token = await userService.registerUser(
      username,
      emailAddress,
      password
    );

    dispatch(setAuthToken(token));
    dispatch(setShowRegisterModal(false));
  } catch (error) {
    dispatch(showError(error.message));
  } finally {
    dispatch(setIsRegistering(false));
  }
};
