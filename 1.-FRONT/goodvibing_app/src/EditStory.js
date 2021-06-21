import { Button, Container, makeStyles, TextField } from "@material-ui/core";
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
    form: {
      width: "100%",
      margin: theme.spacing(3, 0, 2),
    },
  }));
  const classes = useStyles();

  return (
    <>
      <form className="mystory" onSubmit={handleSubmit}>
        <p>
          <label>
            <TextField
              id="standard-full-width"
              label="Título"
              style={{ margin: 80 }}
              placeholder="Escribe un título..."
              margin="normal"
              value={title}
              onChange={(e) => settitle(e.target.value)}
            />
          </label>
        </p>
        <p>
          <label>
            <TextField
              id="outlined-full-width"
              label="Historia"
              style={{ margin: 70 }}
              placeholder="Escribe tu historia..."
              fullWidth
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
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
        <p />
        <Container maxWidth="xl">
          <UploadImage />
        </Container>
        <p />
        <p />
        <Container maxWidth="xl">
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Eliminar historia
          </Button>{" "}
        </Container>
      </form>
    </>
  );
}

export default EditStory;

//La fecha se debe poner automática, da error
//Hace falta poner el valor inicial en useState
