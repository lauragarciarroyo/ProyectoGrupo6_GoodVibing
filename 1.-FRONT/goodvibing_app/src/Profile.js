import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import Userinfo from "./Userinfo";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { Box } from "@material-ui/core";

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
      "& > *": {
        margin: theme.spacing(1),
        width: "25ch",
      },
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
      <Container component="main" maxWidth="lg">
        <CssBaseline />
        <>
          <form className={classes.root} onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item lg={12} sm={20}>
                <p>
                  <label>
                    <TextField
                      id="filled-basic"
                      variant="filled"
                      placeholder="User..."
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </label>
                </p>
              </Grid>
              <Grid item lg={12}>
                <p>
                  <label>
                    <TextField
                      id="filled-basic"
                      variant="filled"
                      placeholder="Email..."
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      type="email"
                    />
                  </label>
                </p>
              </Grid>
              <Grid item lg={12}>
                <p>
                  <label>
                    <TextField
                      id="filled-basic"
                      variant="filled"
                      multiline
                      rowsMax={8}
                      placeholder="Escribe algo sobre ti..."
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                      type="text"
                    />
                  </label>
                </p>
              </Grid>
              <Grid item lg={12}>
                <p>
                  <label>
                    <TextField
                      id="filled-basic"
                      variant="filled"
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
              </Grid>
              <Grid item lg={12}>
                <p>
                  <label>
                    <TextField
                      id="filled-basic"
                      variant="filled"
                      placeholder="¿Dónde vives?"
                      value={residence}
                      onChange={(e) => setResidence(e.target.value)}
                      type="text"
                    />
                  </label>
                </p>
              </Grid>
              <Grid item lg={12}>
                <p>
                  <label>
                    <TextField
                      select
                      name="font"
                      value={font}
                      onChange={(e) => setFont(e.target.value)}
                    >
                      <option value="sans-serif">sans-serif</option>
                      <option value="serif">serif</option>
                      <option value="monospace">monospace</option>
                    </TextField>
                  </label>
                </p>
              </Grid>
            </Grid>
            <button>Guardar cambios</button>
          </form>
          <Container>
            <Button href="/deleteuser" color="primary">
              Eliminar cuenta
            </Button>{" "}
          </Container>
          <Container>
            <Button href="/changepassword" color="primary">
              Cambiar contraseña
            </Button>{" "}
          </Container>

          <Box sm={15}>
            <Userinfo user={user} />
          </Box>
        </>
      </Container>
    </div>
  );
}

export default Profile;

//Falta añadir el cambio de fondo
//.slice(0, 10)
