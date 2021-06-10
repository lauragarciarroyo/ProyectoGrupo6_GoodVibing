import { useState } from "react";

function Profile() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [biography, setBiography] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [residence, setResidence] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, email, password, biography, birthdate, residence);
  };

  return (
    <form className="edituser" onSubmit={handleSubmit}>
      <label>
        Username:
        <input
          placeholder="User..."
          value={username}
          onChange={(e) => setUsername(e.target.value)}
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
        Password:
        <input
          placeholder="Password..."
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
        />
      </label>
      <br />
      <br />
      <label>
        Biografía:
        <input
          placeholder="Escribe algo sobre ti..."
          value={biography}
          onChange={(e) => setBiography(e.target.value)}
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

      <button>Guardar cambios</button>
      <button>Eliminar cuenta</button>
    </form>
  );
}

export default Profile;
