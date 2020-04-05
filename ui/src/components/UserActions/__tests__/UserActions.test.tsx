import React from "react";
import thunk from "redux-thunk";
import configureStore from "redux-mock-store";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";

import { initialState } from "../../../store/initialState";
import { UserActions } from "../UserActions";

describe("UserActions", () => {
  const mockStore = configureStore([thunk]);
  const store = mockStore(initialState);

  it("renders correctly", () => {
    const { container } = render(
      <Provider store={store}>
        <UserActions isSignedIn={false} />
      </Provider>
    );

    expect(container).toMatchSnapshot();
  });

  it("renders register button when not signed-in", () => {
    const { queryByTestId } = render(
      <Provider store={store}>
        <UserActions isSignedIn={false} />
      </Provider>
    );

    expect(queryByTestId("register-dialog-button")).toBeTruthy();
  });

  it("does not render register button when signed-in", () => {
    const { queryByTestId } = render(
      <Provider store={store}>
        <UserActions isSignedIn={true} />
      </Provider>
    );

    expect(queryByTestId("register-dialog-button")).toBeNull();
  });

  it("renders signIn button when not signed-in", () => {
    const { queryByTestId } = render(
      <Provider store={store}>
        <UserActions isSignedIn={false} />
      </Provider>
    );

    expect(queryByTestId("signIn-dialog-button")).toBeTruthy();
  });

  it("does not render signIn button when signed-in", () => {
    const { queryByTestId } = render(
      <Provider store={store}>
        <UserActions isSignedIn={true} />
      </Provider>
    );

    expect(queryByTestId("signIn-dialog-button")).toBeNull();
  });

  it("renders signOut button when signed-in", () => {
    const { queryByTestId } = render(
      <Provider store={store}>
        <UserActions isSignedIn={true} />
      </Provider>
    );

    expect(queryByTestId("signOut-button")).toBeTruthy();
  });

  it("does not render signOut button when not signed-in", () => {
    const { queryByTestId } = render(
      <Provider store={store}>
        <UserActions isSignedIn={false} />
      </Provider>
    );

    expect(queryByTestId("signOut-button")).toBeNull();
  });
});
