import UseFetch from "./UseFetch";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function ViewStories() {
  const { user } = useSelector((state) => state.user);
  const results = UseFetch(
    `http://localhost:4000/api/users/${user.id}/stories`
  );
  if (!results) {
    return <div>Loading...</div>;
  }
  return (
    <div className="viewstories">
      <h1>Historias</h1>
      {results.data.map((e) => (
        <li key={e.id}>
          <Link to={`/story/${user.id}`}>{e.title}</Link>

          <p>{e.body}</p>
        </li>
      ))}
      {!results.data.length && <i>No se han encontrado historias</i>}

      <div className="bottom">
        <Link to="/blog">Crea tu historia</Link>
      </div>
    </div>
  );
}

export default ViewStories;

//Cada previsualización de una historia te lleva a la historia completa
//Ver las historias de un usuario (la previsualización)
