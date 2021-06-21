//Ver mi historia, desde aquí se puede editar y borrar
import { useParams } from "react-router-dom";
//import { Helmet } from "react-helmet";
import UseFetchToken from "./useFetchToken";
import { useSelector } from "react-redux";
import CreateVote from "./CreateVote";
import CreateComment from "./CreateComment";
import DeleteStory from "./DeleteStory";
import EditStory from "./EditStory";
import { Button, Container, CssBaseline, Grid } from "@material-ui/core";

function MyStory() {
  const { user } = useSelector((state) => state.user);

  const { id } = useParams();

  const story = UseFetchToken(`http://localhost:4000/api/stories/${id}`);

  if (!story) {
    return <div>Cargando...</div>;
  }

  return (
    <Container component="main" maxWidth="sm">
      <CssBaseline />
      <div className="Mi historia">
        <Grid container spacing={3}>
          <h1>{story.data.title}</h1>
          <Button href="/userinfo" color="primary">
            {user.name}{" "}
          </Button>{" "}
          <p />
          <Container maxWidth="xl">{story.data.body}</Container>
          <p />
          <Container maxWidth="sm">
            <EditStory />
          </Container>
          <p />
          <CreateComment />
          <p />
          <CreateVote />
        </Grid>
        <Container maxWidth="sm">
          <DeleteStory />
          <p />
        </Container>
      </div>
    </Container>
  );
}

export default MyStory;

//Modificar los links del final (modificar historia y eliminarla)
