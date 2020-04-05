import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import { connect } from "react-redux";

import { PipelinerState } from "../../store/types";
import { uiSelector } from "../../store/ui/selectors";
import { signInUserThunk } from "../../store/user/thunks";
import { setShowSignInModal } from "../../store/ui/actions";

export interface SignInProps {
  showSignInModal: boolean;
  setShowSignInModal: (show: boolean) => void;
  signInUser: (emailAddress: string, password: string) => void;
}

interface StateProps {
  showSignInModal: boolean;
}

export const SignIn = ({
  signInUser,
  setShowSignInModal,
  showSignInModal,
}: SignInProps) => {
  const [emailAddress, setEmailAddress] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [password, setPassword] = useState("");

  const validateEmailAddress = (email: string) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const isValid = re.test(email.toLowerCase());

    setEmailAddress(email);

    if (!isValid) {
      setEmailError(true);
    } else {
      setEmailError(false);
    }
  };

  return (
    <>
      <Button
        data-testid="signIn-dialog-button"
        color="inherit"
        onClick={() => setShowSignInModal(true)}
      >
        Sign In
      </Button>

      <Dialog open={showSignInModal} onClose={() => setShowSignInModal(false)}>
        <DialogTitle id="form-dialog-title">Sign In</DialogTitle>

        <DialogContent>
          <DialogContentText>Sign In here to get going!</DialogContentText>

          <TextField
            autoFocus
            value={emailAddress}
            onChange={(e) => validateEmailAddress(e.target.value)}
            inputProps={{ "data-testid": "emailAddress-input" }}
            margin="dense"
            label="Email"
            type="email"
            error={!!emailError}
            helperText="Please enter a valid email address"
            fullWidth
          />

          <TextField
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            inputProps={{ "data-testid": "password-input" }}
            margin="dense"
            label="Password"
            type="password"
            fullWidth
          />
        </DialogContent>

        <DialogActions>
          <Button
            data-testid="cancel-button"
            onClick={() => setShowSignInModal(false)}
            color="primary"
          >
            Cancel
          </Button>

          <Button
            data-testid="signIn-button"
            onClick={() => signInUser(emailAddress, password)}
            color="primary"
            disabled={!emailAddress || !password || !!emailError}
          >
            Sign In
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

const mapStateToProps = (state: PipelinerState): StateProps => {
  const uiState = uiSelector(state);

  return {
    showSignInModal: uiState.showSignInModal,
  };
};

export const SignInContainer = connect(mapStateToProps, {
  signInUser: signInUserThunk,
  setShowSignInModal,
})(SignIn);
