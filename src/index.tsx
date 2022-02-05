import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { domInit } from "./dom/init";
import { setScope } from "./dom/util";

domInit();

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("bullet-chat-everywhere")
);

setScope();
