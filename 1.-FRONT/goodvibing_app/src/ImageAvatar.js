import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import { useSelector } from "react-redux";

function ImageAvatar() {
  const { user } = useSelector((state) => state.user);
  const useStyles = makeStyles((theme) => ({
    large: {
      width: theme.spacing(7),
      height: theme.spacing(7),
    },
  }));

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Avatar
        alt={user.name}
        src="/static/images/avatar/1.jpg"
        className={classes.large}
      />
    </div>
  );
}

export default ImageAvatar;
