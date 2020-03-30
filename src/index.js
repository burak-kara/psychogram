import React from "react";
import ReactDOM from "react-dom";
import Main from "./commons/home/Main";
import "./index.css";
import 'bootstrap/dist/css/bootstrap.css';
global.jQuery = require('jquery');
require('bootstrap');


ReactDOM.render(
    <Main/>,
    document.getElementById("root")
);