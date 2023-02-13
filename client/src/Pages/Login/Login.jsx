import './login.css'
import { useState } from 'react';
import Header from '../../component/Header/Header';
import axios from 'axios';


const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!email || !password) {
            setError('Please enter your email and password');
            return;
        }

        // Send a request to the server to check the email and password
        try {
            const user = await axios.post("http://localhost:8080/api/login", {
                email: email,
                password: password
            })
            setError('');
            console.log(user.data);
            localStorage.setItem('user', JSON.stringify(user.data));
            window.location.replace("/");
        } catch (err) {
            console.error(err);
        }

    };

    return (<>
        <Header />
        <div className="LoginPage">
            <form onSubmit={handleSubmit}>
                <h1>Login</h1>
                {error && <p className="error">{error}</p>}
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
                    />
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    </>
    );
};


export default Login