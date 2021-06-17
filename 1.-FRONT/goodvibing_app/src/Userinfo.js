import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import useFetchToken from "./useFetchToken";

function Userinfo() {
  const { user } = useSelector((state) => state.user);
  const userinfo = useFetchToken(`http://localhost:4000/api/users/${user.id}`);

  return (
    <div className="userinfo">
      <h1>{user.name}</h1>
      <br />
      <p>{user.bio}</p>
      <p>{user.residence}</p>
      <p>{user.birthdate}</p>
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
