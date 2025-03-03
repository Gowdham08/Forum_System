import './Login.css';
import axios from "axios";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPass] = useState("");
    const navigate = useNavigate();
    const handleLogin = async (event) => {
        event.preventDefault();
            const req = await axios.post("http://localhost:3001/login", {
                email: email,
                password: password
            });

            const message = req.data.message;
            const isLogin = req.data.isLogin;
            if (isLogin) {
            alert(message);
            navigate('/stories');
            }
            else{
                console.log(isLogin,message);
                alert(message);
            }
        }
    return (
        <div className="login-container">
            <div className="login-box">
                <h2>Login Page</h2>
                <form onSubmit={handleLogin}>
                    <input
                        type="email"
                        id="email"
                        placeholder="Email ID"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        id="password"
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

export default Login ;
