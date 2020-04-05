import React from "react";
import { fireEvent, render } from "@testing-library/react";
import {
  toBeDisabled,
  toBeVisible,
  toHaveStyle,
} from "@testing-library/jest-dom/matchers";

import { Register } from "../Register";

expect.extend({ toBeDisabled, toBeVisible, toHaveStyle });

describe("Register", () => {
  const username = "joe.bloggs";
  const emailAddress = "joe.bloggs@invalid.com";
  const password = "my super awesome password";

  it("renders correctly", () => {
    const { container } = render(
      <Register
        showRegisterModal={true}
        setShowRegisterModal={jest.fn()}
        registerUser={jest.fn()}
      />
    );

    expect(container).toMatchSnapshot();
  });

  it("calls setShowRegisterModal on register click", () => {
    const setShowRegisterModal = jest.fn();
    const { getByText } = render(
      <Register
        showRegisterModal={false}
        setShowRegisterModal={setShowRegisterModal}
        registerUser={jest.fn()}
      />
    );

    fireEvent.click(getByText("Register"));

    expect(setShowRegisterModal).toHaveBeenCalled();
  });

  it("validates username has been entered", () => {
    const { getByTestId } = render(
      <Register
        showRegisterModal={true}
        setShowRegisterModal={jest.fn()}
        registerUser={jest.fn()}
      />
    );

    fireEvent.change(getByTestId("emailAddress-input"), {
      target: { value: emailAddress },
    });

    fireEvent.change(getByTestId("password-input"), {
      target: { value: password },
    });

    expect(getByTestId("register-button")).toBeDisabled();
  });

  it("validates emailAddress has been entered", () => {
    const { getByTestId } = render(
      <Register
        showRegisterModal={true}
        setShowRegisterModal={jest.fn()}
        registerUser={jest.fn()}
      />
    );

    fireEvent.change(getByTestId("username-input"), {
      target: { value: username },
    });

    fireEvent.change(getByTestId("password-input"), {
      target: { value: password },
    });

    expect(getByTestId("register-button")).toBeDisabled();
  });

  it("validates emailAddress is in the correct format", () => {
    const { getByTestId } = render(
      <Register
        showRegisterModal={true}
        setShowRegisterModal={jest.fn()}
        registerUser={jest.fn()}
      />
    );

    fireEvent.change(getByTestId("username-input"), {
      target: { value: username },
    });

    fireEvent.change(getByTestId("password-input"), {
      target: { value: password },
    });

    fireEvent.change(getByTestId("emailAddress-input"), {
      target: { value: "emailAddress" },
    });

    expect(getByTestId("register-button")).toBeDisabled();
  });

  it("validates password has been entered", () => {
    const { getByTestId } = render(
      <Register
        showRegisterModal={true}
        setShowRegisterModal={jest.fn()}
        registerUser={jest.fn()}
      />
    );

    fireEvent.change(getByTestId("emailAddress-input"), {
      target: { value: emailAddress },
    });

    fireEvent.change(getByTestId("username-input"), {
      target: { value: username },
    });

    expect(getByTestId("register-button")).toBeDisabled();
  });

  it("calls registerUser function upon clicking register", () => {
    const registerUser = jest.fn();
    const { getByTestId } = render(
      <Register
        showRegisterModal={true}
        setShowRegisterModal={jest.fn()}
        registerUser={registerUser}
      />
    );

    fireEvent.change(getByTestId("username-input"), {
      target: { value: username },
    });

    fireEvent.change(getByTestId("emailAddress-input"), {
      target: { value: emailAddress },
    });

    fireEvent.change(getByTestId("password-input"), {
      target: { value: password },
    });

    fireEvent.click(getByTestId("register-button"));
    expect(registerUser).toHaveBeenCalledWith(username, emailAddress, password);
  });

  it("calls hide modal function upon clicking cancel", () => {
    const setShowRegisterModal = jest.fn();
    const { getByTestId } = render(
      <Register
        showRegisterModal={true}
        setShowRegisterModal={setShowRegisterModal}
        registerUser={jest.fn()}
      />
    );

    fireEvent.click(getByTestId("cancel-button"));

    expect(setShowRegisterModal).toHaveBeenCalled();
  });
});
