
import React, { useState, useEffect } from "react";
import { welcomeApi } from "../../api/UserApiService";

const Welcome = () => {
  const [welcomeMessage, setWelcomeMessage] = useState(""); 
  const [error, setError] = useState(null);

   

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
      {error && <div>Error: {error}</div>} 
      <h1 className="col-md-6 offset-md-4">{welcomeMessage}</h1>
    </div>
  );
};

export default Welcome;
