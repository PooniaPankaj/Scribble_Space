import React,{useContext} from 'react'
import noteContext from '../context/Notes/NoteContext'
import NoteItem from './NoteItem';

const MyNotes = () => {
    const context = useContext(noteContext);
    // destructuring 
    const notes = context.intialnotes; 
    const setNotes = context.setNotes;
    console.log(context);
  return (
    <div className='container my-4 w-50 border border-dark rounded p-4'>

      <h3 className='d-flex justify-content-center border-bottom w-100'>Your Notes</h3>
      <div className='row'>
        {notes.map((note)=>{
            return <NoteItem note={note}/>
        })}
        </div>
      
    </div>
  )
}

export default MyNotes
