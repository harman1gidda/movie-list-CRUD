
import React, { useState } from 'react';
//import './Navbar.css'
import {useNavigate} from 'react-router-dom';
import Hamburger from "hamburger-react"

function Navbar(){
  const navigate = useNavigate();
  const [isOpen, setOpen] = useState(false)

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <>

        <nav className="navbar">
          <h4 className='navHeader'>Movie App</h4>

          {isOpen && (
          <ul>
            <li><button className="navbar-btn" onClick={() => handleNavigation('/')}>Home</button></li>
            <li><button className="navbar-btn" onClick={() => handleNavigation('/movies')}>Movies</button></li>
            <li><button className="navbar-btn" onClick={() => handleNavigation('/submit')}>Submit</button></li>
          </ul>
          )}
          <Hamburger toggled={isOpen} toggle={setOpen} />
        </nav>
    </>
  )
}

export default Navbar;