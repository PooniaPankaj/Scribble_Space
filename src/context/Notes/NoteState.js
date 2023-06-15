import React, { useEffect, useState } from "react";
import noteContext from "./NoteContext";


const NoteState = (props) => {
  // const host = "http://localhost:8000";
  const host = "https://scribble-space-app-api.onrender.com"
  const intialnotes = []
  var [Notes, setNotes] = useState(intialnotes);

  // useEffect(() => {setNotes(intialnotes)}, [Notes] )
  // Add a Note
  const getNotes = async (title, description, tag) => {
    // TODO API call
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')  },
    });
    const Json = await response.json();
    
    setNotes(Json);    
  }



  // Add a Note
  const addNote = async (title, description, tag) => {
    // console.log("note added")
    // TODO API call
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')  
      },
      body: JSON.stringify({ title, description, tag }), // body data type must match "Content-Type" header
    });
    const json = await response.json();

    const note = json;
    // console.log(note);
    setNotes(Notes.concat(note));
  }


  // Delete a Note
  const deleteNote = async (id) => {
    // API call
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')  },
      // body: JSON.stringify({ title, description, tag }), // body data type must match "Content-Type" header
    });
    const json = await response.json();
 
    


    // console.log("Deleting the note with id" + id)
    const newNotes = Notes.filter((note) => { return note._id !== id })
    console.log(newNotes);
    setNotes(newNotes);

  }


  // Edit a Note
  const editNote = async (id, title, description, tag) => {
    // fetch API call
    try {
      const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
        method: "PUT", // *GET, POST, PUT, DELETE, etc.
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem('token')    },
        body: JSON.stringify({ title, description, tag }), // body data type must match "Content-Type" header
      });
       // we are making deep copy of our notes state
  
      let newnote = JSON.parse(JSON.stringify(Notes));
  
      for (var idx = 0; idx < newnote.length; idx++) {
        var element = newnote[idx];
        if (element._id === id) {
          newnote[idx].title = title;
          newnote[idx].description = description;
          newnote[idx].tag = tag;
          break;
        }
        
  
      }
      setNotes(newnote);
    } catch (error) {
      console.log("not a valid request"); 
    }
    

  }


  return (
    // <noteContext.Provider value={(state, update)}>
    //     {props.children}
    // </noteContext.Provider>


    <noteContext.Provider value={{ Notes,getNotes, addNote, deleteNote, editNote }}>
      {props.children}
    </noteContext.Provider>

  )

}
export default NoteState
