import React from "react";
import "../css/Login.css"; 

const Login = () => {
    return (
        <div className="login-container">
            <div className="login-box">
                <h2>Welcome Back</h2>
                <form>
                    <input type="email" placeholder="Email" required />
                    <input type="password" placeholder="Password" required />
                    <button type="submit">Login</button>
                </form>
                <p>
                    Don't have an account? <a href="/signup">Sign Up</a>
                </p>
            </div>
        </div>
    );
};

export default Login;
