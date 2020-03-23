import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./app/App";
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import "./assets/styles/pages/profile/Profile.css";

ReactDOM.render(<App/>, document.getElementById("root"));
serviceWorker.register();