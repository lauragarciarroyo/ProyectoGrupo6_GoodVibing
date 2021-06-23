import React from "react";
import StoriesHome from "./StoriesHome";
import logoEntero_blanco from "./assets/img/logoEntero_blanco.png";

export default function Home() {
  return (
    <div>
      <h1>
        <p>Bienvenido a </p>
        <p>
          <img src={logoEntero_blanco} alt="logo" width="200"></img>
        </p>
      </h1>
      <h3>La plataforma donde podrás compartir SOLO-BUENAS-NOTICIAS</h3>
      <StoriesHome />
    </div>
  );
}
