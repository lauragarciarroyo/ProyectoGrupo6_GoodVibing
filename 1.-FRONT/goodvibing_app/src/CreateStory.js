import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

function CreateStory() {
  const history = useHistory();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const token = useSelector((s) => s.user.token);
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:4000/api/stories", {
      method: "POST",
      body: JSON.stringify({
        title,
        body,
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });
    const data = await res.json();
    if (res.ok) {
      //redirigimos a las historias del usuario
      history.push("/mystories");
    } else {
      dispatch({ type: "SET_ERROR", message: data.message });
    }
  };

  return (
    <div className="historias">
      <div className="preview">
        <h1>{title}</h1>
        <p>{body}</p>
      </div>
      <form className="edituser" onSubmit={handleSubmit}>
        <label>
          Título
          <input
            placeholder="Escribe el título..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>
        <br />
        <label>
          Historia
          <textarea
            placeholder="Escribe tu historia.."
            value={body}
            onChange={(e) => setBody(e.target.value)}
          ></textarea>
        </label>
        <br />
        <button>Guardar historia</button>
      </form>
    </div>
  );
}
export default CreateStory;

// Petición de crear historia
//FOTOS
//MAPA (otro componente)
