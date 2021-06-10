import React, { useState } from "react";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email, password);
  };
  return (
    <form className="Login" onSubmit={handleSubmit}>
      <label>
        Email:
        <input
          placeholder="Email..."
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>
      <br />
      <label>
        Password:
        <input
          placeholder="Password..."
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      <br />
      <button>Entrar</button>
      <button>Seguir como invitado</button>
    </form>
  );
}

export default Login;
