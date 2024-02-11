import React, { useState } from 'react';
import { userRegisterApiService } from '../../api/AuthApiService';

const RegisterComponent = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handleRoleChange = (event) => {
        setRole(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const user = { username, password, email, role };
        try {
            const response = await userRegisterApiService(user);
            console.log('User registered successfully:', response.data);
            // Reset form fields and clear error message on successful registration
            setUsername('');
            setPassword('');
            setEmail('');
            setRole('');
            setErrorMessage('');
        } catch (error) {
            if (error.response && error.response.status === 409) {
                setErrorMessage('Email is already registered. Please choose a different email.');
            } else {
                console.error('Error registering user:', error);
                setErrorMessage('An error occurred during registration.');
            }
        }
    };
    return (
        <div className="container card mt-5 md-5">
            <h1 className="col-md-6 offset-md-3">Register</h1>
            {errorMessage && (
                <div className="alert alert-danger" role="alert">
                    {errorMessage}
                </div>
            )}
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="username" className="form-label">Username:</label>
                    <input type="text" className="form-control" id="username" value={username} onChange={handleUsernameChange} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password:</label>
                    <input type="password" className="form-control" id="password" value={password} onChange={handlePasswordChange} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email:</label>
                    <input type="email" className="form-control" id="email" value={email} onChange={handleEmailChange} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="role" className="form-label">Role:</label>
                    <input type="text" className="form-control" id="role" value={role} onChange={handleRoleChange} required />
                </div>
                <div className="mb-3">
                    <button type="submit" className="btn btn-primary">Register</button>
                </div>
            </form>
        </div>
    );
}

export default RegisterComponent;
