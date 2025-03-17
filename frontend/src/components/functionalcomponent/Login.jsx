import './Login.css';
import axios from "axios";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPass] = useState("");
    const [error, setError] = useState("");  
    const navigate = useNavigate();

    const handleLogin = async (event) => {
        event.preventDefault();
        setError("");  

        try {
            const response = await axios.post("http://localhost:3001/login", {
                email,
                password
            });

            alert(response.data.message);
            navigate('/stories'); 

        } catch (error) {
            if (error.response) {
                setError(error.response.data.message || "Login failed");
            } else {
                setError("Server error. Please try again later.");
            }
        }
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <h2>Login Page</h2>
                {error && <p className="error-message">{error}</p>} 
                <form onSubmit={handleLogin}>
                    <input
                        type="email"
                        placeholder="Email ID"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPass(e.target.value)}
                        required
                    />
                    <button type="submit">Login</button>
                </form>
                <p>Create an Account? <Link to="/signup">Signup</Link></p>
            </div>
        </div>
    );
}

export default Login;
