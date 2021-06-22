import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import Userinfo from "./Userinfo";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { Box } from "@material-ui/core";
import UploadAvatar from "./UploadAvatar";

function Profile() {
  const { token, user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  console.log(user);

  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [bio, setBio] = useState(user.bio || "");
  const [birthdate, setBirthdate] = useState(user.birthdate || "");
  const [residence, setResidence] = useState(user.residence || "");
  const [font, setFont] = useState(user.font || "sans-serif");

  console.log(birthdate);
  const useStyles = makeStyles((theme) => ({
    root: {
      marginTop: theme.spacing(4),
      display: "flex",
      flexDirection: "column",
      width: "15%",
      alignItems: "left",
    },
    box: {
      margin: theme.spacing(0, 100, 0),
    },
  }));

  const classes = useStyles();

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
    <div>
      <>
        <form className={classes.root} onSubmit={handleSubmit}>
          <p>
            <label>
              <TextField
                id="filled-basic"
                style={{ margin: 20 }}
                variant="filled"
                placeholder="User..."
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </label>
          </p>
          <p>
            <label>
              <TextField
                id="filled-basic"
                variant="filled"
                style={{ margin: 20 }}
                placeholder="Email..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
              />
            </label>
          </p>
          <p>
            <label>
              <TextField
                id="filled-basic"
                variant="filled"
                multiline
                style={{ margin: 20 }}
                rowsMax={8}
                placeholder="Escribe algo sobre ti..."
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                type="text"
              />
            </label>
          </p>
          <p>
            <label>
              <TextField
                id="filled-basic"
                variant="filled"
                style={{ margin: 20 }}
                value={
                  birthdate && birthdate.length > 10
                    ? birthdate.slice(0, 10)
                    : birthdate
                }
                onChange={(e) => {
                  setBirthdate(e.target.value);
                }}
                type="date"
              />
            </label>
          </p>
          <p>
            <label>
              <TextField
                id="filled-basic"
                variant="filled"
                style={{ margin: 20 }}
                placeholder="¿Dónde vives?"
                value={residence}
                onChange={(e) => setResidence(e.target.value)}
                type="text"
              />
            </label>
          </p>
          <p>
            <label>
              <TextField
                select
                name="font"
                style={{ margin: 20 }}
                value={font}
                onChange={(e) => setFont(e.target.value)}
              >
                <option value="sans-serif">sans-serif</option>
                <option value="serif">serif</option>
                <option value="monospace">monospace</option>
              </TextField>
            </label>
          </p>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Editar historia
          </Button>{" "}
        </form>
        <div className={classes.paper}>
          <Button href="/deleteuser" color="primary">
            Eliminar cuenta
          </Button>{" "}
          <Button href="/changepassword" color="primary">
            Cambiar contraseña
          </Button>{" "}
        </div>
        <div className={classes.box}>
          <Box>
            <Userinfo user={user} />
          </Box>
        </div>
        <UploadAvatar />
      </>
    </div>
  );
}

export default Profile;

//Falta añadir el cambio de fondo
