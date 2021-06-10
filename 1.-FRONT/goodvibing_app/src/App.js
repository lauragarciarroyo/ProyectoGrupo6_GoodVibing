import logo from "./goodvibing_logo_ps02.png";
//import Register from "./Register";
//import "./App.css";
//import ErrorBoundary from "./ErrorBoundary";

import Profile from "./Profile";
import Stories from "./Stories";
import Message from "./Message";
import { Switch, Route } from "react-router-dom";
import Menu from "./Menu";

function App() {
  return (
    <div className="App">
      <Menu />
      <main>
        <Switch>
          <Route path="/profile" exact>
            <Profile />
          </Route>
          <Route path="/stories" exact>
            <Stories />
          </Route>
          <Route path="/message" exact>
            <Message />
          </Route>
        </Switch>
      </main>
      <p>Bienvenido</p>
    </div>
  );
}

export default App;
