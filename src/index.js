import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Main from "./pages/home/Main";
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import "./assets/styles/main.scss";

ReactDOM.render(<Main/>, document.getElementById("root"));
serviceWorker.register();