import React,{useState} from "react";
import noteContext from "./NoteContext";


const NoteState = (props)=>{
    const s1 = {
        "name":"Pankaj",
        "class":"12"
    }
    const [State, setState] = useState(s1);
    const update = ()=>{
        setTimeout(() => {
            setState({
                "name":"Larry",
                "class":"10b"
            })
        }, 1000);
    }
    return (
        // <noteContext.Provider value={(state, update)}>
        //     {props.children}
        // </noteContext.Provider>
        <noteContext.Provider value={{State,update}}>
            {props.children}
        </noteContext.Provider>
    )
}
export default NoteState
