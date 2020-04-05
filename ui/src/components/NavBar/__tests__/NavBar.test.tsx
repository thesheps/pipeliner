import React from "react";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import { fireEvent, render } from "@testing-library/react";

import {
  SET_IS_AUTHENTICATING,
  SET_AUTH_TOKEN,
  UserState,
} from "../../../store/user/types";
import { SET_SHOW_REGISTER_MODAL, SHOW_SUCCESS } from "../../../store/ui/types";
import { UserService } from "../../../services";
import { NavBar, NavBarContainer } from "../NavBar";
import { initialState } from "../../../store/initialState";

jest.mock("../../../services");

describe("NavBar", () => {
  const appName = "My Lovely Test";
  const username = "joe.bloggs";
  const emailAddress = "joe.bloggs@invalid.com";
  const password = "my super awesome password";
  const mockStore = configureStore([thunk]);

  it("renders correctly", () => {
    const store = mockStore(initialState);

    const { getByText } = render(
      <Provider store={store}>
        <NavBar isSignedIn={false} appName={appName} />
      </Provider>
    );

    expect(getByText(appName)).toMatchSnapshot();
  });

  it("renders UserActions", () => {
    const store = mockStore(initialState);

    const { getByText } = render(
      <Provider store={store}>
        <NavBar isSignedIn={false} appName={appName} />
      </Provider>
    );

    expect(getByText("Register")).toBeTruthy();
  });

  it("maps state properties correctly", () => {
    const userState: UserState = {
      isSignedIn: true,
      isAuthenticating: false,
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
    const store = mockStore({
      ...initialState,
      ui: { showRegisterModal: true, showSignInModal: false },
    });

    const { getByTestId } = render(
      <Provider store={store}>
        <NavBarContainer />
      </Provider>
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

    const actions = await store.getActions();

    await expect(actions).toEqual([
      { isAuthenticating: true, type: SET_IS_AUTHENTICATING },
      { authToken: "authToken", type: SET_AUTH_TOKEN },
      { successMessage: "Registration Successful!", type: SHOW_SUCCESS },
      { show: false, type: SET_SHOW_REGISTER_MODAL },
      { isAuthenticating: false, type: SET_IS_AUTHENTICATING },
    ]);
  });
});
