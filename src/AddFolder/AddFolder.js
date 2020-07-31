import React, { Component } from "react";
import config from "../config";
import "./AddFolder.css";
import APIContext from "../APIContext";
import PropTypes from "prop-types";
import AddNoteForm from "../AddNoteForm/AddNoteForm";
import ValidationError from "../ValidationError";

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
      .then((data) => this.context.addFolder(data))
      .catch((err) => alert(err));
  };

  handleSubmit(e) {
    e.preventDefault();
    const newFolder = e.target.newFolder.value;
    this.addFolder(newFolder);
    this.props.history.goBack();
  }

  updateFolderName = (e) => {
    const newName = e.target.value;
    this.setState({
      newFolder: {
        hasError: false,
        touched: true,
        name: newName,
      },
    });
  };

  validateFolderName() {
    const name = this.state.newFolder.name.trim();
    if (name.length === 0) {
      return "Folder name is required";
    } else if (name.length < 3) {
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
            {this.state.newFolder.touched && <ValidationError message= {this.validateFolderName()}/>}
          </label>
      
          <input
            type="text"
            name="newFolder"
            id="newFolder"
            aria-required="true"
            aria-label="Name"
            defaultValue="folder name"
            onChange={(e) => this.updateFolderName(e)}
          />
          <button className="submit__btn" type="submit" disabled={this.validateFolderName()}>
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
