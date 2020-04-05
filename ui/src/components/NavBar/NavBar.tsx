import React from "react";
import MenuIcon from "@material-ui/icons/Menu";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { AppBar, Toolbar, IconButton, Typography } from "@material-ui/core";

import { UserActions } from "../UserActions";
import { PipelinerState } from "../../store/types";
import { userSelector } from "../../store/user/selectors";

export interface NavBarProps {
  appName: string;
  isSignedIn: boolean;
}

interface StateProps {
  isSignedIn: boolean;
}

const useStyles = makeStyles((theme) => ({
  root: { flexGrow: 1 },
  menuButton: { marginRight: theme.spacing(2) },
  title: { flexGrow: 1 },
}));

export const NavBar = ({ appName, isSignedIn }: NavBarProps) => {
  const classes = useStyles();

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton
          edge="start"
          className={classes.menuButton}
          color="inherit"
          aria-label="menu"
        >
          <MenuIcon />
        </IconButton>

        <Typography variant="h6" className={classes.title}>
          {appName}
        </Typography>

        <UserActions data-testid="user-actions" isSignedIn={isSignedIn} />
      </Toolbar>
    </AppBar>
  );
};

const mapStateToProps = (state: PipelinerState): StateProps => {
  const userState = userSelector(state);

  return {
    isSignedIn: userState.isSignedIn,
  };
};

export const NavBarContainer = connect(mapStateToProps)(NavBar);
