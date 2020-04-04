import React from "react";
import { connect } from "react-redux";
import { Alert } from "@material-ui/lab";
import { Snackbar } from "@material-ui/core";
import { PipelinerState } from "../../store/pipeliner/types";

export interface ErrorProps {
  errorMessage: string;
  showError: boolean;
  handleErrorClose: Function;
}

interface StateProps {
  errorMessage: string;
  showError: boolean;
}

export const Error = ({
  errorMessage,
  showError,
  handleErrorClose,
}: ErrorProps) => (
  <Snackbar
    data-testid="error-snackbar"
    open={showError}
    autoHideDuration={6000}
    onClose={() => handleErrorClose()}
  >
    <Alert
      data-testid="error-alert"
      onClose={() => handleErrorClose()}
      severity="success"
    >
      {errorMessage}
    </Alert>
  </Snackbar>
);

const mapStateToProps = (state: PipelinerState): StateProps => ({
  showError: state.showError,
  errorMessage: state.errorMessage,
});

export const ErrorContainer = connect(mapStateToProps)(Error);
