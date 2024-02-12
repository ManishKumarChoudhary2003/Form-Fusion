import React, { useState } from "react";
import "./Navbar.css";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  const isAuthenticated = localStorage.getItem("isLoggedIn") === "100";

  return (
    <nav>
      <div className={`logo nameDisplay ${isMenuOpen ? "hide" : ""}`}>
        {/* <h1>Manish</h1> */}
      </div>
      <ul className={`nav-links ${isMenuOpen ? "show" : ""}`}>
        <NavLink to="/" className="navItem">
          Home
        </NavLink>
        {!isAuthenticated && (
          <>
            <NavLink to="/login" className="navItem">
              Login
            </NavLink>
            <NavLink to="/register" className="navItem">
              Register
            </NavLink>
          </>
        )}
        {isAuthenticated && (
          <>
            <NavLink to="/all-forms" className="navItem">
              All Forms
            </NavLink>
            <NavLink to="/create-form" className="navItem">
              Create Form
            </NavLink>
            <NavLink to="/logout" className="navItem">
              Logout
            </NavLink>
          </>
        )}
      </ul>
      <div className="burger" onClick={toggleMenu}>
        <div className={`line ${isMenuOpen ? "open1" : ""}`}></div>
        <div className={`line ${isMenuOpen ? "open2" : ""}`}></div>
        <div className={`line ${isMenuOpen ? "open3" : ""}`}></div>
      </div>
    </nav>
  );
};

export default Navbar;
