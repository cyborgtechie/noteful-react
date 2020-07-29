import React, { Component } from "react";
import { Route } from "react-router-dom";
import "./App.css";
import NotefulHeader from "./NotefulHeader/NotefulHeader";
import APIContext from "./APIContext";
import NoteList from "./NoteList/NoteList";
import NotePageMain from "./NotePageMain/NotePageMain";
import NotePageNav from "./NotePageNav/NotePageNav";
import NoteListMain from "./NoteListMain/NoteListMain";
import AddFolder from "./AddFolder/AddFolder";
import AddNote from "./AddNote/AddNote";
import NotefulError from "./NotefulError/NotefulError";
import config from "./config";

class App extends Component {
  state = {
    notes: [],
    folders: [],
  };

  componentDidMount() {
    Promise.all([
      fetch(`${config.API_Endpoint}notes`),
      fetch(`${config.API_Endpoint}folders`),
    ])
      .then(([notesRes, foldersRes]) => {
        if (!notesRes.ok) return notesRes.json().then((e) => Promise.reject(e));
        if (!foldersRes.ok)
          return foldersRes.json().then((e) => Promise.reject(e));

        return Promise.all([notesRes.json(), foldersRes.json()]);
      })
      .then(([notes, folders]) => {
        this.setState({ notes, folders });
      })
      .catch((error) => {
        console.error({ error });
      });
  }

  handleDeleteNote = (noteId) => {
    fetch(`http://localhost:9090/notes/${noteId}`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
      },
    }).then(() => {
      this.componentDidMount();
    });
  };
  handleAddNote = (addedNote) => {
    this.setState({
      notes: [...this.state.notes, addedNote],
    });
  };
  handleAddFolder = (newFolder) => {
    this.setState((prevState) => {
      return { folders: [...prevState.folders, newFolder] };
    });
  };

  renderNavRoutes() {
    return (
      <>
        {["/", "/folder/:folderId"].map((path) => (
          <Route exact key={path} path={path} component={NoteList} />
        ))}
        <Route path="/note/:noteId" component={NotePageNav} />
        <Route path="/add-folder" component={NotePageNav} />
        <Route path="/add-note" component={NotePageNav} />
      </>
    );
  }

  renderMainRoutes() {
    return (
      <>
        {["/", "/folder/:folderId"].map((path) => (
          <Route exact key={path} path={path} component={NoteListMain} />
        ))}
        <Route path="/note/:noteId" component={NotePageMain} />
        <Route path="/add-folder" component={AddFolder} />
        <Route path="/add-note" component={AddNote} />
      </>
    );
  }

  render() {
    const value = {
      notes: this.state.notes,
      folders: this.state.folders,
      deleteNote: this.handleDeleteNote,
      addFolder: this.handleAddFolder,
      handleAddNote: this.handleAddNote,
    };

    return (
      <APIContext.Provider value={value}>
        <div className="App">
          <NotefulError>
            <nav className="App__nav">{this.renderNavRoutes()}</nav>
            <NotefulHeader />
            <main className="App__main">{this.renderMainRoutes()}</main>
          </NotefulError>
        </div>
      </APIContext.Provider>
    );
  }
}

export default App;
