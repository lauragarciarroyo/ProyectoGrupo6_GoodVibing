import { Container, TextField } from "@material-ui/core";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import UploadImage from "./UploadImage";

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
            <TextField
              id="standard-basic"
              label="Título"
              value={title}
              onChange={(e) => settitle(e.target.value)}
            />
          </label>
        </p>
        <p>
          <label>
            <TextField
              id="standard-basic"
              label="Historia"
              multiline
              value={body}
              onChange={(e) => setBody(e.target.value)}
            />
          </label>
        </p>
        <p>
          <label>
            <TextField
              id="standard-basic"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              type="date"
            />
          </label>
        </p>

        <UploadImage />
        <p />
        <Container maxWidth="xs">
          <button>Editar tu historia</button>
        </Container>
      </form>
    </>
  );
}

export default EditStory;

//La fecha se debe poner automática, da error
//Hace falta poner el valor inicial en useState
