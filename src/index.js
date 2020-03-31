import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./app/App";
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import "./assets/styles/main.scss";
import "./assets/styles/components/index.css"

ReactDOM.render(<App/>, document.getElementById("root"));
serviceWorker.register();