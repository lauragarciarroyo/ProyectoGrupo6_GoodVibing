import { Button } from "@material-ui/core";
import useFetch from "./UseFetch";

function StoriesHome() {
  const results = useFetch(`http://localhost:4000/api/stories`);

  if (!results) return <p>Cargando...</p>;

  return (
    <div>
      {results.data.map((e) => results.slice(1, 3))}
      <Button href={`/viewstories`} color="primary">
        {results.title}
      </Button>

      <p>{results.body}</p>
    </div>
  );
}

export default StoriesHome;
