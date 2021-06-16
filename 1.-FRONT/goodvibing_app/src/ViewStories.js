import UseFetch from "./UseFetch";
import { Link } from "react-router-dom";

function ViewStories({ id }) {
  const results = UseFetch(`http://localhost:4000/api/users/${id}/stories`);
  return (
    <div className="viewstories">
      <h1>Historias</h1>
      {results?.results?.map((e) => (
        <li key={e.id}>
          <Link to={`/viewstories/${e.id}`}>{e.title}</Link>
        </li>
      ))}
      {!results && <i>Loading...</i>}
      {results && !results.results && <i>No se han encontrado historias</i>}
    </div>
  );
}

export default ViewStories;

//Cada previsualización de una historia te lleva a la historia completa
//Ver las historias de un usuario (la previsualización)
