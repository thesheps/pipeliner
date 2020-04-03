import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";

export interface RegisterProps {
  registerUser: (username: string, email: string, password: string) => void;
}

export const Register = ({ registerUser }: RegisterProps) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        data-testid="register-dialog-button"
        color="inherit"
        onClick={() => setOpen(true)}
      >
        Register
      </Button>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle id="form-dialog-title">Register</DialogTitle>

        <DialogContent>
          <DialogContentText>Register here to get going!</DialogContentText>

          <TextField
            value={username}
            onChange={e => setUsername(e.target.value)}
            inputProps={{ "data-testid": "username-input" }}
            autoFocus
            margin="dense"
            label="Username"
            type="text"
            fullWidth
          />

          <TextField
            value={email}
            onChange={e => setEmail(e.target.value)}
            inputProps={{ "data-testid": "email-input" }}
            margin="dense"
            label="Email"
            type="email"
            fullWidth
          />

          <TextField
            value={password}
            onChange={e => setPassword(e.target.value)}
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
            onClick={() => setOpen(false)}
            color="primary"
          >
            Cancel
          </Button>

          <Button
            data-testid="register-button"
            onClick={() => registerUser(username, email, password)}
            color="primary"
            disabled={!username || !email || !password}
          >
            Register
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
