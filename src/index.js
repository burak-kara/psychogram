import React from "react";
import ReactDOM from "react-dom";
import App from "./app/App";
import * as serviceWorker from './serviceWorker';
import "./index.css";
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import "./assets/styles/main.scss";
import "./assets/styles/components/main.css"

ReactDOM.render(<App/>, document.getElementById("root"));
serviceWorker.register();