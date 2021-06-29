import { Box, Button, makeStyles } from "@material-ui/core";
import UseFetch from "./UseFetch";

function RandomStories({ q }) {
  const stories = UseFetch(`http://localhost:4000/api/random-stories`);

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

  if (!stories) return <p>Cargando...</p>;

  return (
    <div className="randomstories">
      <h1>Explora historias aleatorias</h1>
      <div className={classes.paper}>
        <div>
          {stories.data.map((s) => (
            <div key={s.id}>
              <Box
                borderRadius={16}
                justifyContent="center"
                alignItems="center"
                border={1}
                boxShadow={3}
                p={2}
                m={2}
                display="block"
                css={{ maxWidth: 600 }}
              >
                <Button color="primary" href={`/story/${s.id}`}>
                  {s.title}
                </Button>
              </Box>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default RandomStories;

//Resultado búsqueda de historias en barra de búsqueda de home
//Revisar el link al hacer map
