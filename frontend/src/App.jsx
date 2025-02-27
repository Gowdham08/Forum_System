import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavBar from "./components/functionalcomponent/NavBar";
import About from "./components/functionalcomponent/About";
import Discussion from "./components/functionalcomponent/Discussion";
import Story from "./components/functionalcomponent/Story";
import Categories from "./components/functionalcomponent/Categories";
import Signup from "./components/functionalcomponent/SignUp";
import Comment from "./components/functionalcomponent/Comment";
import Post from "./components/functionalcomponent/Post";
import Login from "./components/functionalcomponent/login";
import Home from "./components/functionalcomponent/Home";
function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>

        <Route path="/" element={<Home/>} />
        <Route path="/about" element={<About />} />
        <Route path="/discussions" element={<Discussion />} />
        <Route path="/story" element={<Story />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/post" element={<Post />} />
        <Route path="/comment" element={<Comment />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
