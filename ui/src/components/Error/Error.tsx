import React from "react";
import { connect } from "react-redux";
import { Alert } from "@material-ui/lab";
import { Snackbar } from "@material-ui/core";

import { PipelinerState } from "../../store/types";
import { hideError } from "../../store/ui/actions";
import { uiSelector } from "../../store/ui/selectors";

export interface ErrorProps {
  errorMessage: string;
  showError: boolean;
  hideError: Function;
}

interface StateProps {
  errorMessage: string;
  showError: boolean;
}

export const Error = ({ errorMessage, showError, hideError }: ErrorProps) => (
  <Snackbar
    data-testid="error-snackbar"
    open={showError}
    autoHideDuration={6000}
    onClose={() => hideError()}
  >
    <Alert
      data-testid="error-alert"
      onClose={() => hideError()}
      severity="error"
    >
      {errorMessage}
    </Alert>
  </Snackbar>
);

const mapStateToProps = (state: PipelinerState): StateProps => {
  const uiState = uiSelector(state);

  return {
    showError: uiState.showError,
    errorMessage: uiState.errorMessage,
  };
};

export const ErrorContainer = connect(mapStateToProps, { hideError })(Error);
