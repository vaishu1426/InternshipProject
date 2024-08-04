import React, { useState } from "react";
import "./Navbar.css";
import { Link, NavLink } from "react-router-dom";

export const Navbar = ({ isLoggedIn }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <nav>
      <div className="menu" onClick={toggleMenu}>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <ul className={menuOpen ? "open" : ""}>
        <li>
          <NavLink to="/home">Home</NavLink>
        </li>
        {isLoggedIn && (
          <>
            <li className="dropdown">
              <button onClick={toggleDropdown}> Options</button>
              {dropdownOpen && (
                <ul className="dropdown-menu">
                  <li>
                    <NavLink to="/Students">
                    <div style={{color:'black'}}>Students</div> </NavLink>
                  </li>
                  <li>
                    <NavLink to="/Professors">
                    <div style={{color:'black'}}>Professors</div> </NavLink>
                  </li>
                </ul>
              )}
            </li>
          </>
        )}
        {!isLoggedIn && (
          <li>
            <NavLink to="/login">Login</NavLink>
          </li>
        )}
      </ul>
    </nav>
  );
};
