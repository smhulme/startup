import React from 'react';
import { NavLink } from 'react-router-dom';
import './booking.css';

export default function Booking() {
  return (
    <>
      <header className="bg-black">
        <NavLink to="/" style={{ textDecoration: "none", color: "inherit" }}>
          <img src="/Logo2-1.png" alt="Red Sound" className="img-fluid mx-auto d-block" style={{ maxWidth: "150px" }} />
        </NavLink>
        <nav className="text-center">
          <NavLink to="/premium" className="text-red mx-2 text-decoration-none">Premium</NavLink>
          <NavLink to="/pro" className="text-red mx-2 text-decoration-none">Pro</NavLink>
          <NavLink to="/" className="text-red mx-2 text-decoration-none">Home</NavLink>
        </nav>
      </header>
      <main className="bg-dark text-red py-4 text-center">
        <h1>Booking</h1>
        <h2>PlaceHolder 3rd Party Calendar API</h2>
        <h2>DataSocket placeholder showing which dates are taken</h2>
        <form className="booking-form mx-auto" style={{ maxWidth: "400px" }}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label text-light">Name:</label>
            <input type="text" className="form-control" id="name" name="name" required />
          </div>
          <div className="mb-3">
            <label htmlFor="phone" className="form-label text-light">Phone Number:</label>
            <input type="tel" className="form-control" id="phone" name="phone" required />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label text-light">Email:</label>
            <input type="email" className="form-control" id="email" name="email" required />
          </div>
          <div className="mb-3">
            <label htmlFor="street" className="form-label text-light">Street Address:</label>
            <input type="text" className="form-control" id="street" name="street" required />
          </div>
          <div className="mb-3">
            <label htmlFor="comments" className="form-label text-light">Comments:</label>
            <input type="text" className="form-control" id="comments" name="comments" />
          </div>
          <button type="submit" className="btn btn-danger w-100">
            Contact Placeholder for Websocket communication
          </button>
        </form>
      </main>
      <footer className="bg-black text-red py-3 text-center">
        © 2025 Red Sound. All rights reserved.
      </footer>
    </>
  );
}