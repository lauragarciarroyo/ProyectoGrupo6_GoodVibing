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
        <div
          className="flex-item:nth-child(1)"
          order="0"
          flex="0 1 auto"
          alignSelf="flex-start"
        >
          <Link to="/">
            <img src={logo} width={100} href="/" alt="home" />
          </Link>
        </div>

        <div
          className="flexsearch--wrapper"
          height="auto"
          width="auto"
          maxWidth="90%"
          overflow="hidden"
          background="transparent"
          margin="5px 10px"
          position="static"
        ></div>

        <div
          className="flexsearch--form"
          overflow="hidden"
          position="relative"
        ></div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (search) {
              history.push(`/search?q=${search}`);
            }
          }}
        ></form>

        <div
          className="flexsearch--input-wrapper"
          padding="0 66px 0 0"
          overflow="hidden"
        ></div>

        <div
          className="flexsearch--input"
          box-sizing="content-box"
          height="60px"
          padding="0 40px 0 10px"
          borderColor="#84047e"
          borderRadius="35px"
          borderStyle="solid"
          borderWidth="5px"
          marginTop="15px"
          color="#84047e"
          fontFamily="Helvetica, sans-serif"
          fontSize="26px"
          placeholder="Busca una experiencia"
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        ></div>

        <div
          className="flexsearch--submit"
          position="absolute"
          right="0"
          top="0"
          display="block"
          width="60px"
          height="60px"
          padding="0"
          border="none"
          marginTop="20px"
          marginRight="5px"
          background="transparent"
          color="#84047e"
          fontFamily="Helvetica, sans-serif"
          fontSize="40px"
          lineHeight="60px"
        ></div>

        <div
          className="flexsearch--input:focus"
          outline="none"
          borderColor="purple"
        ></div>

        <div
          className="flexsearch--input:focus.flexsearch--submit"
          color="violet"
        ></div>

        <div
          className="flexsearch--submit:hover"
          color="violet"
          cursor="pointer"
        ></div>

        <div className="input:-moz-placeholder" color="#84047e"></div>

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
            <img src={iconoSobre} width={50} alt="contact" />{" "}
          </Link>
        </div>
      </div>
    </div>
  );
}
