import React, { useContext, useState,useEffect } from 'react'
import noteContext from '../context/Notes/NoteContext'
import { useNavigate } from 'react-router-dom';

const AddNote = (props) => {
    const context = useContext(noteContext);
    // destructuring 
    const navigate = useNavigate();
    const addNotes = context.addNote;
    const [Note, setNote] = useState({ title: "", description: "", tag: "" })
    const handleClick = (e) => {
        e.preventDefault();
        addNotes(Note.title, Note.description, Note.tag);
        props.showAlert("Note added successfully" ,"success")
        setNote({ title: "", description: "", tag: "" })
    }
    const onchange = (e) => {
        // we basically take values from input fields and place or overwrite them in Note
        // console.log(e.target.value,e.target.name);
        setNote({ ...Note, [e.target.name]: e.target.value })
    }
    // useEffect(() => {
    //     if (localStorage.getItem('token')==null){
    //         navigate('/login');
    //     }
        
    //   }, [])
     
    return (
        <div style={{margin: "100px 0px"}} >
            <div className='container  my-5 w-50 border border-dark rounded p-4'>

                <h3 className='d-flex justify-content-center border-bottom w-100'>Add Notes</h3>
                <form className='container my-4 p-4'>
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">Title</label>
                        <input type="text" className="form-control" id="title" name="title" aria-describedby="emailHelp" onChange={onchange} value={Note.title}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Description</label>
                        <input type="text" className="form-control" id="description" name="description" onChange={onchange}  value={Note.description}  />
                    </div>
                    {/* make a tag a MCQ type question  */}
                    {/* <div className="mb-3">
                        <label htmlFor="tag" className="form-label">Tag</label>
                        <input type="text" className="form-control" id="tag" name="tag"onChange={onchange} />
                    </div> */}
                    <div className="form-check">
                        <input className="form-check-input" type="radio" name="tag" id="tag" value="general" checked={Note.tag==="general"?true:false} onChange={onchange} />
                            <label className="form-check-label" htmlFor="flexRadioDefault1">
                                General
                            </label>
                    </div>
                    <div className="form-check">
                        <input className="form-check-input" type="radio" name="tag" id="tag" value="home" checked={Note.tag==="home"?true:false} onChange={onchange} />
                            <label className="form-check-label" htmlFor="flexRadioDefault2">
                                Home
                            </label>
                    </div>
                    <div className="form-check">
                        <input className="form-check-input" type="radio" name="tag" id="tag" value="others" checked={Note.tag==="others"?true:false} onChange={onchange} />
                            <label className="form-check-label" htmlFor="flexRadioDefault2">
                                Others
                            </label>
                    </div>
                    
                    <button type="submit" disabled={Note.title.length<5 || Note.description.length<5} className="btn btn-primary" onClick={handleClick}>Add Note</button>
                </form>
            </div>
        </div>
    )
}

export default AddNote