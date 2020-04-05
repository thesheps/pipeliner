import { AnyAction } from "redux";
import { ThunkAction, ThunkDispatch } from "redux-thunk";

import { setIsAuthenticating, setAuthToken, signOutUser } from "./actions";
import { UserService } from "../../services";
import {
  showError,
  setShowRegisterModal,
  showSuccess,
  setShowSignInModal,
} from "../ui/actions";

export const registerUserThunk = (
  username: string,
  emailAddress: string,
  password: string
): ThunkAction<Promise<void>, {}, {}, AnyAction> => async (
  dispatch: ThunkDispatch<{}, {}, AnyAction>
) => {
  const userService = new UserService(process.env.PIPELINER_API_URL);
  dispatch(setIsAuthenticating(true));

  try {
    const token = await userService.registerUser(
      username,
      emailAddress,
      password
    );

    dispatch(setAuthToken(token));
    dispatch(showSuccess("Registration Successful!"));
    dispatch(setShowRegisterModal(false));
  } catch (error) {
    dispatch(showError(error.message));
  } finally {
    dispatch(setIsAuthenticating(false));
  }
};

export const signInUserThunk = (
  emailAddress: string,
  password: string
): ThunkAction<Promise<void>, {}, {}, AnyAction> => async (
  dispatch: ThunkDispatch<{}, {}, AnyAction>
) => {
  const userService = new UserService(process.env.PIPELINER_API_URL);
  dispatch(setIsAuthenticating(true));

  try {
    const token = await userService.signInUser(emailAddress, password);

    dispatch(setAuthToken(token));
    dispatch(showSuccess("Sign-In Successful!"));
    dispatch(setShowSignInModal(false));
  } catch (error) {
    dispatch(showError(error.message));
  } finally {
    dispatch(setIsAuthenticating(false));
  }
};

export const signOutUserThunk = (): ThunkAction<
  Promise<void>,
  {},
  {},
  AnyAction
> => async (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
  dispatch(signOutUser());
  dispatch(showSuccess("Sign-Out Successful!"));
};
