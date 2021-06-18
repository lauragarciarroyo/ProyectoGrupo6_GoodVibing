import { useSelector, useDispatch } from "react-redux";
import { useParams, useHistory } from "react-router-dom";

function DeleteStory() {
  const token = useSelector((s) => s.user?.token);
  const { id } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (window.confirm("¿Estás seguro de eliminar tu historia?")) {
      const res = await fetch(`http://localhost:4000/api/stories/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      });
      const data = await res.json();

      if (res.ok) {
        history.push("/mystories");
      } else {
        dispatch({ type: "SET_ERROR", message: data.message });
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Borrar tu historia</h1>
      <button>Eliminar historia</button>
    </form>
  );
}

export default DeleteStory;
