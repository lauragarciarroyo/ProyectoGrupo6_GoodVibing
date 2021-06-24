//Ver mi historia, desde aquí se puede editar y borrar
import { Link, useParams } from "react-router-dom";
import UseFetchToken from "./useFetchToken";
import CreateVote from "./CreateVote";
import CreateComment from "./CreateComment";
import { Container, CssBaseline, makeStyles } from "@material-ui/core";
import React from "react";

function MyStory() {
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
        <Link to={`/userinfo/${story.user_id}`}>{story.user_name}</Link>
        <p />
        <Container maxWidth="xs" style={{ margin: 40 }} align="center">
          {story.body}
        </Container>
        <p />
        <CreateComment />
        <p />
        <CreateVote />
        <p />
        <div>
          <Link to={`/editstory/${id}`}>Editar historia</Link>
          <p />

          <Link to={`/deletestory/${id}`}>Eliminar historia</Link>
        </div>
      </div>
    </div>
  );
}

export default MyStory;

//Modificar los links del final (modificar historia y eliminarla)
