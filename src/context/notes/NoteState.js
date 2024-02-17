import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  //   const s1 = {
  //     name: "shruti",
  //     class: "Bca6",
  //   };

  //   const [state, setState] = useState(s1);
  //   const update = () => {
  //     setTimeout(() => {
  //       setState({
  //         name: "Shruti",
  //         class: "BCA",
  //       });
  //     }, 1000);
  //   };

  // const host = "http://localhost:5000";
  const notesInitial = [];
const [notes, setNotes] = useState(notesInitial);

  
  console.log(notes);

  
  // Get a Note
  const getNote = async () => {
    // ApI cAll
    const response = await fetch(`http://localhost:5000/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token'),
      },
      body: JSON.stringify(),
    });
    const json = await response.json();
    setNotes(json);
  };
  

  // Add a Note
  const addNote = async (title, description, tag) => {
    // ApI cAll
    const response = await fetch(`http://localhost:5000/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token'),
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const note = await response.json();
    setNotes(notes.concat(note));
  };

  // Edit a Note
  const deleteNote = async (id) => {
    //  ApI cAll
    const response = await fetch(`http://localhost:5000/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token'),
      },
    });
    const json = response.json();
    console.log(json);

    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNotes);
  };

  // Delete a Note
  const editNote = async (id, title, description, tag) => {
    // API Call
    const response = await fetch(`http://localhost:5000/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token'),
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const json = response.json();
    console.log(json);
    
    // Update local data store with updated values
    let newNotes = await JSON.parse(JSON.stringify(notes));
    // Logic to edit in client
    for (let index = 0; index <  newNotes.length; index++) {
      const element =  newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
    }
    setNotes(newNotes);
  };
  return (
    <NoteContext.Provider
      value={{ notes, addNote, deleteNote, editNote, getNote }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
