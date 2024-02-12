
import React, { useState, useEffect } from "react";
import { welcomeApi } from "../../api/UserApiService";
// import { Link } from "react-router-dom";
// import { useSelector } from "react-redux";
// import LoginComponent from "../auth/LoginComponent";
import Navbar from "./Navbar/Navbar";

const Welcome = () => {
  const [welcomeMessage, setWelcomeMessage] = useState(""); 
  const [error, setError] = useState(null); 

  // const isAuthenticated = useSelector(state => state.auth.isAuthenticated)
  // const navgate = useNavigate();

  // const pressed = () =>{
  //    navgate("/all-forms")
  // }

  useEffect(() => {
    const fetchWelcomeMessage = async () => {
      try {
        const response = await welcomeApi();
        setWelcomeMessage(response.data);
      } catch (error) {
        console.error("Error fetching welcome message:", error);
        setError("Error fetching welcome message");
      }
    };

    fetchWelcomeMessage();
  }, []);

  return (
    <div>
    <Navbar />
      {error && <div>Error: {error}</div>} 
      <h1 className="col-md-6 offset-md-4">{welcomeMessage}</h1> 
    </div>
  );
};

export default Welcome;
