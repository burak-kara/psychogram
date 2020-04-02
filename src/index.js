import React from "react";
import ReactDOM from "react-dom";
import App from "./app/App";
import * as serviceWorker from './serviceWorker';
import "./index.css";
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import "./assets/styles/main.scss";

ReactDOM.render(<App/>, document.getElementById("root"));
serviceWorker.register();