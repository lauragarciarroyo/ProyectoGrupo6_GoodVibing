import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect, NavLink } from "react-router-dom";
import DeleteUser from "./Deteleuser";
import UploadAvatar from "./UploadAvatar";
import Userinfo from "./Userinfo";

function Profile() {
  const { token, user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [bio, setBio] = useState(user.bio);
  const [birthdate, setBirthdate] = useState(user.birthdate);
  const [residence, setResidence] = useState(user.residence);
  const [font, setFont] = useState(user.font || "sans-serif");

  // Ejemplo de como cargar datos inicial
  // useEffect(() => {
  //   const getData = async () => {
  //     const response = await fetch(
  //       `http://localhost:4000/api/users/${user.id}`,
  //       {
  //         headers: { Authorization: "Bearer " + token },
  //       }
  //     );

  //     const data = await response.json();

  //     if (response.ok) {
  //       //llenamos los datos de usuario
  //       console.log(data);
  //     } else {
  //       dispatch({ type: "SET_ERROR", message: data.mesage });
  //     }
  //   };

  //   getData();
  // }, [user, token, dispatch]);

  console.log(birthdate);

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
    const data = await res.json();

    if (res.ok) {
      dispatch({ type: "EDIT", user: data.data });
    } else {
      dispatch({ type: "SET_ERROR", message: data.message });
    }
  };

  if (!token) {
    return <Redirect to="/loginregister" />;
  }

  return (
    <>
      <form className="edituser" onSubmit={handleSubmit}>
        <p>
          <label>
            Nombre:
            <input
              placeholder="User..."
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>
        </p>

        <p>
          <label>
            Email:
            <input
              placeholder="Email..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
            />
          </label>
        </p>
        <p>
          <label>
            Biografía:
            <textarea
              placeholder="Escribe algo sobre ti..."
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              type="text"
            ></textarea>
          </label>
        </p>
        <p>
          <label>
            Fecha de nacimiento:
            <input
              value={birthdate}
              onChange={(e) => setBirthdate(e.target.value)}
              type="date"
            />
          </label>
        </p>
        <p>
          <label>
            Residencia:
            <input
              placeholder="¿Dónde vives?"
              value={residence}
              onChange={(e) => setResidence(e.target.value)}
              type="text"
            />
          </label>
        </p>

        <p>
          <label>
            Fuente:
            <select
              name="font"
              value={font}
              onChange={(e) => setFont(e.target.value)}
            >
              <option value="sans-serif">sans-serif</option>
              <option value="serif">serif</option>
              <option value="monospace">monospace</option>
            </select>
          </label>
        </p>
        <button>Guardar cambios</button>
      </form>

      <p />
      <UploadAvatar />
      <p />
      <NavLink to="/changepassword">Cambiar contraseña</NavLink>
      <p />
      <DeleteUser />
      <p />
      <Userinfo user={user} />
    </>
  );
}

export default Profile;

//Falta añadir el cambio de fuente y de fondo
//.slice(0, 10)
