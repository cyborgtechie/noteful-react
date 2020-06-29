import React from "react";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import "./Note.css";

export default function Note(props) {
  console.log(props);
  return (
    <div className="Note">
      <h2 className="title">
        <Link to={`/note/${props.note.id}`}>{props.note.name}</Link>
      </h2>
  <div className="note-content">{props.note.content}</div>
      <button className="Note__delete" type="button">
        {" "}
        Delete Note
      </button>
      <div className="Note__dates">
        <div className="Note__dates-modified">
          Date modified{" "}
          <span className="Date">
            
            {props.note.modified
              ? format(new Date(props.note.modified), "Do MM yyyy")
              : ""}
          </span>
        </div>
      </div>
    </div>
  );
}

Note.defaultProps = {
  note: {}
};
