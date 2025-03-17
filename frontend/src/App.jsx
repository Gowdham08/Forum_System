import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavBar from "./components/functionalcomponent/NavBar";
import Category from "./components/functionalcomponent/Category";
import Story from "./components/functionalcomponent/Story";
import StoryDetails from "./components/functionalcomponent/StoryDetails"; 
import Signup from "./components/functionalcomponent/Signup";
import Login from "./components/functionalcomponent/Login";
import Home from "./components/functionalcomponent/Home";

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/stories" element={<Story />} />
        <Route path="/stories/:id" element={<StoryDetails/>} />
        <Route path="/cat" element={<Category/>} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/login" element={<Login/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;