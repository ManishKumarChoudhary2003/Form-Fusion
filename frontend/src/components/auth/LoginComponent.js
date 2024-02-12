import { useDispatch } from "react-redux";
import React, { useState, useEffect } from "react";
import { userLoginApiService } from "../../api/AuthApiService";
import { authActions } from "../../store/auth-slice";
import { retrieveUserByEmailApiService } from "../../api/UserApiService";
import Navbar from "../home/Navbar/Navbar";
import { useNavigate } from "react-router-dom";

const LoginComponent = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUserId = localStorage.getItem("userId");

    if (storedToken && storedUserId) {
      dispatch(authActions.setToken(storedToken));
      dispatch(authActions.setUserId(storedUserId));
      dispatch(authActions.setAuthentication());
    }
  }, [dispatch]);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const token = await userLoginApiService(email, password);
      dispatch(authActions.setToken(token));
      localStorage.setItem("token", token);
      dispatch(authActions.setAuthentication());

      retrieveUserByEmailApiService(email, token)
        .then((response) => {
          const user = response;
          if (user && user.userId) {
            const userId = user.userId;
            localStorage.setItem("userId", userId);
            dispatch(authActions.setUserId(userId));
          } else {
            console.error("User or userId not found in response:", response);
          }
          setEmail("");
          setPassword("");
          setError("");
          setSuccessMessage("Login successful.");
          setTimeout(() => {
            setSuccessMessage("");
            navigate("/");
          }, 2000);
          console.log("Login successful:", token);
        })
        .catch((error) => {
          console.error("Error fetching user by email data:", error);
        });
    } catch (error) {
      setError("Invalid username or password");
      console.error("Error logging in:", error);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="container card mt-5">
        <h2 className="col-md-6 offset-md-3">Login</h2>
        {error && <div className="alert alert-danger">{error}</div>}
        {successMessage && (
          <div className="alert alert-success">{successMessage}</div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email:
            </label>
            <input
              type="text"
              className="form-control"
              id="email"
              value={email}
              onChange={handleEmailChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password:
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              value={password}
              onChange={handlePasswordChange}
            />
          </div>
          <button type="submit" className="btn btn-primary mb-3">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginComponent;
