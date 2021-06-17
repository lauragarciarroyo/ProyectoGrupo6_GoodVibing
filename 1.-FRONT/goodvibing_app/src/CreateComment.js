import { useState } from "react";
import { useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";

function CreateComment() {
  const token = useSelector((s) => s.user?.token);
  const [text, setText] = useState("");
  const { story_id } = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch(
      `http://localhost:4000/api/stories/${story_id}/comments`,
      {
        method: "POST",
        body: JSON.stringify({ text }),
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      }
    );
    if (res.ok) {
      await res.json();
    }
  };

  return (
    <div>
      <form className="comment" onSubmit={handleSubmit}>
        <label>
          Comentario
          <input value={text} onChange={(e) => setText(e.target.value)} />
        </label>
        <NavLink to="/mycomments">Escribe tu comentario</NavLink>
      </form>
    </div>
  );
}

export default CreateComment;

//Crear comentario, link desde viewstory
