import UseFetchToken from "./useFetchToken";
import { useSelector } from "react-redux";
import { Box, Button, makeStyles } from "@material-ui/core";

function MyStories() {
  const { user } = useSelector((state) => state.user);

  const [results] = UseFetchToken(
    `http://localhost:4000/api/users/${user.id}/stories`
  );

  console.log(results);

  const useStyles = makeStyles((theme) => ({
    paper: {
      display: "flex",
      flexGrow: 1,
      flexDirection: "column",
      alignItems: "center",
      width: "100%",
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
            <Box
              justifyContent="center"
              alignItems="center"
              border={1}
              boxShadow={3}
              p={2}
              m={2}
              display="block"
              css={{ maxWidth: 600 }}
            >
              <Button
                href={`/mystory/${e.id}`}
                color="primary"
                style={{ margin: 10 }}
                fullWidth
              >
                {e.title}
              </Button>

              <div container justify="center">
                <p>{e.body}</p>
              </div>
            </Box>
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
