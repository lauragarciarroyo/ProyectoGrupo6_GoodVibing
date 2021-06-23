import UseFetchToken from "./useFetchToken";
import { useSelector } from "react-redux";

import { Button, Container, CssBaseline, makeStyles } from "@material-ui/core";
import React from "react";
import { useParams } from "react-router";

function StoryUserEdit() {
  const { user } = useSelector((state) => state.user);

  const { id } = useParams();

  const [story] = UseFetchToken(`http://localhost:4000/api/stories/${id}`);

  const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(20),
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      width: "100%",
    },
  }));

  const classes = useStyles();

  if (!story) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="Mi historia">
      <CssBaseline />
      <div className={classes.paper}>
        <h1>{story.title}</h1>
        <p>{new Date(story.date).toLocaleDateString()}</p>
        <p />
        <Button href="/userinfo" color="primary">
          {user.name}{" "}
        </Button>{" "}
        <p />
        <Container maxWidth="xs" style={{ margin: 40 }} align="center">
          {story.body}
        </Container>
      </div>
    </div>
  );
}

export default StoryUserEdit;
