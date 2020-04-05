import React from "react";
import { fireEvent, render } from "@testing-library/react";
import {
  toBeDisabled,
  toBeVisible,
  toHaveStyle,
} from "@testing-library/jest-dom/matchers";

import { SignIn } from "../SignIn";

expect.extend({ toBeDisabled, toBeVisible, toHaveStyle });

describe("SignIn", () => {
  const emailAddress = "joe.bloggs@invalid.com";
  const password = "my super awesome password";

  it("renders correctly", () => {
    const { container } = render(
      <SignIn
        showSignInModal={true}
        setShowSignInModal={jest.fn()}
        signInUser={jest.fn()}
      />
    );

    expect(container).toMatchSnapshot();
  });

  it("calls setShowSignInModal on signIn click", () => {
    const setShowSignInModal = jest.fn();
    const { getByText } = render(
      <SignIn
        showSignInModal={false}
        setShowSignInModal={setShowSignInModal}
        signInUser={jest.fn()}
      />
    );

    fireEvent.click(getByText("SignIn"));

    expect(setShowSignInModal).toHaveBeenCalled();
  });

  it("validates emailAddress has been entered", () => {
    const { getByTestId } = render(
      <SignIn
        showSignInModal={true}
        setShowSignInModal={jest.fn()}
        signInUser={jest.fn()}
      />
    );

    fireEvent.change(getByTestId("password-input"), {
      target: { value: password },
    });

    expect(getByTestId("signIn-button")).toBeDisabled();
  });

  it("validates emailAddress is in the correct format", () => {
    const { getByTestId } = render(
      <SignIn
        showSignInModal={true}
        setShowSignInModal={jest.fn()}
        signInUser={jest.fn()}
      />
    );

    fireEvent.change(getByTestId("password-input"), {
      target: { value: password },
    });

    fireEvent.change(getByTestId("emailAddress-input"), {
      target: { value: "emailAddress" },
    });

    expect(getByTestId("signIn-button")).toBeDisabled();
  });

  it("validates password has been entered", () => {
    const { getByTestId } = render(
      <SignIn
        showSignInModal={true}
        setShowSignInModal={jest.fn()}
        signInUser={jest.fn()}
      />
    );

    fireEvent.change(getByTestId("emailAddress-input"), {
      target: { value: emailAddress },
    });

    expect(getByTestId("signIn-button")).toBeDisabled();
  });

  it("calls signInUser function upon clicking signIn", () => {
    const signInUser = jest.fn();
    const { getByTestId } = render(
      <SignIn
        showSignInModal={true}
        setShowSignInModal={jest.fn()}
        signInUser={signInUser}
      />
    );

    fireEvent.change(getByTestId("emailAddress-input"), {
      target: { value: emailAddress },
    });

    fireEvent.change(getByTestId("password-input"), {
      target: { value: password },
    });

    fireEvent.click(getByTestId("signIn-button"));
    expect(signInUser).toHaveBeenCalledWith(emailAddress, password);
  });

  it("calls hide modal function upon clicking cancel", () => {
    const setShowSignInModal = jest.fn();
    const { getByTestId } = render(
      <SignIn
        showSignInModal={true}
        setShowSignInModal={setShowSignInModal}
        signInUser={jest.fn()}
      />
    );

    fireEvent.click(getByTestId("cancel-button"));

    expect(setShowSignInModal).toHaveBeenCalled();
  });
});
