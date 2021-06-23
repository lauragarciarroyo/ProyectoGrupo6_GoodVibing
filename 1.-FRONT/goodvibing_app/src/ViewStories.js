import UseFetch from "./UseFetch";
import { useSelector } from "react-redux";
import { Button, Container, makeStyles } from "@material-ui/core";

function ViewStories() {
  const { user } = useSelector((state) => state.user);
  const results = UseFetch(
    `http://localhost:4000/api/users/${user.id}/stories`
  );

  const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(8),
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      width: "25%",
    },
  }));
  const classes = useStyles();
  if (!results) {
    return <div>Loading...</div>;
  }
  return (
    <div className="viewstories">
      <div className={classes.paper}></div>
      <h1>Historias</h1>
      {results.data.map((e) => (
        <div key={e.id}>
          <Button
            href={`/mystory/${e.id}`}
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

      <div className="bottom">
        <Button href="/createstory" color="secondary">
          Crea tu historia
        </Button>{" "}
      </div>
    </div>
  );
}

export default ViewStories;

//Cada previsualización de una historia te lleva a la historia completa
//Ver las historias de un usuario (la previsualización)
