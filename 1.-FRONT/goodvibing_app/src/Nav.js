import React, { useState } from "react";
import { Link, NavLink, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

import logo from "./assets/img/logo.jpg";
import dados from "./assets/img/dados.png";
import iconoSobre from "./assets/img/iconoSobre.png";
import UserAvatar from "./UserAvatar";
import login from "./assets/img/login.png";
import register from "./assets/img/register.png";

export default function SearchAppBar() {
  const user = useSelector((state) => state.user);
  const [search, setSearch] = useState(null);
  const history = useHistory();

  return (
    <div className="navbar">
      <div className="logoHome">
        <Link to="/">
          <img src={logo} width={300} href="/" alt="home" />
        </Link>

        <div className="searchform" color="#84047e" marginLeft="5px">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (search) {
                history.push(`/search?q=${search}`);
              }
            }}
          >
            <input
              borderColor="#84047e"
              borderWidth="5px"
              borderSyle="solid"
              width="300px"
              height="40px"
              textAlign="center"
              color="#84047e"
              borderRadius="20px"
              placeholder="Busca una experiencia"
              onChange={(e) => {
                setSearch(e.target.value);
              }}
            />
          </form>
        </div>
        <div className="wrap">
          <Link to="/search">
            <img src={dados} width={50} alt="random" href="./search"></img>
          </Link>
        </div>

        {!user ? (
          <>
            <div className="right">
              <Link to="/Login">
                <img src={login} width={50} alt="in" href="./Login" />
              </Link>

              <Link to="/register">
                <img src={register} width={50} alt="up" href="./register" />
              </Link>
            </div>
          </>
        ) : (
          <>
            <UserAvatar src={user.user.avatar} />
          </>
        )}
      </div>
      <div className="btn-flotante">
        <NavLink to="/contact"></NavLink>
        <Link to="/contact">
          <img src={iconoSobre} width={50} alt="contact" />
        </Link>
      </div>
    </div>
  );
}
