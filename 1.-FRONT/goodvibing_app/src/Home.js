import Helmet from "react-helmet";
import { Link, NavLink } from "react-router-dom";
import Search from "./Search";
import { useSelector } from "react-redux";
import "./Home.css";
import FondoHome from "./assets/img/FondoHome.jpg";
//import goodvibing_ico_ps04 from "./assets/img/goodvibing_ico_ps04";
import logo from "./assets/img/logo.jpg";
import mailbox from "./assets/img/mailbox.png";
import avatar from "./assets/img/avatar.png";
import next from "./assets/img/next.png";

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
          </div>
        </div>
      </div>
      <div className="flexsearch">
        <div className="flexsearch--wrapper">
          <form className="flexsearch--form" action="#" method="post">
            <div className="flexsearch--input-wrapper">
              <input
                className="flexsearch--input"
                type="search"
                placeholder="Busca una experiencia"
                button
                type="submit"
                className="searchButton"
              >
                <img src={next} />
              </input>
            </div>
          </form>
        </div>
      </div>

      <div className="avatarLoginRegister">
        <NavLink to="/loginregister"></NavLink>
        <Link to="/loginregister">
          <img src={avatar} width={100} alt="login" />
        </Link>
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
