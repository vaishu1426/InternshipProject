import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import Home from './components/Home';
import { Navbar } from './components/pages/Navbar';
import Students from './components/pages/Students';
import Professors from './components/pages/Professors';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [showNames, setShowNames] = useState(false);
  const [studentName, setStudentName] = useState('John Doe');
  const [professorName, setProfessorName] = useState('Dr. Jane Smith');

  const handleClick = () => {
    setShowNames(!showNames);
  };

  return (
    <Router>
      <Navbar isLoggedIn={isLoggedIn} /> {/* Pass isLoggedIn state to Navbar */}
      <Routes>
        <Route path="/" element={<Login onLogin={() => setIsLoggedIn(true)} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/students" element={<Students />} />
        <Route path="/professors" element={<Professors />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/home"
          element={
            <Home>
              <i className="fas fa-user" onClick={handleClick} />
              {showNames && (
                <div>
                  <p>Student: {studentName}</p>
                  <p>Professor: {professorName}</p>
                </div>
              )}
            </Home>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
