import Helmet from "react-helmet";
import { Link, NavLink } from "react-router-dom";
import Search from "./Search";
import { useSelector } from "react-redux";
import "./Home.css";

function Home() {
  const user = useSelector((state) => state.user);

  return (
    <div className="home">
      <Helmet>
        <title>GoodVibing</title>
      </Helmet>
      <header>
        <div className="container">
          <div className="flex-container">
            <div>
              <a
                className="buttonLogoHome"
                href="https://motherfuckingwebsite.com/"
              >
                <img src="goodvibing_logo_ps02.jpg" width={200} />
              </a>
            </div>
            <div className="flexsearch">
              <div className="flexsearch--wrapper">
                <form className="flexsearch--form" action="#" method="post">
                  <div className="flexsearch--input-wrapper">
                    <input
                      className="flexsearch--input"
                      type="search"
                      placeholder="Busca una experiencia"
                    />
                  </div>
                  <input
                    className="flexsearch--submit"
                    type="submit"
                    defaultValue="➜"
                  />
                </form>
              </div>
            </div>
            <div>
              <a className="avatarLoginRegister"></a>
              <NavLink to="/loginregister">¡Bienvenido!</NavLink>
              <img src="user.png" width={100} />
            </div>
          </div>
        </div>
      </header>
      <a className="btn-flotante">
        {" "}
        <Link to="/contact"></Link>
        <img src="mailbox.png" />
      </a>
    </div>
  );
}

export default Home;
