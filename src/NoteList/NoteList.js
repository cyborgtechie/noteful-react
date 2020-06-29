import React from "react";
import { Link } from "react-router-dom";

class NoteList extends React.Component {
  render() {
    return (
      <section className="Note-Main">
        <ul>
          {this.props.notes.map(note => (
            <li>
              <Link to={"/note/" + note.id}>{note.name}</Link>
            </li>

          ))}
        </ul>
        <div className="noteFormSection">
          <Link to={'/addnote'}>Add Note</Link>
        </div>
      </section>
    );
  }
}

export default NoteList;
