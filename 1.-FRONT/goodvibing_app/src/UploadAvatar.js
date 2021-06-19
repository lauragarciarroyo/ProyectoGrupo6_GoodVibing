import { useState } from "react";

function UploadAvatar() {
  const [file, setFile] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fd = new FormData();
    fd.append("image", file);
    const ret = await fetch("http://localhost:4000/api/users/avatar", {
      method: "POST",
      body: fd,
    });
    await ret.json();
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Imagen:
        <input onChange={(e) => setFile(e.target.files[0])} type="file" />
      </label>
      <button>Enviar</button>
    </form>
  );
}

export default UploadAvatar;
