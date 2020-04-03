import React from "react";
import { ListItem, ListItemText } from "@material-ui/core";
import { PlayArrow } from "@material-ui/icons/";

export interface JobItemProps {
  id: string;
  name: string;
}

export const JobItem = ({ id, name }: JobItemProps) => (
  <ListItem key={id} dense button>
    <PlayArrow></PlayArrow>
    <ListItemText id={id} primary={name} />
  </ListItem>
);
