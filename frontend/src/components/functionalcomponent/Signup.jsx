import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Signup() {
    const navigate = useNavigate();
    const [firstName, setFName] = useState("");
    const [lastName, setLName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPass] = useState("");
    const [phoneNumber, setPhoneno] = useState("");
    const handleSignUp = async (event) => {
        event.preventDefault();
            const req = await axios.post("http://localhost:3001/signup", {
                firstName,
                lastName,
                email,
                password,
                phoneNumber,
            });

            const { message, isSignup } = req.data;

            alert(message);
            if (isSignup) {
                navigate("/login");
            }
            else{
                alert(message);
            }
    };

    return (
        <div className="login-container">  {/* Use the same class as login */}
            <div className="login-box">  
                <h2>Sign Up</h2>
                <form onSubmit={handleSignUp}>
                    <input
                        type="text"
                        placeholder="First Name"
                        value={firstName}
                        onChange={(e) => setFName(e.target.value)}
                        required
                    />
                    <input
                        type="text"
                        placeholder="Last Name"
                        value={lastName}
                        onChange={(e) => setLName(e.target.value)}
                        required
                    />
                    <input
                        type="email"
                        placeholder="Email"
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
                    <input
                        type="text"
                        placeholder="Mobile Number"
                        value={phoneNumber}
                        onChange={(e) => setPhoneno(e.target.value)}
                        required
                    />
                    <button type="submit">Sign Up</button>
                </form>
                <div className="login-redirect">
                    <p>Already have an account? <Link to="/login">Login</Link></p>
                </div>
            </div>
        </div>
    );
}

export default Signup;
