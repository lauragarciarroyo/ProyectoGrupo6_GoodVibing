import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import UserAvatar from "./UserAvatar";
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
    width: "30%",
    type: "submit",
  },
});

function UploadAvatar() {
  const [file, setFile] = useState();
  const { token, user } = useSelector((s) => s.user);
  const dispatch = useDispatch();
  const classes = useStyle();
  const handleSubmit = async (e) => {
    try {
      if (!file) {
        throw new Error("No hay ningún fichero que subir");
      }

      console.log(file);

      e.preventDefault();
      const fd = new FormData();
      fd.append("avatar", file);
      const res = await fetch("http://localhost:4000/api/users/avatar", {
        method: "POST",
        headers: {
          Authorization: "Bearer " + token,
        },
        body: fd,
      });
      const { data } = await res.json();
      dispatch({ type: "EDIT", user: data });
    } catch (error) {
      dispatch({ type: "SET_ERROR", message: error.message });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <UserAvatar src={user.avatar} />
      <label>
        <input onChange={(e) => setFile(e.target.files[0])} type="file" />
      </label>
      <Button className={classes.submit} type="submit">
        Enviar
      </Button>
    </form>
  );
}

export default UploadAvatar;
