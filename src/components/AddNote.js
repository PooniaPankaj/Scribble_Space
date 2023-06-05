import React, { useContext, useState, useEffect } from 'react'
import noteContext from '../context/Notes/NoteContext'
import { Link, useNavigate } from 'react-router-dom';

const AddNote = (props) => {
    const context = useContext(noteContext);
    // destructuring 
    const navigate = useNavigate();
    const addNotes = context.addNote;
    const [Note, setNote] = useState({ title: "", description: "", tag: "" })
    const handleClick = (e) => {
        e.preventDefault();
        addNotes(Note.title, Note.description, Note.tag);
        props.showAlert("Note added successfully", "success")
        setNote({ title: "", description: "", tag: "" })
    }
    const onchange = (e) => {
        // we basically take values from input fields and place or overwrite them in Note
        // console.log(e.target.value,e.target.name);
        setNote({ ...Note, [e.target.name]: e.target.value })
    }
    useEffect(() => {
        if (localStorage.getItem('token')==null){
            navigate('/login');
        }

      }, [])

    return (



        <div className=' d-flex  w-50  justify-content-between notes_page_cont '>

            <div className="  w-100 h-100 d-flex flex-column notes_page_content">
                <div className="container w-50 ">
                    <h1 className='heading text_mod'><i className="fa-solid fa-newspaper"></i>Scribble Space</h1>
                    <div className='container d-flex justify-content-center'>
                        <span className="text first-text">
                            Add
                        </span>
                        <span className="text second-text-2 ">
                            Your Notes !
                        </span>
                    </div>
                    <div className="notes_content">
                        {/* Please enter your email address and password to proceed. */}
                        <form className='form_of_notes' >
                            <div className="form-group my-4">
                                <label htmlFor="title">Title</label>
                                <input type="text" className="form-control" id="title" name='title' aria-describedby="emailHelp" placeholder="Enter Title" onChange={onchange} value={Note.title}/>

                            </div>
                            <div className="form-group">
                                <label htmlFor="description">Description</label>
                                <textarea type="text" className="form-control" id="description" name='description' placeholder="Enter Description" onChange={onchange}  value={Note.description} rows={3}/>
                            </div>
                            <label htmlFor="tag" className='mt-5'>Tag</label>
                            <div className="form-check mt-2">
                                <input className="form-check-input" type="radio" name="tag" id="tag" value="general" checked={Note.tag === "general" ? true : false} onChange={onchange} />
                                <label className="form-check-label" htmlFor="flexRadioDefault1">
                                    General
                                </label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="radio" name="tag" id="tag" value="home" checked={Note.tag === "home" ? true : false} onChange={onchange} />
                                <label className="form-check-label" htmlFor="flexRadioDefault2">
                                    Home
                                </label>
                            </div>
                            <div className="form-check mb-4">
                                <input className="form-check-input" type="radio" name="tag" id="tag" value="others" checked={Note.tag === "others" ? true : false} onChange={onchange} />
                                <label className="form-check-label" htmlFor="flexRadioDefault2">
                                    Others
                                </label>
                            </div>
                            <button type="submit" className="submit-btn btn btn-secondary w-100 my-4" disabled={Note.title.length<5 || Note.description.length<5} onClick={handleClick}>ADD NOTE </button>


                            {/* <Link type="button" className="btn btn-secondary w-100 my-4" to='/signup'>Sign-Up </Link> */}

                        </form>
                    </div>

                </div>



            </div>

        </div>




    )
}

export default AddNote


// <div className='w-50 h-100 my-5  border border-light rounded  inner_color' >




{/* <h3 className='d-flex justify-content-center border-bottom w-100'>Add Notes</h3>
                <form className='my-4 p-4'>
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
{/* <div className="form-check ">
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
                    <div className="form-check mb-4">
                        <input className="form-check-input" type="radio" name="tag" id="tag" value="others" checked={Note.tag==="others"?true:false} onChange={onchange} />
                            <label className="form-check-label" htmlFor="flexRadioDefault2">
                                Others
                            </label>
                    </div>
                    
                    <button type="submit" disabled={Note.title.length<5 || Note.description.length<5} className="btn btn-primary" onClick={handleClick}>Add Note</button>
                </form> 
            </div> */}
            // </div>