import React from "react";
import { useState } from "react";
import { Link, NavLink, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import UserAvatar from "./UserAvatar";
import "./Navbar.css";
import logo from "./assets/img/logo.jpg";
import dados from "./assets/img/dados.png";
import login from "./assets/img/login.png";
import register from "./assets/img/register.png";
import iconoSobre from "./assets/img/iconoSobre.png";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

const useStyle = makeStyles({
  submit: {
    background: "#84047e",
    border: 0,
    borderRadius: "50%",
    color: "white",
    height: "50px",
    padding: "0 10px",
    marginTop: "15px",
    width: "20%",
    type: "submit",
  },
});

export default function Navbar() {
  const user = useSelector((state) => state.user);
  const [search, setSearch] = useState(null);
  const history = useHistory();
  const classes = useStyle();
  return (
    <div className="container" width={100}>
      <div
        className="flex-container"
        display="flex"
        flexDirection="row"
        flexWrap="nowrap"
        justifyContent="space-around"
        alignContent="space-around"
        alignItems="flex-start"
        margin="0"
        padding="10px 3px 3px 3px"
        backgroundColor="white"
      >
        <div className="buttonLogoHome">
          <Link to="/">
            <img src={logo} width={250} href="/" alt="home" />
          </Link>
        </div>
        <div className="flexsearch">
          <div
            className="flexsearch--wrapper"
            height="auto"
            width="auto"
            maxWidth="90%"
            overFlow="hidden"
            backgroundColor="transparent"
            margin="5px 10px"
            position="static"
          >
            <div
              className="flexsearch--form"
              overFlow="hidden"
              position="relative"
            >
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (search) {
                    history.push(`/search?q=${search}`);
                  }
                }}
              >
                <div
                  className="flexsearch--input-wrapper"
                  padding="0 66px 0 0"
                  overFlow="hidden"
                >
                  <input
                    className="flexsearch--input"
                    width="100"
                    boxSizing="content-box"
                    height="60px"
                    padding="0 40px 0 10px"
                    borderColor="#84047e"
                    borderRadius="35px"
                    borderStyle="solid"
                    borderWidth="5px"
                    marginTop="15px"
                    color="#84047e"
                    fontSize="15px"
                    placeholder="Busca una experiencia"
                    onChange={(e) => {
                      setSearch(e.target.value);
                    }}
                  ></input>
                  <Button className={classes.submit} type="submit">
                    Go!
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="random">
          <Link to="./RandomStories">
            <img src={dados} width={150} href="./RandomStories" alt="random" />
          </Link>
        </div>

        {!user ? (
          <>
            <div className="login">
              <Link to="./Login">
                <img src={login} width={100} href="./Login" alt="login" />
              </Link>
            </div>
            <div className="register">
              <Link to="./Register">
                <img
                  src={register}
                  width={100}
                  href="./Register"
                  alt="registro"
                />
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
