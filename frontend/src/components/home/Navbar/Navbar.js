import React, { useState } from "react";
import "./Navbar.css";
import { NavLink } from "react-router-dom";
// import { useSelector } from "react-redux";

const Navbar = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);

  // const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  return (
    <nav>
      <div className={`logo nameDisplay ${isMenuOpen ? "hide" : ""}`}>
        {/* <h1>Manish</h1> */}
      </div>
      <ul className={`nav-links ${isMenuOpen ? "show" : ""}`}>
        <NavLink to="/" className="navItem">
          Home
        </NavLink>
        <NavLink to="/login" className="navItem">
          Login
        </NavLink>

        <NavLink to="/register" className="navItem">
          Register
        </NavLink>

        {localStorage.getItem("isLoggedIn") === "100"  && (
          <NavLink to="/all-forms" className="navItem">
            All Forms
          </NavLink>
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
