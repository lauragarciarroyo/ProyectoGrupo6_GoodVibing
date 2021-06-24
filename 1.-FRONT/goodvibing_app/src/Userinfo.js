import { useDispatch } from "react-redux";
import { Link, Redirect, useParams } from "react-router-dom";
import useFetchToken from "./useFetchToken";

function Userinfo() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const [user, error] = useFetchToken(`http://localhost:4000/api/users/${id}`);
  if (error) {
    dispatch({ type: "SET_ERROR", message: error });
    return <Redirect to="/" />;
  }
  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="userinfo">
      <h2>{user.name}</h2>
      <p />
      <p>{user.bio}</p>
      <p>{user.residence}</p>
      <p>{new Date(user.birthdate).toLocaleDateString()}</p>
      <p>{user.email}</p>
      <p />
      <div>
        <Link to={`/viewstories/${user.id}`}>Ver historias del usuario</Link>
      </div>
    </div>
  );
}

export default Userinfo;

//Muestra la info de un usuario, petición tipo GET a /api/users/:user_id, con token
//Se muestran en profile, pero además hay que llegar a userinfo desde viewstory(/story/:id)
