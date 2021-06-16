import { Link } from "react-router-dom";

function InfoUser() {
  return (
    <div className="infouser">
      <h1>Información del usuario</h1>
      <Link to="/viewstories">Ver historias</Link>
    </div>
  );
}

export default InfoUser;

//Muestra la info de un usuario, petición tipo GET a /api/users/:user_id, con token
