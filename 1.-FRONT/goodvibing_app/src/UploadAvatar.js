import { Avatar } from "@material-ui/core";
import { useState } from "react";
import { useSelector } from "react-redux";

function UploadAvatar() {
  const [file, setFile] = useState();
  const token = useSelector((s) => s.user?.token);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fd = new FormData();
    fd.append("avatar", file);
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
      <Avatar />
      <label>
        <input onChange={(e) => setFile(e.target.file)} type="file" />
      </label>
      <button>Enviar</button>
    </form>
  );
}

export default UploadAvatar;
