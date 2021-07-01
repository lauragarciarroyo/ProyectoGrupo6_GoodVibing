import UseFetchToken from "./useFetchToken";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function MyStories() {
  const { user } = useSelector((state) => state.user);

  const [results] = UseFetchToken(
    `http://localhost:4000/api/users/${user.id}/stories`
  );

  console.log(results);

  if (!results) return <p>Cargando...</p>;

  return (
    <div className="mystories">
      <h1>Tus historias</h1>

      {results.map((e) => (
        <div className="historias" key={e.id}>
          <Link to={`/mystory/${e.id}`}>{e.title}</Link>

          <p>{e.body}</p>
        </div>
      ))}

      {!results.length && <i>No se han encontrado historias</i>}

      <div className="bottom">
        <Link to="/createstory">Crea tu historia</Link>
      </div>
    </div>
  );
}

export default MyStories;

//Ver mis historias, en lista, la previsualización
