import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router";

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
      fd.append("avatar", file);
      const res = await fetch(`http://localhost:4000/api/stories/${id}/image`, {
        method: "POST",
        headers: {
          Authorization: "Bearer " + token,
        },
        body: fd,
      });
      await res.json();
    } catch (error) {
      dispatch({ type: "SET_ERROR", message: error.message });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Imagen:
        <input onChange={(e) => setFile(e.target.file)} type="file" />
      </label>
      <button>Enviar</button>
    </form>
  );
}

export default UploadImage;
