import React, { useState } from "react";
import { useSelector } from "react-redux";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const token = useSelector((s) => s.user?.token);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("http:/localhost:4000/api/users", {
      method: "POST",
      body: JSON.stringify({ username, email, password }),
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });
    if (res.ok) {
      const data = await res.json();
    }
  };

  return (
    <form className="register" onSubmit={handleSubmit}>
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
      <button>Únete</button>
    </form>
  );
}

export default Register;
