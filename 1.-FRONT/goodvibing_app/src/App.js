import logo from "./goodvibing_logo_ps02.png";
import "./App.css";

function App() {
  return (
    <div className="App">
      <main>
        <Switch>
          <Route path="/home1" exact>
            <Home1 />
          </Route>
          <Route path="/home2" exact>
            <Home2 />
          </Route>
          <Route path="/search" exact>
            <Search />
          </Route>
          <Route path="/registrologin" exact>
            <Registrologin />
          </Route>
          <Route path="/contact" exact>
            <Contact />
          </Route>
          <Route path="/profile" exact>
            <Profile />
          </Route>
          <Route path="/createstory">
            <Createstory />
          </Route>
          <Route path="story" exact>
            <Story />
          </Route>
          <Route path="/user" exact>
            <User />
          </Route>
          <Route path="/mystories" exact>
            <Mystories />
            <Route />
          </Route>
          <Route path="/">Not Found</Route>
        </Switch>
      </main>
    </div>
  );
}

export default App;
