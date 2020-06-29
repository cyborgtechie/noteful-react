import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import dummyStore from "./dummy-store";

ReactDOM.render(
  <BrowserRouter>
    <App folders={dummyStore.folders} notes={dummyStore.notes} />
  </BrowserRouter>,
  document.getElementById("root")
);
