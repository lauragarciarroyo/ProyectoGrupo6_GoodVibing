import Helmet from "react-helmet";
import { Link, NavLink } from "react-router-dom";
import Search from "./Search";
import { useSelector } from "react-redux";
import "./Home.css";
import "./AppBar";
import FondoHome from "./assets/img/FondoHome.jpg";
import logo from "./assets/img/logo.jpg";
import mailbox from "./assets/img/mailbox.png";
import avatar from "./assets/img/avatar.png";
import enter from "./assets/img/enter.png";
import register from "./assets/img/register.png";

function Home() {
  const user = useSelector((state) => state.user);

  return (
    <div className="Home">
      <div className="container">
        <div className="flex-container">
          <div className="buttonLogoHome">
            <Link to="/">
              <img src={logo} width={200} alt="logo" />
            </Link>

            <div className="Search">
              <Search />

              <div className="LoginButton">
                <NavLink to="./SignIn"></NavLink>
                <Link to="./SignIn">
                  <img src={enter} width={50} alt="login" />
                </Link>
              </div>

              <div className="RegisterButton">
                <NavLink to="./SignUp"></NavLink>
                <Link to="./SignUp">
                  <img src={register} width={50} alt="register" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="btn-flotante">
        <NavLink to="/contact"></NavLink>
        <Link to="/contact">
          <img src={mailbox} alt="contact" />{" "}
        </Link>
      </div>
    </div>
  );
}

export default Home;
