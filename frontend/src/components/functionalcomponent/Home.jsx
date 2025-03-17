import React from "react";
import { useNavigate } from "react-router-dom";
import '../css/Home.css';
const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="homepage">
      <div className="content">
        <h1>Creation & Generation</h1>
        <p>A place to read, write, and deepen your understanding</p>
        <button onClick={() => navigate("/login")}>Start reading</button>
      </div>
    </div>
  );
};

export default HomePage;
