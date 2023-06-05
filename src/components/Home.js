import React from 'react'
import AddNote from './AddNote'
import MyNotes from './MyNotes'

const Home = (props) => {

  return (
    <>
    <div className=' d-flex  w-100 h-100 justify-content-between login_page_cont'>
      <AddNote showAlert={props.showAlert}/>
      <MyNotes showAlert={props.showAlert}/>
    </div>
    
    </>
  )
}

export default Home
