import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../css/NavBar.css";

const NavBar = () => {
    return (
        <nav className="navbar">
            <div className="nav-left">
                <ul className="nav-links">
                    <li><Link to="/">Home</Link></li>
                    <li className="nav-item discussions">
                        <Link to="/discussions">Discussions</Link>
                        <ul className="dropdown">
                            <li><Link to="/create-discussion">Create New Discussion</Link></li>
                            <li><Link to="/edit-discussion">Edit</Link></li>
                        </ul>
                    </li>
                    <li><Link to="/story">About Us</Link></li>
                    <li><Link to="/categories">Categories</Link></li>
                </ul>
            </div>
            <div className="nav-right">
                <Link to="/signup" className="signin">Sign In</Link>
                <Link to="/login"><button className="get-started">Get Started</button></Link>
            </div>
        </nav>
    );
};

export default NavBar;
