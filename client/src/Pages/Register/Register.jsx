import axios from 'axios';
import React, { useState } from 'react';
import Header from '../../component/Header/Header';
import './register.css';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!name || !email || !password) {
            setError('Please enter your name, email, and password');
            return;
        }
        const data = {
            name: name,
            email: email,
            password: password,
        };
        try {
            const user = await axios.post("http://localhost:8080/api/register", data);
            console.log(user.data);
            setError("")
        } catch (error) {
            console.error(error.response.data.split(" "));
            if(error.response.data.split(" ")[0] === "E11000") {
                setError("Email already exists");
                return;
            }
            setError("Something Went Wrong Try Again?")

        }
    };

    return (
        <>
            <Header />
            <div className="RegisterPage">
                <form onSubmit={handleSubmit}>
                    <h1>Register</h1>
                    {error && <p className="error">{error}</p>}
                    <div className="form-group">
                        <label htmlFor="name">Name:</label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(event) => setName(event.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                            minLength="8"
                        />
                    </div>
                    <button type="submit">Register</button>
                </form>
            </div>
        </>
    );
};

export default Register;
