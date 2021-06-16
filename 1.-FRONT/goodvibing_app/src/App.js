//import logo from "./goodvibing_logo_ps02.png";
import "./App.css";
import Profile from "./Profile";
import Message from "./Message";
import { Switch, Route, Redirect } from "react-router-dom";
import Menu from "./Menu";
import Home from "./Home";
import LoginRegister from "./Loginregister";
import Contact from "./Contact";
import CreateStory from "./CreateStory";
import MyStories from "./MyStories";
import DeleteUser from "./Deteleuser";
import Changepassword from "./ChangePassword";
import RandomStories from "./RandomStories";
import MyStory from "./MyStory";
import EditStory from "./EditStory";
import DeleteStory from "./DeleteStory";
import CreateComment from "./CreateComment";
import ErrorMesage from "./components/ErrorMesage";
import ViewStory from "./ViewStory";
import { useDispatch, useSelector } from "react-redux";

const PrivateRoute = ({ children }) => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  if (!user) {
    dispatch({ type: "SET_ERROR", message: "Esta página es privada" });
    return <Redirect to="/" />;
  } else {
    return children;
  }
};

function App() {
  return (
    <div className="App">
      <ErrorMesage />
      <Menu />
      <main>
        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>
          <Route path="/mystories" exact>
            <PrivateRoute>
              <MyStories />
            </PrivateRoute>
          </Route>
          <Route path="/message" exact>
            <PrivateRoute>
              <Message />
            </PrivateRoute>
          </Route>
          <Route path="/loginregister" exact>
            <LoginRegister />
          </Route>
          <Route path="/profile" exact>
            <Profile />
          </Route>
          <Route path="/contact" exact>
            <Contact />
          </Route>
          <Route path="/createstory" exact>
            <CreateStory />
          </Route>
          <Route path="/celeteuser" exact>
            <DeleteUser />
          </Route>
          <Route path="/changepassword" exact>
            <Changepassword />
          </Route>
          <Route path="/createstory" exact>
            <CreateStory />
          </Route>
          <Route path="/randomstories" exact>
            <RandomStories />
          </Route>
          <Route path="/mystory" exact>
            <MyStory />
          </Route>
          <Route path="/editstory" exact>
            <EditStory />
          </Route>
          <Route path="/deletestory" exact>
            <DeleteStory />
          </Route>
          <Route path="/createcomment" exact>
            <CreateComment />
          </Route>
          <Route path="/story/:id" exact>
            <PrivateRoute>
              <ViewStory />
            </PrivateRoute>
          </Route>
        </Switch>
      </main>
    </div>
  );
}

export default App;
