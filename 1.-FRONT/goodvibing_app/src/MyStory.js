//Ver mi historia, desde aquí se puede editar y borrar
import { Link, NavLink, useParams } from "react-router-dom";
//import { Helmet } from "react-helmet";
import UseFetchToken from "./useFetchToken";
import { useSelector } from "react-redux";

function MyStory() {
  const { user } = useSelector((state) => state.user);

  const { id } = useParams();

  const story = UseFetchToken(`http://localhost:4000/api/stories/${id}`);

  if (!story) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="Mi historia">
      <h1>{story.title}</h1>
      <Link to="/profile">{user.name}</Link>
      <p>{story.body}</p>
      <br />
      <NavLink to="/editstory">Modificar historia</NavLink>
      <NavLink to="/deletestory">Eliminar historia</NavLink>
    </div>
  );
}

export default MyStory;

//No muestra la historia
//Link hay que cambiarlo, debe llevar a datos de usuario pero no a profile porque aparece modificar datos
