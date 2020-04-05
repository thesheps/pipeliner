import { UserState } from "./types";

export const initialUserState: UserState = {
  authToken: "",
  isAuthenticating: false,
  isSignedIn: false,
};
