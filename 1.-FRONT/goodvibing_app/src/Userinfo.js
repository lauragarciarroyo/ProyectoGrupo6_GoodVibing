import { Link } from "react-router-dom";

function Userinfo({ user }) {
  return (
    <div className="userinfo">
      <h1>{user.name}</h1>
      <br />
      <p>{user.bio}</p>
      <p>{user.residence}</p>
      <p>{new Date(user.birthdate).toLocaleDateString()}</p>
      <p>{user.email}</p>
      <br />
      <div>
        <Link to="/viewstories/:id">Ver Historias del usuario</Link>
      </div>
    </div>
  );
}

export default Userinfo;

//Muestra la info de un usuario, petición tipo GET a /api/users/:user_id, con token
//Se muestran en profile, pero además hay que llegar a userinfo desde viewstory(/story/:id)
