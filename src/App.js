
import './App.css';

import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import MyNotes from './components/MyNotes';

import { Routes, Route } from "react-router-dom"
import NoteState from './context/Notes/NoteState';
import Alert from './components/Alert';
import Login from './components/Login';
import Signup from './components/Signup';
import Login_new from './components/Login_new';
import Signup_new from './components/Signup_new_1';
import { useState } from 'react';

function App() {
  const [alert,setAlert] = useState(null);
  const showAlert = (message,type)=>{
    setAlert({
      msg : message,
      type:type
    })
    setTimeout(() => {
      setAlert(null);
    }, 1500);

  } 
  return (
    <>
      <NoteState>
          <div className=''>
          <Navbar/>
          <Alert alert = {alert}/>
          </div>
          {/* <Home/> */}
          <Routes>
              <Route exact strict path="/" element={ <Home showAlert={showAlert} /> } />
              <Route exact strict path="/about" element={ <About /> } />
              <Route exact strict path="/mynotes" element={ <MyNotes /> } />
              <Route exact strict path="/login" element={ <Login_new showAlert={showAlert}/> } />
              <Route exact strict path="/signup" element={ <Signup_new showAlert={showAlert}/> } />
              
              
          </Routes>

        </NoteState>
    </>
  );
}

export default App;
