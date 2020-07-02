import React from "react";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import "./Note.css";
import APIContext from "../APIContext";

class Note extends React.Component {
  static contextType = APIContext;

  render() {
    return (
      <div className="Note">
        <h2 className="title">
          <Link to={`/note/${this.props.note.id}`}>{this.props.note.name}</Link>
        </h2>
        <div className="note-content">{this.props.note.content}</div>
        <button
          className="Note__delete"
          type="button"
          onClick={e => this.context.deleteNote(this.props.note.id)}
        >
          {" "}
          Delete Note
        </button>
        <div className="Note__dates">
          <div className="Note__dates-modified">
            Date modified{" "}
            <span className="Date">
              {this.props.note.modified
                ? format(new Date(this.props.note.modified), "Do MM yyyy")
                : ""}
            </span>
          </div>
        </div>
      </div>
    );
  }
}

export default Note;
Note.defaultProps = {
  note: {}
};
