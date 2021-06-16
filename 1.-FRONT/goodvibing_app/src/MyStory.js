//Ver mi historia, desde aquí se puede editar y borrar
import { NavLink } from "react-router-dom";
import UseFetchToken from "./useFetchToken";

function MyStory({ id }) {
  const story = UseFetchToken(`https://localhost:4000/api/stories/${id}`);

  return (
    <div className="Mi historia">
      <h1>Mi historia</h1>
      <NavLink to="/editstory">Modificar historia</NavLink>
      <NavLink to="/deletestory">Eliminar historia</NavLink>
      {story.id}
    </div>
  );
}

export default MyStory;
