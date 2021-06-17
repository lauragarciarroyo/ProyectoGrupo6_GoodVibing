import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect, NavLink } from "react-router-dom";
import Userinfo from "./Userinfo";

function Profile() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [bio, setBio] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [residence, setResidence] = useState("");
  const [font, setFont] = useState("");

  const token = useSelector((s) => s.user?.token);
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:4000/api/users", {
      method: "PUT",
      body: JSON.stringify({
        name,
        email,
        bio,
        residence,
        birthdate,
        font,
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });
    if (res.ok) {
      const data = await res.json();
      dispatch({ type: "EDIT", user: data });
    }
  };
  if (!token) {
    return <Redirect to="/loginregister" />;
  }

  return (
    <form className="edituser" onSubmit={handleSubmit}>
      <label>
        Nombre:
        <input
          placeholder="User..."
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>
      <br />
      <label>
        Email:
        <input
          placeholder="Email..."
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
        />
      </label>
      <br />
      <label>
        Biografía:
        <input
          placeholder="Escribe algo sobre ti..."
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          type="text"
        />
      </label>
      <br />
      <label>
        Fecha de nacimiento:
        <input
          placeholder="00/00/0000..."
          value={birthdate}
          onChange={(e) => setBirthdate(e.target.value)}
          type="date"
        />
      </label>
      <br />
      <label>
        Residencia:
        <input
          placeholder="¿Dónde vives?"
          value={residence}
          onChange={(e) => setResidence(e.target.value)}
          type="text"
        />
      </label>
      <label>
        Fuente
        <input
          value={font}
          onChange={(e) => setFont(e.target.value)}
          type="fuente"
        />
      </label>

      <NavLink to="/profile">Guardar cambios</NavLink>
      <br />
      <NavLink to="/changepassword">Cambiar contraseña</NavLink>
      <br />
      <NavLink to="/deleteuser">Eliminar cuenta</NavLink>
      <br />
      <Userinfo />
    </form>
  );
}

export default Profile;
