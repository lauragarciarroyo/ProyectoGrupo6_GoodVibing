import React from "react";
import { Avatar, makeStyles } from "@material-ui/core";

export default function UserAvatar({ src }) {
  const useStyles = makeStyles((theme) => ({
    large: {
      width: theme.spacing(7),
      height: theme.spacing(7),
    },
  }));
  const classes = useStyles();
  return (
    <Avatar
      src={`http://localhost:4000/images/${src}`}
      className={classes.large}
    />
  );
}
