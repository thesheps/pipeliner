import React from "react";

import { RegisterContainer } from "../Register";

export interface UserActionsProps {
  isSignedIn: boolean;
}

export const UserActions = ({ isSignedIn }: UserActionsProps) => (
  <>{!isSignedIn && <RegisterContainer />}</>
);
