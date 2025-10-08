import React from 'react';
import './booking.css';

export default function Booking() {
  return (
    <>
      <header className="bg-black">
        <a href="/">
          <img src="/Logo2-1.png" alt="Red Sound" className="img-fluid mx-auto d-block" style={{maxWidth: "150px"}} />
        </a>
        <nav className="text-center">
          <a href="/premium" className="text-red mx-2 text-decoration-none">Premium</a>
          <a href="/pro" className="text-red mx-2 text-decoration-none">Pro</a>
          <a href="/" className="text-red mx-2 text-decoration-none">Home</a>
        </nav>
      </header>
      <main className="bg-dark text-red text-center py-4">
        <h1>Booking</h1>
        <form className="booking-form mx-auto" style={{maxWidth: "400px"}}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label text-light">Name</label>
            <input type="text" className="form-control" id="name" name="name" />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label text-light">Email</label>
            <input type="email" className="form-control" id="email" name="email" />
          </div>
          <div className="mb-3">
            <label htmlFor="date" className="form-label text-light">Date</label>
            <input type="date" className="form-control" id="date" name="date" />
          </div>
          <button type="submit" className="btn btn-danger w-100">Book Now</button>
        </form>
      </main>
      <footer className="bg-black text-red py-3 text-center">
        © 2025 Red Sound. All rights reserved.
      </footer>
    </>
  );
}