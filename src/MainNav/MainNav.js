import React from "react";
import { Link } from "react-router-dom";

function MainNav(props) {
  return (
    <ul>
      {props.folders.map(folder => (
        <Link to={"/folder/" + folder.id}>
          <li>{folder.name}</li>
        </Link>
      ))}
    </ul>
  );
}

export default MainNav;
