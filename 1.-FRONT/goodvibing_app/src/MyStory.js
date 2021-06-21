//Ver mi historia, desde aquí se puede editar y borrar
import { Link, useParams } from "react-router-dom";
import UseFetchToken from "./useFetchToken";
import { useSelector } from "react-redux";
import CreateVote from "./CreateVote";
import CreateComment from "./CreateComment";
import { Button, Container, CssBaseline, Grid } from "@material-ui/core";
import React from "react";

function MyStory() {
  const { user } = useSelector((state) => state.user);

  const { id } = useParams();

  const story = UseFetchToken(`http://localhost:4000/api/stories/${id}`);

  if (!story) {
    return <div>Cargando...</div>;
  }

  return (
    <Container component="main" maxWidth="sm" align="center">
      <CssBaseline />

      <div className="Mi historia">
        <Grid container spacing={4}>
          <h1>{story.data.title}</h1>
          <p />
          <Button href="/userinfo" color="primary">
            {user.name}{" "}
          </Button>{" "}
          <p />
          <Container maxWidth="sm" align="left">
            {story.data.body}
          </Container>
          <p />
          <CreateComment />
          <p />
          <CreateVote />
        </Grid>
      </div>
      <div>
        <Link to={`/editstory/${id}`}>Editar historia</Link>
        <p />

        <Link to={`/deletestory/${id}`}>Eliminar historia</Link>
      </div>
    </Container>
  );
}

export default MyStory;

//Modificar los links del final (modificar historia y eliminarla)
