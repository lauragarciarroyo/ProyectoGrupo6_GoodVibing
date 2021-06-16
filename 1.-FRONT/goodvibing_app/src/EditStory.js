import React, { useState } from "react";
import { useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";

function EditStory() {
  const [body, setBody] = useState("");
  const [title, settitle] = useState("");
  const token = useSelector((s) => s.user?.token);
  const { id } = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch(
      `http://localhost:4000/api/stories/${id}`,

      {
        method: "PUT",
        body: JSON.stringify({ title, body }),
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      }
    );
    if (res.ok) {
      const data = await res.json();
      console.log("Data:", data);
    }
  };

  return (
    <form className="mystory" onSubmit={handleSubmit}>
      <label>
        Título:
        <input value={title} onChange={(e) => settitle(e.target.value)} />
      </label>
      <label>
        Historia:
        <input value={body} onChange={(e) => setBody(e.target.value)} />
      </label>
      <NavLink to="/mystory">Guardar historia</NavLink>
    </form>
  );
}

export default EditStory;
