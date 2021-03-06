import React, { Component } from "react";
import APIContext from "../APIContext";
import { findNote, findFolder } from "../notes-helpers";
import "./NotePageNav.css";
import PropTypes from "prop-types";

class NotePageNav extends Component {
  static defaultProps = {
    history: {
      goBack: () => {},
    },
    match: {
      params: {},
    },
  };

  static contextType = APIContext;

  render() {
    const { notes, folders } = this.context;
    const { noteId } = this.props.match.params;
    const note = findNote(notes, noteId) || {};
    const folder = findFolder(folders, note.folderId);
    return (
      <div className="NotePageNav">
        <button
          type="button"
          role="link"
          className="NotePageNav__back-btn"
          value={`${folder ? folder.name : "Go Back"} `}
          onClick={() => this.props.history.goBack()}
        >
          {"Go back"}
        </button>
      </div>
    );
  }
}
export default NotePageNav;
NotePageNav.propTypes = {
  history: PropTypes.object,
  match: PropTypes.object,
};
