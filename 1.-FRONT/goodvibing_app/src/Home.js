import React from "react";
import StoriesHome from "./StoriesHome";
import "./Home.css";
import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div>
      <h2> Bienvenido a </h2>
      <h1>Goodvibing</h1>
      <h2>La plataforma donde podrás compartir</h2>
      <h3>
        <strong>SOLO BUENAS NOTICIAS</strong>
      </h3>

      <StoriesHome />

      <Typography variant="body2" color="textSecondary" align="center">
        {"Copyright © "}
        <Link color="inherit" href="/">
          GoodVibing
        </Link>{" "}
        {new Date().getFullYear()}
        {"."}
      </Typography>
    </div>
  );
}
