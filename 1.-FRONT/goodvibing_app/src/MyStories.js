import { NavLink } from "react-router-dom";
import UseFetchToken from "./useFetchToken";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function MyStories() {
  const { user } = useSelector((state) => state.user);

  const results = UseFetchToken(
    `http://localhost:4000/api/users/${user.id}/stories`
  );

  if (!results) return <p>Cargando...</p>;

  return (
    <div className="Mis historias">
      <h1>Tus historias</h1>
      {results.data.map((e) => (
        <li key={e.id}>
          <Link to={`/mystory/${e.id}`}>{e.title}</Link>

          <p>{e.body}</p>
        </li>
      ))}

      {!results.data.length && <i>No se han encontrado historias</i>}

      <div className="bottom">
        <NavLink to="/createstory">Crea tu historia</NavLink>
      </div>
    </div>
  );
}

export default MyStories;

//Ver mis historias, en lista, la previsualización
