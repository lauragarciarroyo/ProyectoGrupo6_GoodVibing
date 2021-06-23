import React from "react";
import StoriesHome from "./StoriesHome2";
import "./Home.css";

export default function Home() {
  return (
    <div>
      <h1>¡ Bienvenido a Goodvibing !</h1>
      <h2>
        La plataforma donde podrás compartir <u>SOLO</u> - <u>BUENAS</u> -
        <u>NOTICIAS</u>
      </h2>
      <StoriesHome />
    </div>
  );
}
