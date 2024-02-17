import React, { useContext, useState } from "react";
import noteContext from "../context/notes/noteContext";
import cloudImage from "./cloud-file.gif";
const AddNote = (props) => {
  const context = useContext(noteContext);
  const { addNote } = context;

  const [note, setNote] = useState({ title: "", description: "", tag: "" });

  const handleAddNote = (e) => {
    e.preventDefault();
    addNote(note.title, note.description, note.tag);
    setNote({ title: "", description: "", tag: "" });
    props.showAlert("Added Successfully." , "warning")
  };

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <>
      <div className="container">
        <h3>Add a Note</h3>
        <div className="row">
          <div className="col-md-8 mb-3">
            <form>
              <div className="mb-3">
                <label htmlFor="title" className="form-label">
                  Title
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  name="title"
                  onChange={onChange}
                  value={note.title}
                  minLength={5}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="description" className="form-label">
                  Description
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="description"
                  name="description"
                  onChange={onChange}
                  value={note.description}
                  minLength={5}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="tag" className="form-label">
                  Tag
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="tag"
                  name="tag"
                  onChange={onChange}
                  value={note.tag}
                  required
                />
              </div>
              <button
                disabled= {note.title.length<5 ||note.description.length<5 ||note.tag.length === 0 }
                type="submit"
                className="btn btn-success text-light px-4"
                onClick={handleAddNote}
              >
                Add Note <i className="fa-solid fa-terminal fa-fade mx-2" style={{color: "#b3fff6"}}></i>
              </button>
            </form>
          </div>
          <div className="col-md-4 text-center " >
            <img src={cloudImage} className="ms-5" alt=".." style={{width:'70%' , height : '90%'}}/>
          </div>
        </div>
      </div>
      <hr />
    </>
  );
};

export default AddNote;
