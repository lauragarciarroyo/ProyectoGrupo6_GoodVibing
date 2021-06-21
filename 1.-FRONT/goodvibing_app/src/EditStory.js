import {
  Button,
  CssBaseline,
  makeStyles,
  TextareaAutosize,
  TextField,
} from "@material-ui/core";
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
  const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(8),
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      width: "100%",
    },
  }));
  const classes = useStyles();

  return (
    <>
      <form className="mystory" onSubmit={handleSubmit}>
        <CssBaseline />
        <div className={classes.paper}>
          <p>
            <label>
              <TextField
                id="standard-full-width"
                label="Título"
                middle
                style={{ margin: 40 }}
                placeholder="Escribe un título..."
                margin="normal"
                value={title}
                onChange={(e) => settitle(e.target.value)}
              />
            </label>
          </p>
          <p>
            <label>
              <TextareaAutosize
                aria-label="empty textarea"
                style={{ margin: 40 }}
                rowsMin={8}
                placeholder="Escribe tu historia..."
                value={body}
                onChange={(e) => setBody(e.target.value)}
              />
            </label>
          </p>
          <p>
            <label>
              <TextField
                id="standard-basic"
                style={{ margin: 40 }}
                value={date}
                onChange={(e) => setDate(e.target.value)}
                type="date"
              />
            </label>
          </p>
          <p />
          <UploadImage />
          <p />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Editar historia
          </Button>{" "}
        </div>
      </form>
    </>
  );
}

export default EditStory;

//La fecha se debe poner automática, da error
//Hace falta poner el valor inicial en useState
