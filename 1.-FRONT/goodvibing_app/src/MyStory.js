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
      <h1>{story.data.title}</h1>
      <Link to="/userinfo">{user.name}</Link>
      <p>{story.data.body}</p>
      <p />
      <p />
      <NavLink to="/editstory/:id">Modificar historia</NavLink>
      <p />
      <NavLink to="/deletestory/:id">Eliminar historia</NavLink>
      <p />
      <NavLink to="/createcomment">Comentar historia</NavLink>
      <p />
    </div>
  );
}

export default MyStory;

//Modificar los links del final (modificar historia y eliminarla)
