import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useHistory } from "react-router-dom";

function CreateComment() {
  const token = useSelector((s) => s.user?.token);
  const history = useHistory();

  const { id } = useParams();
  const dispatch = useDispatch();

  const [text, setText] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch(
      `http://localhost:4000/api/stories/${id}/comments`,
      {
        method: "POST",
        body: JSON.stringify({ text }),
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      }
    );
    const data = await res.json();

    if (res.ok) {
      history.go(0);
    } else {
      dispatch({ type: "SET_ERROR", message: data.message });
    }
  };

  return (
    <div>
      <form className="comment" onSubmit={handleSubmit}>
        <label>
          Comentario
          <input value={text} onChange={(e) => setText(e.target.value)} />
        </label>

        <button>¡Comenta!</button>
      </form>
    </div>
  );
}

export default CreateComment;

//Crear comentario, link desde una historia
