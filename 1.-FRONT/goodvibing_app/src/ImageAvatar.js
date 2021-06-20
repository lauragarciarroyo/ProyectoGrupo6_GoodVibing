import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";

function ImageAvatar() {
  const useStyles = makeStyles((theme) => ({
    root: {
      display: "flex",
      "& > *": {
        margin: theme.spacing(1),
      },
    },
  }));

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Avatar alt="Avatar" src="/static/images/avatar/1.jpg" />
    </div>
  );
}

export default ImageAvatar;
