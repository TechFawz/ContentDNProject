import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import StartWelcome from "./start";
import Containt from "./containt";
import Home from "./home";
import AboutUs from "./aboutus";
import ContactUs from "./contactus";
import Login from "./login";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Appa />
  </React.StrictMode>
);

export default function Appa() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<StartWelcome/>}/>
        <Route path="containt/:type/:name" element={<Containt/>}>
          <Route index element={<Navigate to="home" />}/>
          <Route path="home" element={<Home/>} />
          <Route path="aboutus" element={<AboutUs/>} />
          <Route path="contactus" element={<ContactUs/>} />
        </Route>
        <Route path="login" element={<Login/>}>
          <Route path="user" element={<div>User Login</div>} />
          <Route path="admin" element={<div>Admin Login</div>} />
        </Route>
      </Routes>
    </Router>
  );
}
