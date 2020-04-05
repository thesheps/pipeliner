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
import { registerUserThunk } from "../../store/user/thunks";
import { setShowRegisterModal } from "../../store/ui/actions";

export interface RegisterProps {
  showRegisterModal: boolean;
  setShowRegisterModal: (show: boolean) => void;
  registerUser: (
    username: string,
    emailAddress: string,
    password: string
  ) => void;
}

interface StateProps {
  showRegisterModal: boolean;
}

export const Register = ({
  registerUser,
  setShowRegisterModal,
  showRegisterModal,
}: RegisterProps) => {
  const [username, setUsername] = useState("");
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
        data-testid="register-dialog-button"
        color="inherit"
        onClick={() => setShowRegisterModal(true)}
      >
        Register
      </Button>

      <Dialog
        open={showRegisterModal}
        onClose={() => setShowRegisterModal(false)}
      >
        <DialogTitle id="form-dialog-title">Register</DialogTitle>

        <DialogContent>
          <DialogContentText>Register here to get going!</DialogContentText>

          <TextField
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            inputProps={{ "data-testid": "username-input" }}
            autoFocus
            margin="dense"
            label="Username"
            type="text"
            fullWidth
          />

          <TextField
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
            onClick={() => setShowRegisterModal(false)}
            color="primary"
          >
            Cancel
          </Button>

          <Button
            data-testid="register-button"
            onClick={() => registerUser(username, emailAddress, password)}
            color="primary"
            disabled={!username || !emailAddress || !password || !!emailError}
          >
            Register
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

const mapStateToProps = (state: PipelinerState): StateProps => {
  const uiState = uiSelector(state);

  return {
    showRegisterModal: uiState.showRegisterModal,
  };
};

export const RegisterContainer = connect(mapStateToProps, {
  registerUser: registerUserThunk,
  setShowRegisterModal,
})(Register);
