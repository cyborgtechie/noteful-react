import React, { Component } from "react";
import { Route, Link } from "react-router-dom";
import dummyStore from "./dummy-store";
import "./App.css";
import NoteList from "./NoteList/NoteList";
import AddFolder from "./AddFolder/AddFolder";
import Note from "./Note/Note";
import AddNoteForm from "./AddNoteForm/AddNoteForm";
import * as uuid from "uuid";
import MainNav from "./MainNav/MainNav";

class App extends Component {
  state = {
    notes: this.props.notes,
    folders: this.props.folders
  };

  addNote = (e, routerProps) => {
    e.preventDefault();
    const { noteName, noteContent } = e.target;
    const note = {
      name: noteName.value,
      content: noteContent.value,
      id: uuid()
    };
    this.setState({
      notes: this.state.notes.concat(note)
    });
    routerProps.history.push("/");
  };
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1></h1>
        </header>
        <aside>
          <Route
            path="/"
            render={renderProps => <MainNav folders={this.state.folders} />}
          />
        </aside>
        <main>
          <Route
            exact
            path="/"
            render={renderProps => (
              <NoteList folders={this.state.folders} notes={this.state.notes} />
            )}
          />
          <Route path="/addfolder/" component={AddFolder} />
          <Route
            path="/folder/:folderid"
            render={renderProps => (
              <NoteList
                folders={this.state.folders}
                notes={this.state.notes.filter(
                  note => note.folderId == renderProps.match.params.folderid
                )}
              />
            )}
          />
          <Route
            path="/note/:noteid"
            render={renderProps => (
              <Note
                folders={this.state.folders}
                note={this.state.notes.find(
                  note => note.id == renderProps.match.params.noteid
                )}
              />
            )}
          />
          <Route
            path="/addnote/"
            render={renderProps => (
              <AddNoteForm addNote={this.addNote} renderProps={renderProps} />
            )}
          ></Route>
        </main>
      </div>
    );
  }
}

export default App;
