import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router";
import ImageStory from "./ImageStory";

function UploadImage() {
  const [file, setFile] = useState();
  const token = useSelector((s) => s.user?.token);
  const { id } = useParams();
  const dispatch = useDispatch();

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
    <form onSubmit={handleSubmit}>
      <ImageStory src={ImageStory.image} />
      <label>
        Imagen:
        <input onChange={(e) => setFile(e.target.files[0])} type="file" />
      </label>
      <button>Enviar</button>
    </form>
  );
}

export default UploadImage;
