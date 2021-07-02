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

export default function SearchAppBar() {
  const user = useSelector((state) => state.user);
  const [search, setSearch] = useState(null);
  const history = useHistory();

  return (
    <div className="container" width="100%">
      <div
        className="flex-container"
        display="-ms-flexbox"
        display="-webkit-flex"
        display="flex"
        flexDirection="row"
        flexWrap="nowrap"
        justifyContent="space-around"
        flexPack="distribute"
        alignContent="space-around"
        flexLinePack="distribute"
        alignItems="flex-start"
        flexAlign="start"
        margin="0"
        padding="10px 3px 3px 3px"
        backgroundColor="white"
      >
        <Link to="/">
          <img src={logo} width={100} href="/" alt="home" />
        </Link>
      </div>

      <div
        className="search"
        width="20%"
        position="relative"
        display="flex"
        marginTop="35px"
        onSubmit={(e) => {
          e.preventDefault();
          if (search) {
            history.push(`/search?q=${search}`);
          }
        }}
      >
        {" "}
      </div>

      <div
        className="searchTerm"
        width="100%"
        border="3px solid #84047e"
        borderRight="none"
        padding="5px"
        height="20px"
        borderRadius="5px 0 0 5px"
        outline="none"
        color="#84047e"
      ></div>

      <div className="searchTerm:focus" color="#84047e" fontSize="large"></div>

      <div
        className="searchButton"
        width="40px"
        height="36px"
        border="3px solid #84047e"
        background="#84047e"
        textAlign="center"
        color="#fff"
        borderRadius="0 5px 5px 0"
        cursor="pointer"
        fontSize="20px"
        onChange={(e) => {
          setSearch(e.target.value);
        }}
      ></div>

      <div
        className="wrap"
        width="30%"
        position="absolute"
        top="50%"
        left="50%"
        transform="translate(-50%, -50%)"
      >
        <Link to="./RandomStories">
          <img src={dados} width={50} alt="random" href="./RandomStories"></img>
        </Link>
        <div className="right">
          {!user ? (
            <>
              <Link to="./Login">
                <img src={login} width={50} alt="in" href="./login" />
              </Link>

              <Link to="./register">
                <img src={register} width={50} alt="up" href="./register" />
              </Link>
            </>
          ) : (
            <>
              <UserAvatar src={user.user.avatar} />
            </>
          )}
        </div>
      </div>

      <div className="btn-flotante" position="fixed" bottom="5px" right="40px">
        <div className="btn-flotante:hover" transform="translateY(-7px)">
          <NavLink to="/contact"></NavLink>
          <Link to="/contact">
            <img src={iconoSobre} width={50} alt="contact" />
          </Link>
        </div>
      </div>
    </div>
  );
}
