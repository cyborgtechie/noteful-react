import React, { Component } from "react";
import APIContext from "../APIContext";
import "./AddNote.css";
import config from "../config";
import AddNoteForm from "../AddNoteForm/AddNoteForm";
import ValidationError from "../ValidationError";
export default class AddNote extends Component {
  static defaultProps = {
    history: {
      push: () => {},
    },
  };
  static contextType = APIContext;

  state = {
    name: {
      touched: false,
      value: "",
    },
    folderId: {
      touched: false,
      value: "",
    },
    content: {
      touched: false,
      value: "",
    },
  };

  addNewNote = (note) => {
    note.modified = new Date(note.modified);

    fetch(`${config.API_Endpoint}notes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(note),
    })
      .then((res) => {
        return res.json();
      })
      .then((resJSON) => this.context.handleAddNote(resJSON))
      .catch((err) => alert(err));
  };

  handleFormSubmit = (e) => {
    e.preventDefault(e);
    if (this.validateName()) {
      this.setState({
        name: { touched: true },
      });
      return;
    }
    if (this.validateContent()) {
      this.setState({
        content: { touched: true },
      });
      return;
    }
    const newNote = {
      name: e.target.name.value,
      content: e.target.content.value,
      folderId: e.target.folders.value,
      modified: new Date(),
    };
    console.log(newNote);
    this.addNewNote(newNote);
    this.props.history.push("/");
  };

  //note updates
  updateNoteName(name) {
    this.setState({ name: { value: name, touched: true } });
  }

  updateNoteContent(content) {
    this.setState({ content: { value: content, touched: true } });
  }

  updateNoteFolder(folderId) {
    this.setState({ folderId: { value: folderId, touched: true } });
  }
  parseFolders = () => {
    return this.context.folders.map((folder) => (
      <option
        key={folder.id}
        name={folder.id}
        value={folder.id}
        onChange={(e) => this.updateNoteFolder}
      >
        {folder.name}
      </option>
    ));
  };
  //validations
  validateName = () => {
    if (!this.state.name.value) {
      return "Note title is required";
    }
  };

  validateContent = () => {
    if (!this.state.content.value) {
      return "Note description is required";
    }
  };

  validateFolderName() {
    if (!this.state.folderId.value.trim()) {
      return "Please select an existing folder.";
    }
  }

  render() {
    return (
      <>
        <h2 className="addNote__header">Add a Note</h2>
        <AddNoteForm
          className="addNote__form"
          onSubmit={(e) => this.handleFormSubmit(e)}
        >
          <label htmlFor="name">
            Name:
            {this.state.name.touched && <ValidationError message={this.validateName()}/>}
          </label>
          <input
            type="text"
            name="name"
            id="name"
            aria-required="true"
            aria-label="Name"
            placeholder="Note Name"
            onChange={(e) => this.updateNoteName(e.target.value)}
          />

          <label htmlFor="content">
            Description:
            {this.state.content.touched && <ValidationError message={this.validateContent()}/>}
          </label>
          <input
            type="text"
            name="content"
            id="content"
            aria-required="true"
            aria-label="Description"
            placeholder="Write note here."
            onChange={(e) => this.updateNoteContent(e.target.value)}
          />

          <label htmlFor="folders">
            Select a folder:
           {this.state.folderId.touched && <ValidationError message={this.validateFolderName()} />}
          </label>
          <select
            name="folders"
            id="folders"
            aria-required="true"
            aria-label="Select a folder"
          >
            {this.parseFolders()}
          </select>

          <button className="submit__btn" type="submit">
            Add
          </button>
        </AddNoteForm>
      </>
    );
  }
}
