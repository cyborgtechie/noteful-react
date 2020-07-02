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
import { type } from "os";
import APIContext from "./APIContext";

class App extends Component {
  state = {
    notes: [],
    folders: []
  };

  componentDidMount() {
    Promise.all([
      fetch(`http://localhost:9090/folders`),
      fetch(`http://localhost:9090/notes`)
    ])
      .then(responses => {
        return Promise.all([responses[0].json(), responses[1].json()]);
      })
      .then(data => {
        this.setState({
          notes: data[1],
          folders: data[0]
        });
      });
  }

  handleDeleteNote = noteId => {
    fetch(`http://localhost:9090/notes/${noteId}`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json"
      }
    }).then(() => {
      this.componentDidMount();
    });
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
    const value = {
      notes: this.state.notes,
      folders: this.state.folders,
      deleteNote: this.handleDeleteNote
    };
    return (
      <APIContext.Provider value={value}>
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
                <NoteList
                  folders={this.state.folders}
                  notes={this.state.notes}
                />
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
      </APIContext.Provider>
    );
  }
}

export default App;
