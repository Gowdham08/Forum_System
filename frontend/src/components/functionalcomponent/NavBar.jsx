import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import "../css/NavBar.css";

const NavBar = () => {
    return (
        <nav className="navbar">
            <div className="nav-left">
                <ul className="nav-links">
                    <li><Link to="/">Home</Link></li>
                    <li className="nav-item discussions">
                        <Link to="/cat">Category</Link>
                    </li>
                    <li ><Link to="/stories">Story</Link></li>
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
