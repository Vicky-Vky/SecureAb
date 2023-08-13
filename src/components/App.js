
import React from "react";
import Phone from "./Mobilesignup"
import Login from "./Login"
import Signup from "./Signup"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from 'react';
// import Navbar from "./navbar";
import Dashboard from "./dashboard";
import Loan from "./Loan";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>

          <Route index element={<Signup></Signup>}/>
          <Route path="./loan" element = {<Loan></Loan>} />
          <Route path='/login' element={<Login></Login>} />
          <Route path='/dashboard' element={<Dashboard></Dashboard>} />
          <Route path = '/phone' element={<Phone></Phone>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
