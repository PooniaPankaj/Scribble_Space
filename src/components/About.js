import React from 'react'
import { useContext,useEffect } from 'react'
import noteContext from '../context/Notes/NoteContext'

const About = () => {
  const a = useContext(noteContext);
  // useEffect(() => {
  //   a.update();
  // }, [])
  
  return (
    <div>
      {/* This is About {a.State.name} */}
    </div>
  )
}

export default About
