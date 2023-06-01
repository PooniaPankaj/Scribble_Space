import React from 'react'
import AddNote from './AddNote'
import MyNotes from './MyNotes'

const Home = (props) => {

  return (
    <>
    <AddNote showAlert={props.showAlert}/>
    <MyNotes showAlert={props.showAlert}/>
    </>
  )
}

export default Home
