import React, { useState } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

function EditStory() {
  const [story, setStory] = useState("");
  const [title, settitle] = useState("");
  const token = useSelector((s) => s.user?.token);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch(
      "https://localhost:4000/api/stories/:id_story",

      {
        method: "PUT",
        body: JSON.stringify({ title, story }),
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      }
    );
    if (res.ok) {
      const data = await res.json();
      console.log({ user: data });
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
        <input value={story} onChange={(e) => setStory(e.target.value)} />
      </label>
      <NavLink to="/mystory">Guardar historia</NavLink>
    </form>
  );
}

export default EditStory;
