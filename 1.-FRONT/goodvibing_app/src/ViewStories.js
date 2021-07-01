import UseFetch from "./UseFetch";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

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
        <div className="historias" key={e.id}>
          <Link to={`/mystory/${e.id}`}>{e.title}</Link>

          <p>{e.body}</p>
        </div>
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
