import React from "react";
import "./App.css";
import Profile from "./Profile";
import Message from "./Message";
import { Switch, Route, Redirect } from "react-router-dom";
import Nav from "./Nav";
import Home from "./Home";
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
import ViewStories from "./ViewStories";
import MyComments from "./MyComments";
import Userinfo from "./Userinfo";
import CreateVote from "./CreateVote";
import "fontsource-roboto";
import Register from "./Register";
import Login from "./Login";
import Footer from "./Footer";
import Header from "./Header";
import Main from "./Main";
import DeleteComment from "./DeleteComment";

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
      <Nav />
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
          <Route path="/login" exact>
            <Login />
          </Route>
          <Route path="/register" exact>
            <Register />
          </Route>
          <Route path="/profile" exact>
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          </Route>
          <Route path="/contact" exact>
            <Contact />
          </Route>
          <Route path="/createstory" exact>
            <PrivateRoute>
              <CreateStory />
            </PrivateRoute>
          </Route>
          <Route path="/deleteuser" exact>
            <PrivateRoute>
              <DeleteUser />
            </PrivateRoute>
          </Route>
          <Route path="/changepassword" exact>
            <Changepassword />
          </Route>
          <Route path="/viewstories/:id" exact>
            <ViewStories />
          </Route>
          <Route path="/randomstories/" exact>
            <RandomStories />
          </Route>
          <Route path="/mystory/:id" exact>
            <PrivateRoute>
              <MyStory />
            </PrivateRoute>
          </Route>
          <Route path="/editstory/:id" exact>
            <PrivateRoute>
              <EditStory />
            </PrivateRoute>
          </Route>
          <Route path="/deletestory/:id" exact>
            <PrivateRoute>
              <DeleteStory />
            </PrivateRoute>
          </Route>
          <Route path="/createcomment" exact>
            <CreateComment />
          </Route>
          <Route path="/story/:id" exact>
            <ViewStory />
          </Route>
          <Route path="/mycomments" exact>
            <MyComments />
          </Route>
          <Route path="/userinfo/:id" exact>
            <Userinfo />
          </Route>
          <Route path="/createvote" exact>
            <CreateVote />
          </Route>
          <Route path="/deletecomment/:id" exact>
            <DeleteComment />
          </Route>
          <Route path="/footer" exact>
            <Footer />
          </Route>
          <Route path="/header" exact>
            <Header />
          </Route>
          <Route path="/main" exact>
            <Main />
          </Route>
          <Route path="*">
            <h1>404 - Ruta no encontrada</h1>
          </Route>
        </Switch>
      </main>
    </div>
  );
}

export default App;
