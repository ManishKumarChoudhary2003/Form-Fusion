import React, { useState } from "react";
import "./Navbar.css";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  const isAuthenticated = localStorage.getItem("isLoggedIn") === "100";
  const userId = localStorage.getItem("userId");

  return (
    <nav>
      <div className={`logo nameDisplay ${isMenuOpen ? "hide" : ""}`}>
        <h2>Manish</h2>
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
            <NavLink to={`/user/${userId}/all-forms`} className="navItem">
              All Forms
            </NavLink>
            <NavLink to={`/user/${userId}/create-form`} className="navItem">
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
