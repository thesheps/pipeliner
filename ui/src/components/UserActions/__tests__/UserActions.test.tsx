import React from "react";
import { render } from "@testing-library/react";

import { UserActions } from "../UserActions";

describe("UserActions", () => {
  it("renders register button when not signed-in", () => {
    const { queryByTestId } = render(
      <UserActions registerUser={jest.fn()} isSignedIn={false} />
    );

    expect(queryByTestId("register-dialog-button")).toBeTruthy();
  });

  it("does not render register button when signed-in", () => {
    const { queryByTestId } = render(
      <UserActions registerUser={jest.fn()} isSignedIn={true} />
    );

    expect(queryByTestId("register-dialog-button")).toBeNull();
  });
});
