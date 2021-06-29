import UseFetch from "./UseFetch";
import { useSelector } from "react-redux";
import { Box, Button, makeStyles } from "@material-ui/core";
import { Grid } from "@material-ui/core";

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
      width: "100%",
    },
  }));
  const classes = useStyles();
  if (!results) {
    return <div>Loading...</div>;
  }
  return (
    <div className="viewstories">
      <div className={classes.paper}>
        <h1 align="center">Historias</h1>
        {results.data.map((e) => (
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
        {!results.data.length && <i>No se han encontrado historias</i>}

        <div className="bottom">
          <Grid container justify="center">
            <Button href="/createstory" color="secondary">
              Crea tu historia
            </Button>{" "}
          </Grid>
        </div>
      </div>
    </div>
  );
}

export default ViewStories;

//Cada previsualización de una historia te lleva a la historia completa
//Ver las historias de un usuario (la previsualización)
