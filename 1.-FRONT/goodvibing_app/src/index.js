import React from "react";
import ReactDOM from "react-dom";
import thunk from "redux-thunk";
import "./index.css";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Provider>
        <App />
      </Provider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
