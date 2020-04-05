import React from "react";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import { fireEvent, render } from "@testing-library/react";

import { Success, SuccessProps, SuccessContainer } from "../Success";
import { UIState } from "../../../store/ui/types";
import { initialState } from "../../../store/initialState";

describe("Success", () => {
  const successProps: SuccessProps = {
    successMessage: "Yaaaaaaaay!",
    hideSuccess: jest.fn(),
    showSuccess: true,
  };

  it("renders correctly", () => {
    const { container } = render(<Success {...successProps} />);

    expect(container).toMatchSnapshot();
  });

  it("shows the snackbar", () => {
    const { getByTestId } = render(<Success {...successProps} />);

    expect(getByTestId("success-snackbar")).toBeTruthy();
  });

  it("hides the snackbar", () => {
    const props = { ...successProps, showSuccess: false };
    const { queryByTestId } = render(<Success {...props} />);

    expect(queryByTestId("success-snackbar")).toBeNull();
  });

  it("displays the expected message", () => {
    const props = { ...successProps };
    const { getByText } = render(<Success {...props} />);

    expect(getByText(successProps.successMessage)).toBeTruthy();
  });

  it("calls hideSuccess function upon closing Snackbar", () => {
    const hideSuccess = jest.fn();
    const props = { ...successProps, hideSuccess };
    const { getByLabelText } = render(<Success {...props} />);

    fireEvent.click(getByLabelText("Close"));
    expect(hideSuccess).toHaveBeenCalled();
  });

  it("maps state properties correctly", () => {
    const initialUIState: UIState = {
      showError: false,
      errorMessage: "",
      showSuccess: true,
      successMessage: "Yay!",
      showRegisterModal: false,
    };

    const initialPipelinerState = {
      ...initialState,
      ui: initialUIState,
    };

    const mockStore = configureStore([thunk]);
    const store = mockStore({ ...initialPipelinerState, isSignedIn: true });

    const { getByText } = render(
      <Provider store={store}>
        <SuccessContainer />
      </Provider>
    );

    expect(getByText(initialUIState.successMessage)).toBeTruthy();
  });
});
