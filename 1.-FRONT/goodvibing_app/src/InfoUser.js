import { Link, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import useFetchToken from "./useFetchToken";

function InfoUser() {
  const { user } = useSelector((state) => state.user);
  const info = useFetchToken(`http://localhost:4000/api/users/${user.id}`);

  return (
    <div className="infouser">
      <h1>Información del usuario</h1>
      {info?.info?.map((e) => (
        <li key={e.id}>
          <Link to={`/infouser/${e.id}`}>{e.info}</Link>
        </li>
      ))}
      {!info && <i>Loading...</i>}
      {info && !info.info && <i>No se han encontrado datos del usuario</i>}

      <NavLink to="/viewstories/:id">Ver historias</NavLink>
    </div>
  );
}

export default InfoUser;

//Muestra la info de un usuario, petición tipo GET a /api/users/:user_id, con token
