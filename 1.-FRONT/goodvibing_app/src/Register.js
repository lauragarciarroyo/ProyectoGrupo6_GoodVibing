import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { TextField } from "@material-ui/core";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";

const useStyle = makeStyles({
  submit: {
    background: "#84047e",
    border: 0,
    borderRadius: 3,
    color: "white",
    height: 48,
    padding: "0 30px",
    marginTop: "15px",
    width: "100%",
    type: "submit",
  },
});

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyle();
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
      dispatch({ type: "REGISTER", user: data.data });
      history.push("/");
    } else {
      dispatch({ type: "SET_ERROR", message: data.message });
    }
  };
  const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(8),
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: "100%", // Fix IE 11 issue.
      marginTop: theme.spacing(3),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }));

  function Copyright() {
    return (
      <Typography variant="body2" color="textSecondary" align="center">
        {"Copyright © "}
        <Link color="inherit" href="/">
          GoodVibing
        </Link>{" "}
        {new Date().getFullYear()}
        {"."}
      </Typography>
    );
  }
  return (
    <Container component="main" maxWidth="xs">
      <form className="register" onSubmit={handleSubmit}>
        <div className={classes.paper}>
          <Typography component="h1" variant="h5">
            Regístrate
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <label>
                <TextField
                  autoComplete="name"
                  name="Name"
                  variant="outlined"
                  required
                  fullWidth
                  id="Name"
                  label="Nombre"
                  autoFocus
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </label>
            </Grid>
            <Grid item xs={12}>
              <label>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  label="Correo electrónico"
                  name="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                />
              </label>
            </Grid>
            <Grid item xs={12}>
              <label>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="password"
                  label="Contraseña"
                  id="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                />
              </label>
            </Grid>
          </Grid>
          <Button className={classes.submit} type="submit">
            Únete a nuestra comunidad
          </Button>
        </div>
      </form>
    </Container>
  );
}

export default Register;
