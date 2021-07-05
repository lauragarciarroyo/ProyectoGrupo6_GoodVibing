import React from "react";
import Header from "./Header";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
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
    width: "100%",
    type: "submit",
  },
});

function CreateStory() {
  const history = useHistory();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const classes = useStyle();
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
      history.push("/mystories");
    } else {
      dispatch({ type: "SET_ERROR", message: data.message });
    }
  };

  return (
    <div className="createstory">
      <Header title="¡Bienvenid@ a tu blog!" />
      <div className="preview">
        <h1>{title}</h1>
        <p>{body}</p>
      </div>
      <form className="create" onSubmit={handleSubmit}>
        <label>
          <input
            className="createtitle"
            placeholder="Escribe aquí el título..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>
        <p />
        <label>
          <input
            className="createbody"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="Escribe aquí tu historia..."
          />
        </label>
        <p />

        <Button className={classes.submit} type="submit">
          Publica
        </Button>
      </form>
    </div>
  );
}

export default CreateStory;
