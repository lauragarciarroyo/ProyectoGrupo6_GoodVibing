import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, Redirect } from "react-router-dom";

function CreateStory() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const token = useSelector((s) => s.user?.token);
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
    if (res.ok) {
      const data = await res.json();
      dispatch({ type: "CREATE", story: data });
    }
  };
  if (!token) {
    return <Redirect to="/loginregister" />;
  }

  return (
    <div className="historias">
      <h1>{title}</h1>
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
          <input
            placeholder="Escribe tu historia.."
            value={body}
            onChange={(e) => setBody(e.target.value)}
          />
        </label>
        <br />
        <NavLink to="/mystory">Guardar historia</NavLink>
      </form>
    </div>
  );
}
export default CreateStory;

// Petición de crear historia
//FOTOS
//MAPA (otro componente)
