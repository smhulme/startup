import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Pro() {
  return (
    <>
      <header className="bg-black">
        <NavLink to="/">
          <img src="/Logo2-1.png" alt="Red Sound" className="img-fluid mx-auto d-block" style={{maxWidth: "150px"}} />
        </NavLink>
        <nav className="text-center">
          <NavLink to="/base" className="text-red mx-2 text-decoration-none">Base</NavLink>
          <NavLink to="/premium" className="text-red mx-2 text-decoration-none">Premium</NavLink>
          <NavLink to="/" className="text-red mx-2 text-decoration-none">Home</NavLink>
        </nav>
      </header>
      <main className="bg-dark text-red text-center py-4">
        <h1>Pro Package</h1>
        <div className="main-box" id="main-box">
          <div className="item-row" id="item-row">
            <div className="item-box">Custom Tailored Setup</div>
            <div className="item-box">All Ad-Ons Included</div>
          </div>
        </div>
        <h2 id="total-price" className="mt-3">$1999</h2>
        <div className="purchase-box my-4">
          <NavLink to="/login" className="text-decoration-none" style={{color: "inherit"}}>
            <h4 className="bg-danger text-white rounded px-4 py-2 d-inline-block">Purchase</h4>
          </NavLink>
        </div>
      </main>
      <footer className="bg-black text-red py-3 text-center">
        © 2025 Red Sound. All rights reserved.
      </footer>
    </>
  );
}