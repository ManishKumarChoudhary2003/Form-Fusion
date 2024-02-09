import React, { useState, useEffect } from "react";
import { welcomeApi } from "./components/api/UserApiService";
// import AuthProvider from "./components/security/AuthContext"; 
import LoginComponent from "./components/auth/LoginComponent";
import RegisterComponent from "./components/auth/RegisterComponent"


const App = () => {
  const [welcomeMessage, setWelcomeMessage] = useState("");
  const [click, setClick] = useState(false);

  const pressed = () => {
    setClick(true);
  };

  useEffect(() => {
    const fetchWelcomeMessage = async () => {
      try {
        const response = await welcomeApi();
        setWelcomeMessage(response.data);
      } catch (error) {
        console.error("Error fetching welcome message:", error);
      }
    };

    fetchWelcomeMessage();
  }, []);

  return (
    <div>
     
        <button onClick={pressed}>Click me</button>
        {click && <h1>{welcomeMessage}</h1>}
        <LoginComponent />
        <RegisterComponent />
    
    </div>
  );
};

export default App;
