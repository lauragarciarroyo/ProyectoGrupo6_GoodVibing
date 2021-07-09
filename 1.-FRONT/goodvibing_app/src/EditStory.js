import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import StoryUserEdit from "./StoryUserEdit";
import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";

const useStyle = makeStyles({
  submit: {
    background: "#84047e",
    border: 0,
    borderRadius: 3,
    color: "white",
    height: 48,
    padding: "0 30px",
    marginTop: "15px",
    marginLeft: "700px",
    width: "10%",
    type: "submit",
  },
});

function EditStory({ story }) {
  const [body, setBody] = useState();
  const [title, settitle] = useState();
  const [date, setDate] = useState();
  const classes = useStyle();
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
      history.push(`/mystory/${id}`);
    } else {
      dispatch({ type: "SET_ERROR", message: data.message });
    }
  };

  return (
    <>
      <div className="historia">
        <StoryUserEdit />
      </div>
      <form className="mystory" onSubmit={handleSubmit}>
        <p>
          <label>
            <input
              className="createtitle"
              placeholder="Escribe un título..."
              value={title}
              onChange={(e) => settitle(e.target.value)}
            />
          </label>
        </p>
        <p>
          <label>
            <input
              placeholder="Escribe tu historia..."
              value={body}
              onChange={(e) => setBody(e.target.value)}
            />
          </label>
        </p>
        <p>
          <label>
            <input
              value={date}
              onChange={(e) => setDate(e.target.value)}
              type="date"
            />
          </label>
        </p>
        <Button className={classes.submit} type="submit">
          Publica
        </Button>
      </form>
    </>
  );
}

export default EditStory;

//La fecha se debe poner automática, da error
//Hace falta poner el valor inicial en useState
