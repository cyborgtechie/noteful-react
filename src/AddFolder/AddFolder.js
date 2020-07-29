import React, { Component } from "react";
import config from "../config";
import "./AddFolder.css";
import APIContext from "../APIContext";
import PropTypes from "prop-types";
import AddNoteForm from "../AddNoteForm/AddNoteForm";

class AddFolder extends Component {
  state = {
    newFolder: {
      hasError: false,
      touched: false,
      name: "",
    },
  };

  static contextType = APIContext;

  addFolder = (name) => {
    fetch(`${config.API_Endpoint}folders`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ name }),
    })
      .then((res) => res.json())
      .then((data) => this.context.addFolder(data));
  };

  handleSubmit(event) {
    event.preventDefault();
    const newFolder = event.target.newFolder.value;
    this.addFolder(newFolder);
    this.props.history.goBack();
  }

  updateFolderName = (event) => {
    const newName = event.target.value;
    this.setState({
      newFolder: {
        hasError: false,
        touched: true,
        name: newName,
      },
    });
  };

  validateFolderName() {
    if (this.state.newFolder.name.trim() === 0) {
      return "Folder name is required";
    } else if (this.state.newFolder.name.trim().length < 3) {
      return "Folder name must be at least 3 characters long";
    }
  }

  render() {
    return (
      <>
        <h2 className="AddFolder__header">Add New Folder</h2>
        <AddNoteForm
          className="AddFolder__form"
          onSubmit={(e) => this.handleSubmit(e)}
        >
          <label htmlFor="newFolder">
            Name:
            {this.state.newFolder.touched && <p>{this.validateFolderName()}</p>}
          </label>
          <input
            type="text"
            name="newFolder"
            id="newFolder"
            aria-required="true"
            aria-label="Name"
            onChange={(event) => this.updateFolderName(event)}
            placeholder="folder name"
          />
          <button className="submit__btn" type="submit">
            Add Folder
          </button>
        </AddNoteForm>
      </>
    );
  }
}

AddFolder.propTypes = {
  history: PropTypes.object,
};
export default AddFolder;
