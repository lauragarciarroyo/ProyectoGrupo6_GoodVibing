import { IconButton, makeStyles } from "@material-ui/core";
import { useState } from "react";
import { useSelector } from "react-redux";
import PhotoCamera from "@material-ui/icons/PhotoCamera";

function UploadImage() {
  const [file, setFile] = useState();
  const token = useSelector((s) => s.user?.token);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fd = new FormData();
    fd.append("image", file);
    const res = await fetch("http://localhost:4000/api/users/avatar", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: fd,
    });
    await res.json();
  };
  const useStyles = makeStyles((theme) => ({
    root: {
      "& > *": {
        margin: theme.spacing(1),
      },
    },
    input: {
      display: "none",
    },
  }));

  const classes = useStyles();

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Imagen:
        <input onChange={(e) => setFile(e.target.file)} type="file" />
      </label>
      <input
        accept="image/*"
        className={classes.input}
        id="icon-button-file"
        type="file"
      />
      <label htmlFor="icon-button-file">
        <IconButton
          color="primary"
          aria-label="upload picture"
          component="span"
        >
          <PhotoCamera />
        </IconButton>
      </label>
    </form>
  );
}

export default UploadImage;
