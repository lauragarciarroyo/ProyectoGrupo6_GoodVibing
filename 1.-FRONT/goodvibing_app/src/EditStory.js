import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useHistory } from "react-router-dom";

function EditStory() {
  const [body, setBody] = useState();
  const [title, settitle] = useState();
  const [date, setDate] = useState();

  const dispatch = useDispatch();
  const history = useHistory();
  const token = useSelector((s) => s.user?.token);
  const { id } = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch(
      `http://localhost:4000/api/stories/${id}`,

      {
        method: "PUT",
        body: JSON.stringify({ title, body, date }),
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      }
    );
    const data = await res.json();

    if (res.ok) {
      history.push("/mystory/:id");
    } else {
      dispatch({ type: "SET_ERROR", message: data.message });
    }
  };

  return (
    <>
      <form className="mystory" onSubmit={handleSubmit}>
        <p>
          <label>
            Título:
            <input value={title} onChange={(e) => settitle(e.target.value)} />
          </label>
        </p>
        <p>
          <label>
            Historia:
            <input value={body} onChange={(e) => setBody(e.target.value)} />
          </label>
        </p>
        <p>
          <label>
            Fecha:
            <input
              value={date}
              onChange={(e) => setDate(e.target.value)}
              type="date"
            />
          </label>
        </p>
      </form>
      <form onSubmit={handleSubmit}>
        <h1>Modifica tu historia</h1>
        <button>Editar tu historia</button>
      </form>
    </>
  );
}

export default EditStory;

//La fecha se debe poner automática, da error
//HAce falta poner el valor inicial en useState
