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
  const email = "joe.bloggs@invalid.com";
  const password = "my super awesome password";

  it("renders correctly", () => {
    const { container } = render(<Register registerUser={jest.fn()} />);

    expect(container).toMatchSnapshot();
  });

  it("validates username has been entered", () => {
    const { getByText, getByTestId } = render(
      <Register registerUser={jest.fn()} />
    );

    fireEvent.click(getByText("Register"));

    fireEvent.change(getByTestId("email-input"), {
      target: { value: email },
    });

    fireEvent.change(getByTestId("password-input"), {
      target: { value: password },
    });

    expect(getByTestId("register-button")).toBeDisabled();
  });

  it("validates email has been entered", () => {
    const { getByText, getByTestId } = render(
      <Register registerUser={jest.fn()} />
    );

    fireEvent.click(getByText("Register"));

    fireEvent.change(getByTestId("username-input"), {
      target: { value: email },
    });

    fireEvent.change(getByTestId("password-input"), {
      target: { value: password },
    });

    expect(getByTestId("register-button")).toBeDisabled();
  });

  it("validates password has been entered", () => {
    const { getByText, getByTestId } = render(
      <Register registerUser={jest.fn()} />
    );

    fireEvent.click(getByText("Register"));

    fireEvent.change(getByTestId("email-input"), {
      target: { value: email },
    });

    fireEvent.change(getByTestId("username-input"), {
      target: { value: username },
    });

    expect(getByTestId("register-button")).toBeDisabled();
  });

  it("calls onRegister function upon clicking register", () => {
    const registerUser = jest.fn();
    const { getByText, getByTestId } = render(
      <Register registerUser={registerUser} />
    );

    fireEvent.click(getByText("Register"));

    fireEvent.change(getByTestId("username-input"), {
      target: { value: username },
    });

    fireEvent.change(getByTestId("email-input"), {
      target: { value: email },
    });

    fireEvent.change(getByTestId("password-input"), {
      target: { value: password },
    });

    fireEvent.click(getByTestId("register-button"));
    expect(registerUser).toHaveBeenCalledWith(username, email, password);
  });

  it("calls hide modal function upon clicking cancel", () => {
    const { getByText, getByTestId } = render(
      <Register registerUser={jest.fn()} />
    );

    fireEvent.click(getByText("Register"));
    fireEvent.click(getByTestId("cancel-button"));

    expect(getByTestId("cancel-button")).not.toBeVisible();
  });
});
