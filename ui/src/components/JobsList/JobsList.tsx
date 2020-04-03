import React from "react";
import { List, makeStyles } from "@material-ui/core";

export interface Job {
  id: string;
  name: string;
}

export interface JobsListProps {
  jobs: Job[];
}

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  }
}));

export const JobsList = ({ jobs }: JobsListProps) => {
  const classes = useStyles();

  return (
    <List className={classes.root}>
      {jobs.map(j => (
        <div key={j.id}>{j.name}</div>
      ))}
    </List>
  );
};
