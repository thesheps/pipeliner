import React from "react";

import { RegisterContainer } from "../Register";
import { SignInContainer } from "../SignIn";
import { SignOutContainer } from "../SignOut";

export interface UserActionsProps {
  isSignedIn: boolean;
}

export const UserActions = ({ isSignedIn }: UserActionsProps) => {
  if (isSignedIn) {
    return <SignOutContainer />;
  }

  return (
    <>
      <SignInContainer />
      <RegisterContainer />
    </>
  );
};
