import React from 'react';
import { NavLink } from 'react-router-dom';
import './premium.css';

export default function Premium() {
  return (
    <>
      <header className="bg-black">
        <NavLink to="/">
          <img src="/Logo2-1.png" alt="Red Sound" className="img-fluid mx-auto d-block" style={{maxWidth: "150px"}} />
        </NavLink>
        <nav className="text-center">
          <NavLink to="/base" className="text-red mx-2 text-decoration-none">Base</NavLink>
          <NavLink to="/pro" className="text-red mx-2 text-decoration-none">Pro</NavLink>
          <NavLink to="/" className="text-red mx-2 text-decoration-none">Home</NavLink>
        </nav>
      </header>
      <main className="bg-dark text-red text-center py-4">
        <h1>Premium Package</h1>
        <div className="main-box" id="main-box">
          <div className="item-row" id="item-row">
            <div className="item-box">Two Premium Speakers</div>
            <div className="item-box">Two Subwoofers</div>
            <div className="item-box">Two Microphones</div>
          </div>
        </div>
        <h2>Add-ons</h2>
        <div className="addon-pool mb-4" id="addon-pool">
          <div className="addon-box text-white bg-secondary rounded mb-2 px-3 py-2 d-inline-block" draggable="true" id="addon1">Extra Microphone $30</div>
          <div className="addon-box text-white bg-secondary rounded mb-2 px-3 py-2 d-inline-block" draggable="true" id="addon2">Lighting $50</div>
          <div className="addon-box text-white bg-secondary rounded mb-2 px-3 py-2 d-inline-block" draggable="true" id="addon3">DJ Services $100/hour</div>
          <div className="addon-box text-white bg-secondary rounded mb-2 px-3 py-2 d-inline-block" draggable="true" id="addon4">On-site Technician $200</div>
          <div className="addon-box text-white bg-secondary rounded mb-2 px-3 py-2 d-inline-block" draggable="true" id="addon5">Concert Mic Setup $80/performer</div>
          <div className="addon-box text-white bg-secondary rounded mb-2 px-3 py-2 d-inline-block" draggable="true" id="addon6">Fog Machine $50</div>
          <div className="addon-box text-white bg-secondary rounded mb-2 px-3 py-2 d-inline-block" draggable="true" id="addon7">Concert Audio Mixer $150</div>
        </div>
        <h2 id="total-price" className="mt-3">$899</h2>
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