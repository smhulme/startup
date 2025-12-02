import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  async function handleAuth(method) {
    // Basic validation
    if (!username || !password) {
      alert('Please enter both a username and a password.');
      return;
    }

    const endpoint = '/api/auth/' + (method === 'POST' ? 'create' : 'login');
    const action = method === 'POST' ? 'Registration' : 'Login';
    const successMessage = method === 'POST'
      ? `Welcome, ${username}! You are now registered and logged in.`
      : 'Login successful!';

    try {
      const response = await fetch(endpoint, {
        method: 'POST', // The instructions use POST for both create and login
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const user = await response.json();
        console.log(successMessage);
        alert(successMessage);
        if (user.type === 'admin') {
          navigate('/admin/dashboard');
        } else {
          navigate('/booking');
        }
      } else {
        const errorText = await response.text();
        console.error(`${action} failed:`, errorText);
        let userAlert = `${action} failed.`;
        if (method === 'POST') {
          userAlert += ' Username may already be taken or password invalid.';
        } else {
          userAlert += ' Please check your username and password.';
        }
        alert(userAlert);
      }
    } catch (error) {
      console.error(`Error during ${action.toLowerCase()} fetch:`, error);
      alert('Network error. Could not connect to the service.');
    }
  }

  // --- WRAPPER FUNCTIONS (matching the requested style) ---
  const handleLogin = (e) => {
    e.preventDefault();
    // Call the consolidated function for login
    handleAuth('PUT');
  };

  const handleRegister = () => {
    // Call the consolidated function for registration
    handleAuth('POST');
  };

  return (
    <>
      {/* --- RESTORED HEADER --- */}
      <header className="bg-black">
        <NavLink to="/">
          <img src="/Logo2-1.png" alt="Red Sound" className="img-fluid mx-auto d-block" style={{ maxWidth: "150px" }} />
        </NavLink>
        <nav className="text-center">
          <NavLink to="/premium" className="text-red mx-2 text-decoration-none">Premium</NavLink>
          <NavLink to="/pro" className="text-red mx-2 text-decoration-none">Pro</NavLink>
          <NavLink to="/" className="text-red mx-2 text-decoration-none">Home</NavLink>
        </nav>
      </header>

      {/* --- MAIN CONTENT --- */}
      <main className="bg-dark text-red text-center py-4">
        <h1>Account Access</h1>
        <form className="login-form mx-auto" style={{ maxWidth: "400px" }} onSubmit={handleLogin}>
          <div className="mb-3">
            <label htmlFor="username" className="form-label text-light">Username</label>
            <input
              type="text"
              className="form-control"
              id="username"
              name="username"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label text-light">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {/* Use onClick and rely on the form onSubmit handler calling handleLogin */}
          <button type="submit" className="btn btn-danger w-100 mb-3" disabled={!(username && password)}>
            Login
          </button>

          {/* Use onClick and prevent default form submission */}
          <button
            type="button"
            className="btn btn-outline-danger w-100"
            onClick={handleRegister}
            disabled={!(username && password)}
          >
            Register New Account
          </button>
        </form>
      </main>

      {/* --- FOOTER --- */}
      <footer className="bg-black text-red py-3 text-center">
        © 2025 Red Sound. All rights reserved.
      </footer>
    </>
  );
}
