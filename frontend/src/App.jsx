import React, { useState, useEffect } from "react";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import { BrowserRouter as Router } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import "../src/styles/main.css";

function App() {
  return (
    <Router>
      <div>
        <section>
          <Routes>
            {" "}
            <Route path="/home" element={<Home />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="" element={<Login />} />
          </Routes>
        </section>
      </div>
    </Router>
  );
}

export default App;
