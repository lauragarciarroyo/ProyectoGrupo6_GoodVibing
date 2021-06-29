import UseFetchToken from "./useFetchToken";
import { useSelector } from "react-redux";
import { Button, Container, makeStyles } from "@material-ui/core";
import { Grid } from "@material-ui/core";

function MyStories() {
  const { user } = useSelector((state) => state.user);

  const [results] = UseFetchToken(
    `http://localhost:4000/api/users/${user.id}/stories`
  );

  console.log(results);

  const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(8),
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      width: "50%",
    },
  }));
  const classes = useStyles();

  if (!results) return <p>Cargando...</p>;

  return (
    <div className="Mis historias">
      <div className={classes.paper}>
        <h1 align="center">Tus historias</h1>

        {results.map((e) => (
          <div key={e.id}>
            <Grid container justify="center">
              <Button
                href={`/mystory/${e.id}`}
                color="primary"
                style={{ margin: 10 }}
              >
                {e.title}
              </Button>
            </Grid>
            <Grid container justify="cemter">
              <Container style={{ margin: 10 }}>
                <p>{e.body}</p>
              </Container>
            </Grid>
          </div>
        ))}

        {!results.length && <i>No se han encontrado historias</i>}

        <div className="bottom">
          <Button href="/createstory" color="secondary">
            Crea tu historia
          </Button>{" "}
        </div>
      </div>
    </div>
  );
}

export default MyStories;

//Ver mis historias, en lista, la previsualización
