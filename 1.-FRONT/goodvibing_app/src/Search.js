import { Box, Button, makeStyles } from "@material-ui/core";
import { useLocation } from "react-router-dom";
import RandomStories from "./RandomStories";
import useFetch from "./UseFetch";
import StoryTitle from "./StoryTitle";

function Search({ q }) {
  const stories = useFetch(`http://localhost:4000/api/stories?q=${q}`);

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
    <div className="search">
      <div className={classes.paper}>
        {stories.data.length > 0 ? (
          <div className="history">
            <h2>Historias</h2>
            <ul>
              {stories.data.map((s) => (
                <div key={s.id}>
                  <Box
                    borderRadius={16}
                    justifyContent="center"
                    alignItems="center"
                    boxShadow={20}
                    p={2}
                    m={2}
                    display="block"
                    css={{ maxWidth: 600 }}
                  >
                    <StoryTitle href={`/story/${s.id}`}>{s.title}</StoryTitle>
                  </Box>
                </div>
              ))}
            </ul>
          </div>
        ) : (
          <p>No hay resultados...</p>
        )}
      </div>
    </div>
  );
}

function SearchWrapper() {
  const q = new URLSearchParams(useLocation().search).get("q");

  if (!q) return <RandomStories />;

  return <Search q={q} />;
}

export default SearchWrapper;

//Al buscar vamos a la página de explora, donde aparece un listado con previsualizaciones de las historias, buscando por palabra clave
