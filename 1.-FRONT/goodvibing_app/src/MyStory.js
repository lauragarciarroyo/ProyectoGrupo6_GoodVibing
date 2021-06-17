//Ver mi historia, desde aquí se puede editar y borrar
import { NavLink } from "react-router-dom";
//import { Helmet } from "react-helmet";
import UseFetchToken from "./useFetchToken";
import { useSelector } from "react-redux";

function MyStory() {
  const { user } = useSelector((state) => state.user);

  const story = UseFetchToken(`http://localhost:4000/api/stories/${user.id}`);

  if (!story) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="Mi historia">
      <h1>{story.title}</h1>
      <p>{story.body}</p>
      <br />
      <NavLink to="/editstory">Modificar historia</NavLink>
      <NavLink to="/deletestory">Eliminar historia</NavLink>
    </div>
  );
}

export default MyStory;

//No muestra la historia
