import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Header from "./Header";
import { Container, CssBaseline, TextField } from "@material-ui/core";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import UploadImage from "./UploadImage";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="/">
        GoodVibing
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

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
      history.push("/mystories");
    } else {
      dispatch({ type: "SET_ERROR", message: data.message });
    }
  };

  return (
    <Container component="main" maxWidth="sm">
      <CssBaseline />
      <Header title="¡Bienvenid@ a tu blog!" />
      <div className="historias">
        <div className="preview">
          <h1>{title}</h1>
          <p>{body}</p>
        </div>
        <form className="edituser" onSubmit={handleSubmit}>
          <label>
            <TextField
              id="filled-basic"
              placeholder="Escribe aquí el título..."
              value={title}
              margin="normal"
              onChange={(e) => setTitle(e.target.value)}
              maxWidth="xs"
              required
              rowsMax="1"
              size="medium"
              style={{ margin: 40 }}
              align="center"
            />
          </label>
          <p />
          <label>
            <TextField
              id="filled-basic"
              variant="filled"
              multiline={true}
              value={body}
              onChange={(e) => setBody(e.target.value)}
              style={{ margin: 50 }}
              required
              textareautosize
              placeholder="Escribe aquí tu historia..."
            />
          </label>
          <p />

          <Container>
            <UploadImage />
          </Container>

          <button>Guardar historia</button>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}

export default CreateStory;
