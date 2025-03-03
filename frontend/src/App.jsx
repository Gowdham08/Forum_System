import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavBar from "./components/functionalcomponent/NavBar";
import Notifications from "../src/components/functionalcomponent/Notifications";
import Story from "./components/functionalcomponent/Story";
import StoryDetails from "./components/functionalcomponent/StoryDetails"; // Add this import
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
        <Route path="/story/:id" element={<StoryDetails/>} />
        <Route path="/nof" element={<Notifications/>} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/login" element={<Login/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;