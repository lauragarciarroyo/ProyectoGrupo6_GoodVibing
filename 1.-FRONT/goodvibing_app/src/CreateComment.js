import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

const useStyle = makeStyles({
  submit: {
    background: "#84047e",
    border: 0,
    borderRadius: 3,
    color: "white",
    height: 48,
    padding: "0 30px",
    marginTop: "15px",
    width: "20%",
    type: "submit",
    marginBottom: "0px",
  },
});

function CreateComment() {
  const token = useSelector((s) => s.user?.token);
  const history = useHistory();
  const classes = useStyle();
  const { id } = useParams();
  const dispatch = useDispatch();
  const [text, setText] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch(
      `http://localhost:4000/api/stories/${id}/comments`,
      {
        method: "POST",
        body: JSON.stringify({ text }),
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      }
    );
    const data = await res.json();

    if (res.ok) {
      history.go(0);
    } else {
      dispatch({ type: "SET_ERROR", message: data.message });
    }
  };

  return (
    <div>
      <form className="comentario" onSubmit={handleSubmit}>
        <label>
          <input
            className="createtitle"
            placeholder="Escribe tu comentario..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </label>
        <Button className={classes.submit} type="submit">
          Publica
        </Button>
      </form>
    </div>
  );
}

export default CreateComment;

//Crear comentario, link desde una historia
