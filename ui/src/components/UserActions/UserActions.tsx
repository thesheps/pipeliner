import React from "react";

import { Register } from "../Register";

export interface UserActionsProps {
  isSignedIn: boolean;
  registerUser: (username: string, email: string, password: string) => void;
}

export const UserActions = ({ isSignedIn, registerUser }: UserActionsProps) => (
  <>{!isSignedIn && <Register registerUser={registerUser} />}</>
);
