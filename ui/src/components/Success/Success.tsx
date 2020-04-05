import React from "react";
import { connect } from "react-redux";
import { Alert } from "@material-ui/lab";
import { Snackbar } from "@material-ui/core";

import { PipelinerState } from "../../store/types";
import { hideSuccess } from "../../store/ui/actions";
import { uiSelector } from "../../store/ui/selectors";

export interface SuccessProps {
  successMessage: string;
  showSuccess: boolean;
  hideSuccess: Function;
}

interface StateProps {
  successMessage: string;
  showSuccess: boolean;
}

export const Success = ({
  successMessage,
  showSuccess,
  hideSuccess,
}: SuccessProps) => (
  <Snackbar
    data-testid="success-snackbar"
    open={showSuccess}
    autoHideDuration={6000}
    onClose={() => hideSuccess()}
  >
    <Alert
      data-testid="success-alert"
      onClose={() => hideSuccess()}
      severity="success"
    >
      {successMessage}
    </Alert>
  </Snackbar>
);

const mapStateToProps = (state: PipelinerState): StateProps => {
  const uiState = uiSelector(state);

  return {
    showSuccess: uiState.showSuccess,
    successMessage: uiState.successMessage,
  };
};

export const SuccessContainer = connect(mapStateToProps, { hideSuccess })(
  Success
);
