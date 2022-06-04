import { useState, useEffect } from "react";
import axios from "axios";
import Note from "./components/Note";
import noteService from "./services/notes";
import ErrorMessage from "./components/error";
import Footer from "./components/Footer";

const App = () => {
  const [note, setNote] = useState([]);
  const [newNote, setNewNote] = useState("");
  const [showAll, setShowAll] = useState(true);
  const [eMessage, setEMessage] = useState(null);

  console.log("render", note.length, "notes");

  const showHandler = () => {
    setShowAll(!showAll);
  };

  useEffect(() => {
    noteService.getAll().then((initialNotes) => {
      setNote(initialNotes);
    });
  }, []);
  const submitHandler = (event) => {
    event.preventDefault();
    const obj = {
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random() < 0.5,
    };
    if (newNote.trim().length === 0) {
      return;
    }
    noteService.create(obj).then((returnedNote) => {
      setNote(note.concat(returnedNote));
      setNewNote("");
    });
  };

  const toggleImportance = (id) => {
    const snote = note.find((n) => n.id === id);
    console.log(snote);
    const changedNote = { ...snote, important: !snote.important };
    noteService
      .update(changedNote, id)
      .then((returnedNote) => {
        console.log(returnedNote);
        setNote(note.map((n) => (n.id !== id ? n : returnedNote)));
      })
      .catch((error) => {
        setEMessage(`Note '${snote.content}' was already removed from server`);
        setTimeout(() => setEMessage(null), 5000);
        setNote(note.filter((n) => id !== n.id));
      });
  };

  const inputHandler = (event) => {
    setNewNote(event.target.value);
  };

  const noteToShow = showAll ? note : note.filter((note) => note.important);
  return (
    <div>
      <h1>Notes</h1>
      <ErrorMessage message={eMessage} />
      <ul>
        {noteToShow.map((note) => (
          <Note
            key={note.id}
            content={note.content}
            click={() => toggleImportance(note.id)}
            label={note.important}
          />
        ))}
      </ul>
      <form onSubmit={submitHandler}>
        <input value={newNote} onChange={inputHandler} />
        <button type="submit">Add to Note</button>
      </form>
      <button onClick={showHandler}>
        {showAll ? "show important" : "show all"}
      </button>
      <Footer />
    </div>
  );
};

export default App;
