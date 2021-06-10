import logo from "./goodvibing_logo_ps02.png";
import Profile from "./Profile";
import Stories from "./Stories";
import Message from "./Message";
import { Switch, Route } from "react-router-dom";
import Menu from "./Menu";
import Home from "./Home";
import LoginRegister from "./Loginregister";
import Contact from "./Contact";

function App() {
  return (
    <div className="App">
      <Menu />
      <main>
        <Switch>
          <Route path="/home" exact>
            <Home />
          </Route>
          <Route path="/profile" exact>
            <Profile />
          </Route>
          <Route path="/stories" exact>
            <Stories />
          </Route>
          <Route path="/message" exact>
            <Message />
          </Route>
          <Route path="/loginregister" exact>
            <LoginRegister />
          </Route>
          <Route path="/contact" exact>
            <Contact />
          </Route>
        </Switch>
      </main>
    </div>
  );
}

export default App;
