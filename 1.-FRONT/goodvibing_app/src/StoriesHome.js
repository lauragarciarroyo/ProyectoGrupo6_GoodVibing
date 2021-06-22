import { Button, Container, makeStyles } from "@material-ui/core";
import useFetch from "./UseFetch";

function StoriesHome() {
  const results = useFetch(`http://localhost:4000/api/stories`);

  const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(8),
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      width: "100%",
    },
  }));
  const classes = useStyles();

  if (!results) return <p>Cargando...</p>;

  return (
    <div className={classes.paper}>
      <div className="Historias">
        {results.data.map((e) => (
          <div key={e.id}>
            <Button
              href={`/viewstory/${e.id}`}
              color="primary"
              style={{ margin: 10 }}
            >
              {e.title}
            </Button>
            <Container style={{ margin: 10 }}>
              <p>{e.body}</p>
            </Container>
          </div>
        ))}
        {!results.data.length && <i>No se han encontrado historias</i>}
      </div>
    </div>
  );
}

export default StoriesHome;

//Solo hay que mostrar 3 historias aleatorias
