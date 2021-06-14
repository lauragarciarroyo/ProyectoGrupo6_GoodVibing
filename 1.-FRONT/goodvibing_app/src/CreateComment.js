import { useState } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

function CreateComment({ story_id }) {
  const token = useSelector((s) => s.user?.token);
  const [comment, setComment] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch(
      `https://localhost:4000/api/stories/${story_id}/comments`,
      {
        method: "POST",
        body: JSON.stringify({ comment }),
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      }
    );
    if (res.ok) {
      const data = await res.json();
      console.log(data);
    }
  };

  return (
    <form className="comment" onSubmit={handleSubmit}>
      <label>
        Comentario
        <input value={comment} onChange={(e) => setComment(e.target.value)} />
      </label>
      <NavLink to="/mycomments">Escribe tu comentario</NavLink>
    </form>
  );
}

export default CreateComment;

//Crear comentario, link desde viewstory
