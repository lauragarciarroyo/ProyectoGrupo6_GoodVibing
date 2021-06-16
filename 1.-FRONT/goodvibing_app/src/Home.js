import Helmet from "react-helmet";
import { Link, NavLink } from "react-router-dom";
import Search from "./Search";
import { useSelector } from "react-redux";

function Home() {
  const user = useSelector((state) => state.user);

  return (
    <div>
      <meta charSet="utf-8" />
      <link rel="icon" href="goodvibing_ico_ps04.jpg" />
      <meta
        name="viewport"
        content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0"
      />
      <link rel="stylesheet" href="Home.css" />
      <title>GoodVibing</title>
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
              <a
                className="avatarLoginRegister"
                href="https://simpsons.fandom.com/es/wiki/Homer_Simpson"
              >
                <img src="user.png" width={100} />
              </a>
            </div>
          </div>
        </div>
      </header>
      <a className="btn-flotante" href="https://www.gmail.com">
        <img src="mailbox.png" />
      </a>
    </div>
  );
},
});

export default Home;
