import React from "react";

import { RegisterContainer } from "../Register";
import { SignInContainer } from "../SignIn";

export interface UserActionsProps {
  isSignedIn: boolean;
}

export const UserActions = ({ isSignedIn }: UserActionsProps) => (
  <>
    {!isSignedIn && (
      <>
        <SignInContainer />
        <RegisterContainer />
      </>
    )}
  </>
);
