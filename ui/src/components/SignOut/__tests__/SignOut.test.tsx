import React from "react";
import { fireEvent, render } from "@testing-library/react";
import {
  toBeDisabled,
  toBeVisible,
  toHaveStyle,
} from "@testing-library/jest-dom/matchers";

import { SignOut } from "../SignOut";

expect.extend({ toBeDisabled, toBeVisible, toHaveStyle });

describe("SignOut", () => {
  it("renders correctly", () => {
    const { container } = render(<SignOut signOutUser={jest.fn()} />);

    expect(container).toMatchSnapshot();
  });

  it("calls signOutUser on signOut click", () => {
    const signOut = jest.fn();
    const { getByText } = render(<SignOut signOutUser={signOut} />);

    fireEvent.click(getByText("Sign Out"));

    expect(signOut).toHaveBeenCalled();
  });
});
