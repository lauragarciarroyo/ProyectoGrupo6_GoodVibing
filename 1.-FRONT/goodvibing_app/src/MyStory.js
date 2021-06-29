//Ver mi historia, desde aquí se puede editar y borrar
import { Link, useParams } from "react-router-dom";
import UseFetchToken from "./useFetchToken";
import CreateVote from "./CreateVote";
import CreateComment from "./CreateComment";
import { Box, Button, makeStyles } from "@material-ui/core";
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
      <div className={classes.paper}>
        <h1>{story.title}</h1>
        <p>{new Date(story.date).toLocaleDateString()}</p>
        <Box
          borderRadius={50}
          justifyContent="center"
          alignItems="center"
          boxShadow={20}
          p={2}
          m={2}
          display="block"
          css={{ maxWidth: 900 }}
        >
          <Button fullWidth color="primary" href={`/userinfo/${story.user_id}`}>
            {story.user_name}
          </Button>
          <p />
          <div maxWidth="xs" style={{ margin: 40 }} align="center">
            {story.body}
          </div>
        </Box>

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
