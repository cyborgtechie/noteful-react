import React from "react";
import { Link } from "react-router-dom";
import "./Note.css";
import APIContext from "../APIContext";
import config from "../config";
import PropTypes from "prop-types";

class Note extends React.Component {
  static contextType = APIContext;

  handleClickDelete = (e) => {
    e.preventDefault();
    const noteId = this.props.id;

    fetch(`${config.API_Endpoint}notes/${noteId}`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
      },
    })
      .then(async (res) => {
        if (!res.ok) {
          const e = await res.json();
          return await Promise.reject(e);
        }
        return res.json();
      })
      .then(() => {
        console.log("note deleted");
        this.context.deleteNote(noteId);
      })
      .catch((err) => {
        console.log({ err });
      });
  };

  render() {
    const { name, id, modified } = this.props;
    return (
      <div className="Note">
        <h2 className="Note__name">
          <Link to={`/note/${id}`}>{name}</Link>
        </h2>
        <button
          className="Note__delete-btn"
          type="button"
          onClick={this.handleClickDelete}
        >
          Delete Note
        </button>
        <div className="Note__date">
          <div className="Note__date-modified">Modified {modified}</div>
        </div>
      </div>
    );
  }
}

Note.propTypes = {
  onDeleteNote: PropTypes.func,
  id: PropTypes.string,
  name: PropTypes.string,
  modified: PropTypes.string,
};

export default Note;
