import React from "react";

function AddNoteForm(props) {
  return (
    <section className="AddNote">
      <form onSubmit={e => props.addNote(e, props.renderProps)}>
        <input type="text" id="noteName" name="noteName"></input>
        <div>
          <input type="text" id="noteContent" name="noteContent"></input>
        </div>
        <button>Add Note</button>
      </form>
    </section>
  );
}

export default AddNoteForm;
