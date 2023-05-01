
import './App.css';

import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';

import { Routes, Route } from "react-router-dom"
import NoteState from './context/Notes/NoteState';
function App() {
  return (
    <>
      <NoteState>

          <Navbar/>
          {/* <Home/> */}
          <Routes>
              <Route exact strict path="/" element={ <Home /> } />
              <Route exact strict path="/about" element={ <About /> } />
          </Routes>

        </NoteState>
    </>
  );
}

export default App;
