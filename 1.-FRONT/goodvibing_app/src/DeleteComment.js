import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router";

function DeleteComment() {
  const token = useSelector((s) => s.user?.token);
  const { id } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (window.confirm("¿Estás seguro de eliminar tu comentario?")) {
      const res = await fetch(`https://localhost:4000/api/comments/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      });

      const data = await res.json();
      if (res.ok) {
        history.push("/getcomments");
      } else {
        dispatch({ type: "SET_ERROR", message: data.message });
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <button>Eliminar comentario</button>
    </form>
  );
}

export default DeleteComment;

//No funciona
