import React from "react";
import '../css/Signup.css'; 

const Signup = () => {
    return (
        <div className="signup-container">
            <div className="signup-box">
                <h2>Sign In</h2>
                <form>
                    <input type="text" placeholder="First Name" required />
                    <input type="text" placeholder="Last Name" required />
                    <input type="email" placeholder="Email" required />
                    <input type="password" placeholder="Password" required />
                    <input type="tel" placeholder="Mobile Number" required />
                    <button type="submit">Sign In</button>
                </form>
                <p>
                    Already have an account? <a href="/login">Login</a>
                </p>
            </div>
        </div>
    );
};

export default Signup;
