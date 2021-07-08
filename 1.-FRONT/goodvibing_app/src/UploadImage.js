import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router";
import ImageStory from "./ImageStory";
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
    width: "10%",
    type: "submit",
    marginLeft: "1px",
  },
});

function UploadImage() {
  const [file, setFile] = useState();
  const token = useSelector((s) => s.user?.token);
  const { id } = useParams();
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
      fd.append("image", file);
      const res = await fetch(`http://localhost:4000/api/stories/${id}/image`, {
        method: "POST",
        headers: {
          Authorization: "Bearer " + token,
        },
        body: fd,
      });
      const { data } = await res.json();
      console.log("data", data);

      if (res.ok) {
        file(data);
      } else {
        throw new Error(data.error);
      }
    } catch (error) {
      dispatch({ type: "SET_ERROR", message: error.message });
    }
  };

  return (
    <div className="UploadImage">
      <ImageStory />
      <form onSubmit={handleSubmit}>
        <label>
          Imagen:
          <input onChange={(e) => setFile(e.target.files[0])} type="file" />
        </label>
        <Button className={classes.submit} type="submit">
          Enviar
        </Button>
      </form>
    </div>
  );
}

export default UploadImage;
