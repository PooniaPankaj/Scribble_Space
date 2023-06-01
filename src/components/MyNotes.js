import React, { useState, useContext, useEffect, useRef } from 'react'
import noteContext from '../context/Notes/NoteContext'
import NoteItem from './NoteItem';
import AddNote from './AddNote'
import { useNavigate } from 'react-router-dom';

const MyNotes = (props) => {
  const navigate = useNavigate();
  const context = useContext(noteContext);
  // destructuring 
  const notes = context.Notes;
  // const setNotes = context.addNote;
  const getNotes = context.getNotes;
  const editNote = context.editNote;

  useEffect(() => {
    if (localStorage.getItem('token')){
      // console.log(localStorage.getItem('token'))
      getNotes(); 
    }
    else{
        navigate('/login');
    }
    
  }, [])
  var [note, setnote] = useState({ title: "", description: "", tag: "" });
  // using ref to reference the particular note or for using the update function functionality
  // on click it refer to the function to which we are refrencing to
  var notee = {
    title: "", description: "", tag: ""
  }
  const ref = useRef(null);
  const refclose = useRef(null);
  // useEffect(() => {
  //   setnote(currentNote)
  // }, [note])

  const updateNote = (currentNote) => {
    ref.current.click();
    // console.log(currentNote);
    note = currentNote
    notee = currentNote;
    // useEffect(() => {
    //   setnote(currentNote);
    // });


    // ( async()=>{
    //   setnote(currentNote);
    // })
    // setnote("hello"); 
    // setnote(currentNote);
    // setnote({id:currentNote._id,title:currentNote.title,description:currentNote.description,tag:currentNote.tag});
    // note = currentNote;

    // console.log(currentNote);
    // console.log(note);



    // setnote(currentNote);
    // setnote(note);
    // setnote({title:"hello"});
    // console.log(note);
    // console.log(note.description);
    // note.title = "hello";

  }



  const handleClick = (e) => {
    // e.preventDefault();
    editNote(note._id, note.title, note.description, note.tag);
    refclose.current.click();
    props.showAlert("Note edited successfully ","success")
    // addNotes(Note.title, Note.description, Note.tag);
  }
  const onchange = (e) => {
    // we basically take values from input fields and place or overwrite them in Note
    // console.log(e.target.value,e.target.name);
    setnote({ ...note, [e.target.name]: e.target.value })
  }

  return (
    <>


      {/* using ref hook for opening our modal  */}
      <button type="button" className="btn btn-primary d-none" data-bs-toggle="modal" ref={ref} data-bs-target="#exampleModal">
        Launch demo modal
      </button>
      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              {/*  adding form to modal */}
              <div className='container my-4 w-50 border border-dark rounded p-4'>

                <h3 className='d-flex justify-content-center border-bottom w-100'>Update Note</h3>
                <form className='container my-4 p-4'>
                  <div className="mb-3">
                    <label htmlFor="title" className="form-label" >Title</label>
                    <input type="text" className="form-control" value={note.title} minLength={5} required id="title" name="title" aria-describedby="emailHelp" onChange={onchange} />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="description" className="form-label" >Description</label>
                    <input type="text" className="form-control" value={note.description} minLength={5} required id="description" name="description" onChange={onchange} />
                  </div>

                  <div className="form-check">
                    <input className="form-check-input" type="radio" name="tag" id="tag" checked={note.tag==="general"?true:false} value="general" onChange={onchange} />
                    <label className="form-check-label" htmlFor="flexRadioDefault1">
                      General
                    </label>
                  </div>
                  <div className="form-check">
                    <input className="form-check-input" type="radio" name="tag" id="tag" checked={note.tag==="home"?true:false} value="home" onChange={onchange} />
                    <label className="form-check-label" htmlFor="flexRadioDefault2">
                      Home
                    </label>
                  </div>
                  <div className="form-check">
                    <input className="form-check-input" type="radio" name="tag" id="tag" value="Others" checked={note.tag==="others"?true:false} onChange={onchange} />
                    <label className="form-check-label" htmlFor="flexRadioDefault2">
                      Others
                    </label>
                  </div>
                </form>
              </div>
            </div>
            <div className="modal-footer">
              <button ref={refclose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary" disabled={note.title.length < 5 || note.description.length < 5} onClick={handleClick}>Update Note</button>
            </div>
          </div>
        </div>
      </div>


      <div className='container my-4 w-50 border border-dark rounded p-4'>

        <h3 className='d-flex justify-content-center border-bottom w-100'>Your Notes</h3>
        <div className='row'>
          {/* <h2>Your Notes</h2> */}
          <div className='fw-bold text-center text-info'>
            {notes.length === 0 && "No notes to display !"}
          </div>
          {notes.map((note) => {
            return <NoteItem key={note._id} updateNote={updateNote} note={note} showAlert={props.showAlert} />
          })}
        </div>

      </div>
    </>

  )
}

export default MyNotes
