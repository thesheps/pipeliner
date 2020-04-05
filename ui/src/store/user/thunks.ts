import Cookies from "js-cookie";
import { AnyAction } from "redux";
import { ThunkAction, ThunkDispatch } from "redux-thunk";

import { setIsAuthenticating, signOutUser, signInUser } from "./actions";
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
    const authToken = await userService.registerUser(
      username,
      emailAddress,
      password
    );

    Cookies.set("authToken", authToken);
    dispatch(signInUser());
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
    const authToken = await userService.signInUser(emailAddress, password);
    Cookies.set("authToken", authToken);

    dispatch(signInUser());
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
  Cookies.remove("authToken");
  dispatch(signOutUser());
  dispatch(showSuccess("Sign-Out Successful!"));
};
