import React,{useContext } from 'react'
import noteContext from '../context/Notes/NoteContext'


const NoteItem = (props) => {
  const context = useContext(noteContext);
    // destructuring 
    const deleteNote = context.deleteNote;
    const updateNote = props.updateNote;

  const {note} = props;
  return (
    <div className='col-md-6 my-4'>
      <div className="card " >
        <div className="card-body">
          <div class="d-flex justify-content-between">
          <h5 className="card-title">{note.title}</h5>
            <button type="button" className={`btn btn-outline-primary ${note.tag === 'general'?"d":"d-none"}`} disabled >{note.tag}</button>
            <button type="button" className={`btn btn-outline-warning ${note.tag === 'home'?"d":"d-none"}`} disabled >{note.tag}</button>
            <button type="button" className={`btn btn-outline-success ${note.tag === 'others'?"d":"d-none"}`} disabled >{note.tag}</button>
            
            

          </div>
          
          
          <p className="card-text">{note.description}</p>
          <div className="d-flex justify-content-around">
            {/* using arrow function because we need to pass the arguments here to update note function */}
          <i className="fa-solid fa-pen-to-square " onClick={()=>{updateNote(note)}}></i>
          {/* <i className="fa-solid fa-trash-can" ></i> */}
          <i className="fa-solid fa-trash-can" onClick={()=>{(deleteNote(note._id));props.showAlert("Note deleted succesfully","success")}} style={{ color: 'red' }}></i>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NoteItem
