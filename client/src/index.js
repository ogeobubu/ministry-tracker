import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import AppProvider from "./redux/store";
import { BrowserRouter as Router } from "react-router-dom";

ReactDOM.render(
  <Router>
    <AppProvider>
      <App />
    </AppProvider>
  </Router>,
  document.getElementById("root")
);
