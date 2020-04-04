import React from "react";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import { fireEvent, render } from "@testing-library/react";

import { Error, ErrorProps, ErrorContainer } from "../Error";
import { UIState } from "../../../store/ui/types";
import { initialState } from "../../../store/initialState";

describe("Error", () => {
  const errorProps: ErrorProps = {
    errorMessage: "Something Bad Happened!",
    hideError: jest.fn(),
    showError: true,
  };

  it("renders correctly", () => {
    const { container } = render(<Error {...errorProps} />);

    expect(container).toMatchSnapshot();
  });

  it("shows the snackbar", () => {
    const { getByTestId } = render(<Error {...errorProps} />);

    expect(getByTestId("error-snackbar")).toBeTruthy();
  });

  it("hides the snackbar", () => {
    const props = { ...errorProps, showError: false };
    const { queryByTestId } = render(<Error {...props} />);

    expect(queryByTestId("error-snackbar")).toBeNull();
  });

  it("displays the expected message", () => {
    const props = { ...errorProps };
    const { getByText } = render(<Error {...props} />);

    expect(getByText(errorProps.errorMessage)).toBeTruthy();
  });

  it("calls hideError function upon closing Snackbar", () => {
    const hideError = jest.fn();
    const props = { ...errorProps, hideError };
    const { getByLabelText } = render(<Error {...props} />);

    fireEvent.click(getByLabelText("Close"));
    expect(hideError).toHaveBeenCalled();
  });

  it("maps state properties correctly", () => {
    const initialUIState: UIState = {
      errorMessage: "Whoops!",
      showError: true,
    };

    const initialPipelinerState = {
      ...initialState,
      ui: initialUIState,
    };

    const mockStore = configureStore([thunk]);
    const store = mockStore({ ...initialPipelinerState, isSignedIn: true });

    const { getByText } = render(
      <Provider store={store}>
        <ErrorContainer />
      </Provider>
    );

    expect(getByText(initialUIState.errorMessage)).toBeTruthy();
  });
});
