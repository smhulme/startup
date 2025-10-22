import React from 'react';
// --- NEW ---
import { NavLink, useNavigate } from 'react-router-dom';

export default function Login() {
  // --- NEW ---
  const navigate = useNavigate();

  // This "mock" function just navigates to booking
  const handleMockLogin = (e) => {
    e.preventDefault(); // Stop the form from refreshing the page
    console.log('Mock login successful!');
    navigate('/booking'); // Go to the booking page
  };

  return (
    <>
      <header className="bg-black">
        {/* ... header nav ... */}
      </header>
      <main className="bg-dark text-red text-center py-4">
        <h1>Login</h1>
        {/* --- MODIFIED --- */}
        {/* Changed to a real form with an onSubmit handler */}
        <form className="login-form mx-auto" style={{maxWidth: "400px"}} onSubmit={handleMockLogin}>
          <div className="mb-3">
            <label htmlFor="username" className="form-label text-light">Username</label>
            <input type="text" className="form-control" id="username" name="username" placeholder="Enter any username" />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label text-light">Password</label>
            <input type="password" className="form-control" id="password" name="password" placeholder="Enter any password" />
          </div>
          {/* This is now a real submit button */}
          <button type="submit" className="btn btn-danger w-100">
            Login
          </button>
        </form>
      </main>
      <footer className="bg-black text-red py-3 text-center">
        © 2025 Red Sound. All rights reserved.
      </footer>
    </>
  );
}