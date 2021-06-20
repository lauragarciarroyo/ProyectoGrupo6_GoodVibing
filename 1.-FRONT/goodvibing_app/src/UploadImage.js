import { useState } from "react";
import { useSelector } from "react-redux";

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

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Imagen:
        <input onChange={(e) => setFile(e.target.file)} type="file" />
      </label>
      <button>Subir Imagen</button>
    </form>
  );
}

export default UploadImage;
