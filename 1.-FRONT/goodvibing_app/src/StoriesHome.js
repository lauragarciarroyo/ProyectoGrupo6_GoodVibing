import { Button } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import useFetch from "./UseFetch";

function StoriesHome() {
  const results = useFetch(`http://localhost:4000/api/storieshome`);
  const defaultProps = {
    bgcolor: "background.paper",
    m: 1,
    style: { width: "30rem", height: "15rem" },
    borderColor: "text.primary",
  };

  if (!results) return <p>Cargando...</p>;

  return (
    <div className="Historias">
      {results.data.map((e) => (
        <Box
          justifyContent="center"
          alignItems="center"
          mx="auto"
          border={1}
          boxShadow={3}
          bgcolor="background.paper"
          display="block"
          css={{ maxWidth: 800 }}
          {...defaultProps}
          p={2}
          key={e.id}
        >
          <Button href={`/story/${e.id}`} fullWidth color="primary">
            {e.title}
          </Button>

          <p>{e.body}</p>
        </Box>
      ))}
      {!results.data.length && <i>No se han encontrado historias</i>}
    </div>
  );
}

export default StoriesHome;

//Solo hay que mostrar 3 historias aleatorias
