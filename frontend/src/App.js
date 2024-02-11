import React, { useState, useEffect } from "react";
import { retrieveAllUsersApiService, welcomeApi } from "./api/UserApiService";
import LoginComponent from "./components/auth/LoginComponent";
import RegisterComponent from "./components/auth/RegisterComponent";
import CreateForm from "./components/form/CreateForm";
import { useSelector } from "react-redux";
import AllForms from "./components/form/AllForms";

const App = () => {
  const [welcomeMessage, setWelcomeMessage] = useState("");
  const [click, setClick] = useState(false);
  const [users, setUsers] = useState(null);
  const [error, setError] = useState(null);

  const [formButton, setFormButton] = useState(false);

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const token = useSelector((state) => state.auth.token);

  const pressed = () => {
    setClick(true);
    retrieveAllUsersApiService(token)
      .then((response) => {
        setUsers(response);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
        setError("Error fetching user data");
      });
  };

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

      <div>
        {isAuthenticated &&
          click &&
          users &&
          users.map((user, index) => (
            <div key={index}>
              <p>{user.username}</p>
              <p>{user.email}</p>
              <p>{user.password}</p>
              <p>{user.role}</p>
              <hr />
            </div>
          ))}
      </div>
      <button onClick={pressed}>Click me</button>
      {click && <h1 className="col-md-6 offset-md-4">{welcomeMessage}</h1>}
      {isAuthenticated && (
        <h2 className="col-md-6 offset-md-5">User is authenticated</h2>
      )}
      <RegisterComponent />
      <LoginComponent />
      <CreateForm />

      <button
        className="btn btn-primary"
        onClick={() => setFormButton(!formButton)}
      >
        Get Form Data
      </button>
      {formButton && <AllForms />}
    </div>
  );
};

export default App;
