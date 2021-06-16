import React, { useState } from "react";
import { useDispatch } from "react-redux";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:4000/api/users", {
      method: "POST",
      body: JSON.stringify({ name, email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();

    if (res.ok) {
      dispatch({ type: "REGISTER", user: data });
      // Aquí hay que hacer algo más...
    } else {
      dispatch({ type: "SET_ERROR", message: data.message });
    }
  };

  return (
    <form className="register" onSubmit={handleSubmit}>
      <label>
        Username:
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
