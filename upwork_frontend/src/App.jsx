import { useState } from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import './App.css'
import './LandingPage.jsx'
import LandingPage from './LandingPage.jsx'
import SignUp from './SignUp'

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage/>}/>
          <Route path="/signup" element={<SignUp/>}/>
        </Routes>
      </Router>
    </>
  )
}

export default App
