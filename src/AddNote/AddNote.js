import React from "react";
import AddNoteForm from "../AddNoteForm/AddNoteForm";

class AddNote extends React.Component {
  static defaultProps = {
    folders: []
  };
  render() {
    <section className="AddNote">
     
        <input type="text" id="noteName"></input>
        <div>
            <input type="text" id="noteContent"></input>
        </div>
     
    </section>;
  }
}

export default AddNote;
