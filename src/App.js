
import './App.css';

import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import MyNotes from './components/MyNotes';

import { Routes, Route } from "react-router-dom"
import NoteState from './context/Notes/NoteState';
import Alert from './components/Alert';
function App() {
  return (
    <>
      <NoteState>

          <Navbar/>
          <Alert/>
          {/* <Home/> */}
          <Routes>
              <Route exact strict path="/" element={ <Home /> } />
              <Route exact strict path="/about" element={ <About /> } />
              <Route exact strict path="/mynotes" element={ <MyNotes /> } />
          </Routes>

        </NoteState>
    </>
  );
}

export default App;
