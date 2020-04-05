import React from "react";
import Button from "@material-ui/core/Button";
import { connect } from "react-redux";

import { signOutUserThunk } from "../../store/user/thunks";

export interface SignOutProps {
  signOutUser: () => void;
}

export const SignOut = ({ signOutUser }: SignOutProps) => (
  <Button
    data-testid="signOut-button"
    color="inherit"
    onClick={() => signOutUser()}
  >
    Sign Out
  </Button>
);

export const SignOutContainer = connect(null, {
  signOutUser: signOutUserThunk,
})(SignOut);
