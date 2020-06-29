import React, { Component } from "react";
import Form from "../AddNoteForm/AddNoteForm";

export default class AddFolder extends Component {
  render() {
    return (
      <section className="AddFolder">
        <h2>Create a folder</h2>
        <Form>
          <div>
            <label htmlFor="folder-name">Name</label>
            <input type="text" id="folder-input" />
          </div>
          <div className="buttons">
            <button type="submit">Add folder</button>
          </div>
        </Form>
      </section>
    );
  }
}
