import React,{useState} from "react";
import noteContext from "./NoteContext";


const NoteState = (props)=>{
    const intialnotes = [
        {
          "_id": "644ffab5e90fab17ae821e49",
          "user": "643ed4f68c8ef1f78508aeb6",
          "title": "My title",
          "description": "Please wake up early",
          "tag": "General",
          "date": "2023-05-01T17:45:25.605Z",
          "__v": 0
        },
        {
            "user": "643ed4f68c8ef1f78508aeb6",
            "title": "I am Noob coder",
            "description": "Please wake up early",
            "tag": "General",
            "_id": "644ffdca70779a057d9f3834",
            "date": "2023-05-01T17:58:34.551Z",
            "__v": 0
          }
      ]
      const [Notes, setNotes] = useState(intialnotes)
    return (
        // <noteContext.Provider value={(state, update)}>
        //     {props.children}
        // </noteContext.Provider>
        <noteContext.Provider value={{intialnotes,setNotes}}>
            {props.children}
        </noteContext.Provider>
    )
}
export default NoteState
