import React from "react";
import { Link } from "react-router-dom";

function NotefulHeader() {
  return (
    <header className="App__header">
      <h1>
        <Link to="/">Noteful</Link>
      </h1>
    </header>
  );
}

export default NotefulHeader;
