//Ver mi historia, desde aquí se puede editar y borrar
import { NavLink, useParams } from "react-router-dom";
import UseFetchToken from "./useFetchToken";

function MyStory() {
  const { id } = useParams();
  const story = UseFetchToken(`http://localhost:4000/api/stories/${id}`);

  return (
    <div className="Mi historia">
      <h1>{story.title}</h1>
      <p>{story.body}</p>
      <NavLink to="/editstory">Modificar historia</NavLink>
      <NavLink to="/deletestory">Eliminar historia</NavLink>
    </div>
  );
}

export default MyStory;
