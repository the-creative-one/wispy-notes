import React,{useContext} from 'react';
import noteContext from "../context/notes/noteContext";


const Noteitem = (props) => {
    const context = useContext (noteContext);
    const { deleteNote } = context;
  const { note ,updateNote } = props;
  return (
    <div className="col-md-4">
      <div className="card border-info my-3">
        <div className="card-header text-success bg-transparent mt-2 d-flex ">
          <h5 className="card-title">{note.title}</h5>
          <i
            className="fa-solid fa-file-pen fa-xl ms-auto py-2 mt-1" title="Edit Your Note📝"
            style={{ color: "#84c0f5" }} onClick={()=>{updateNote(note)}}
           
          ></i>
          <i
            className="fa-solid fa-trash fa-xl mx-3 py-2 mt-1" title="Delete Note ❌"
            style={{ color: "#ff5c5c" }}
            onClick={()=>{deleteNote(note._id);
              props.showAlert("Deleted Successfully." , "warning");
            }}
          ></i>
        </div>
        <div className="card-body text-secondary">
          <p className="card-text">{note.description}</p>
        </div>
      </div>
    </div>
  );
};

export default Noteitem;
