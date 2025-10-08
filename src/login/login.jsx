import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Login() {
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
        <h1>Login</h1>
        <form className="login-form mx-auto" style={{maxWidth: "400px"}}>
          <div className="mb-3">
            <label htmlFor="username" className="form-label text-light">Username</label>
            <input type="text" className="form-control" id="username" name="username" />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label text-light">Password</label>
            <input type="password" className="form-control" id="password" name="password" />
          </div>
          <NavLink to="/booking" className="btn btn-danger w-100">
            Login
          </NavLink>
        </form>
      </main>
      <footer className="bg-black text-red py-3 text-center">
        © 2025 Red Sound. All rights reserved.
      </footer>
    </>
  );
}