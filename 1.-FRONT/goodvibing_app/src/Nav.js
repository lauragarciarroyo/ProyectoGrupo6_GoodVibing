import React, { useState } from "react";
import { Link, NavLink, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import "./Home.css";
import logo from "./assets/img/logo.jpg";
import dados from "./assets/img/dados.png";
import iconoSobre from "./assets/img/iconoSobre.png";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import InputBase from "@material-ui/core/InputBase";
import { fade, makeStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import UserAvatar from "./UserAvatar";
import login from "./assets/img/login.png";
import register from "./assets/img/register.png";

const useStyles = makeStyles((theme) => ({
  root: {
    marginRight: "0 0 1rem",
    width: "100%",
    backgroundColor: "white",
    display: "flex",
    alignItems: "start",
    justifyContent: "space-between",
  },
  menuButton: {
    marginRight: "0 0 1rem",
    width: "100%",
    backgroundColor: "white",
    display: "flex",
    alignItems: "start",
    justifyContent: "space-between",
  },
  title: {
    marginRight: "0 0 1rem",
    width: "100%",
    backgroundColor: "white",
    display: "flex",
    alignItems: "start",
    justifyContent: "space-between",
  },
  search: {
    justifyContent: "space-between",
    color: "purple",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 5,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "space-between",
    justifyContent: "space-between",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

export default function SearchAppBar() {
  const classes = useStyles();
  const user = useSelector((state) => state.user);
  const [search, setSearch] = useState(null);
  const history = useHistory();

  return (
    <div className={classes.root}>
      <AppBar
        position="static"
        style={{
          marginRight: "0 0 1rem",
          width: "100%",
          backgroundColor: "white",
          display: "flex",

          alignItems: "start",
          justifyContent: "space-between",
          flexDirection: "row",
          flexWrap: "nowrap",
        }}
      >
        <Toolbar style={{ width: "100%", flexGrow: "0" }}>
          <Link to="/">
            <img src={logo} width={100} href="/" alt="home" />
          </Link>

          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (search) {
                  history.push(`/search?q=${search}`);
                }
              }}
            >
              <InputBase
                placeholder="Busca una experiencia"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ "aria-label": "search" }}
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
              />
            </form>
          </div>
          <Link to="/search">
            <img src={dados} width={50} alt="random" href="./search"></img>
          </Link>
          <div className="right" style={{ marginLeft: "auto" }}>
            {!user ? (
              <>
                <Link to="/Login">
                  <img src={login} width={50} alt="in" href="./Login" />
                </Link>

                <Link to="/register">
                  <img src={register} width={50} alt="up" href="./register" />
                </Link>
              </>
            ) : (
              <>
                <UserAvatar src={user.user.avatar} />
              </>
            )}
          </div>
        </Toolbar>
      </AppBar>
      <div className="btn-flotante">
        <NavLink to="/contact"></NavLink>
        <Link to="/contact">
          <img src={iconoSobre} width={50} alt="contact" />{" "}
        </Link>
      </div>
    </div>
  );
}
