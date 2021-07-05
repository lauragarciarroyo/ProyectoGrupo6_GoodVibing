import React, { useState } from "react";
import { Link, NavLink, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import "./Home.css";
import logo from "./assets/img/logo.jpg";
import dados from "./assets/img/dados.png";
import iconoSobre from "./assets/img/iconoSobre.png";
import UserAvatar from "./UserAvatar";
import login from "./assets/img/login.png";
import register from "./assets/img/register.png";
import { Button } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import { makeStyles } from "@material-ui/core";

const useStyle = makeStyles({
  submit: {
    background: "#84047e",
    border: 0,
    borderRadius: 3,
    color: "white",
    height: 48,
    padding: "0 30px",
    marginTop: "15px",
    width: "15%",
    type: "submit",
  },
});

export default function SearchAppBar() {
  const user = useSelector((state) => state.user);
  const [search, setSearch] = useState(null);
  const history = useHistory();
  const classes = useStyle();

  return (
    <div className="container">
      <div className="flex-container">
        <Link to="/">
          <img src={logo} width={100} href="/" alt="home" />
        </Link>

        <div className="search" width="50%">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (search) {
                history.push(`/search?q=${search}`);
              }
            }}
          >
            <input
              placeholder="Busca una experiencia"
              onChange={(e) => {
                setSearch(e.target.value);
              }}
            />
            <Button className={classes.submit} type="submit">
              Go!
            </Button>
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
