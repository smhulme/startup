import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Home/home.jsx';
import Base from './base/Base.jsx';
import Premium from './premium/Premium.jsx';
import Pro from './pro/Pro.jsx';
import Booking from './booking/Booking.jsx';
import Login from './login/login.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/base" element={<Base />} />
        <Route path="/premium" element={<Premium />} />
        <Route path="/pro" element={<Pro />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}