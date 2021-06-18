import UseFetch from "./UseFetch";
import { Link, useParams } from "react-router-dom";

function ViewStories() {
  const { id } = useParams();
  const results = UseFetch(`http://localhost:4000/api/users/${id}/stories`);
  return (
    <div className="viewstories">
      <h1>Historias</h1>
      {results.data.map((e) => (
        <li key={e.id}>
          <Link to={`/viewstory/${e.id}`}>{e.title}</Link>

          <p>{e.body}</p>
        </li>
      ))}
      {!results.data.length && <i>No se han encontrado historias</i>}

      <div className="bottom">
        <Link to="/createstory">Crea tu historia</Link>
      </div>
    </div>
  );
}

export default ViewStories;

//Cada previsualización de una historia te lleva a la historia completa
//Ver las historias de un usuario (la previsualización)
