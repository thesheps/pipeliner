import React from "react";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import { fireEvent, render } from "@testing-library/react";

import {
  SET_IS_REGISTERING,
  SET_AUTH_TOKEN,
  UserState,
} from "../../../store/user/types";
import { NavBar, NavBarContainer } from "../NavBar";
import { initialState } from "../../../store/initialState";
import { UserService } from "../../../services";

jest.mock("../../../services");

describe("NavBar", () => {
  const appName = "My Lovely Test";
  const username = "joe.bloggs";
  const email = "joe.bloggs@invalid.com";
  const password = "my super awesome password";
  const mockStore = configureStore([thunk]);

  it("renders correctly", () => {
    const { getByText } = render(
      <NavBar registerUser={() => {}} isSignedIn={false} appName={appName} />
    );

    expect(getByText(appName)).toMatchSnapshot();
  });

  it("renders UserActions", () => {
    const { getByText } = render(
      <NavBar registerUser={() => {}} isSignedIn={false} appName={appName} />
    );

    expect(getByText("Register")).toBeTruthy();
  });

  it("maps state properties correctly", () => {
    const userState: UserState = {
      isSignedIn: true,
      isRegistering: false,
      authToken: "",
    };

    const pipelinerState = { ...initialState, user: userState };
    const store = mockStore({ ...pipelinerState, isSignedIn: true });

    const { queryByTestId } = render(
      <Provider store={store}>
        <NavBarContainer />
      </Provider>
    );

    expect(queryByTestId("register-dialog-button")).toBeNull();
  });

  it("dispatches actions to store on register", async () => {
    UserService.prototype.registerUser = (): Promise<string> =>
      new Promise((res: Function) => res("authToken"));

    const mockStore = configureStore([thunk]);
    const store = mockStore(initialState);

    const { getByText, getByTestId } = render(
      <Provider store={store}>
        <NavBarContainer />
      </Provider>
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

    const actions = await store.getActions();

    await expect(actions).toEqual([
      { isRegistering: true, type: SET_IS_REGISTERING },
      { authToken: "authToken", type: SET_AUTH_TOKEN },
      { isRegistering: false, type: SET_IS_REGISTERING },
    ]);
  });
});
