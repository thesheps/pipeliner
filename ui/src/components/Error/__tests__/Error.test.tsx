import React from "react";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import { render } from "@testing-library/react";

import { Error, ErrorProps, ErrorContainer } from "../Error";
import { PipelinerState } from "../../../store/pipeliner/types";

describe("Error", () => {
  const errorProps: ErrorProps = {
    errorMessage: "Something Bad Happened!",
    handleErrorClose: jest.fn(),
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

  it("maps state properties correctly", () => {
    const initialState: PipelinerState = {
      errorMessage: "Whoops!",
      showError: true,
    };

    const mockStore = configureStore([thunk]);
    const store = mockStore({ ...initialState, isSignedIn: true });

    const { getByText } = render(
      <Provider store={store}>
        <ErrorContainer />
      </Provider>
    );

    expect(getByText(initialState.errorMessage)).toBeTruthy();
  });
});
