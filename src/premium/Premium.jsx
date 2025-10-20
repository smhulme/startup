import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './premium.css';

// Add-ons for Premium package
const ADDONS = [
  { id: 'addon1', name: 'Extra Microphone', price: 30, max: 4 },
  { id: 'addon2', name: 'Lighting', price: 50, max: 2 },
  { id: 'addon3', name: 'DJ Services $100/hour', price: 100, max: 8 },
  { id: 'addon4', name: 'On-site Technician', price: 200, max: 1 },
  { id: 'addon5', name: 'Concert Mic Setup $80/performer', price: 80, max: 8 },
  { id: 'addon6', name: 'Fog Machine', price: 50, max: 2 },
  { id: 'addon7', name: 'Concert Audio Mixer', price: 150, max: 1 },
];

const PREMIUM_PRICE = 899;

export default function Premium() {
  // Track count for each add-on
  const [counts, setCounts] = useState(Array(ADDONS.length).fill(0));

  // Handle plus/minus clicks, clamp between 0 and max
  const handleChange = (idx, delta) => {
    setCounts(counts =>
      counts.map((count, i) =>
        i === idx
          ? Math.max(0, Math.min(ADDONS[idx].max, count + delta))
          : count
      )
    );
  };

  // Calculate total add-on price
  const addonsTotal = counts.reduce(
    (sum, count, idx) => sum + count * ADDONS[idx].price,
    0
  );
  // Calculate overall price
  const totalPrice = PREMIUM_PRICE + addonsTotal;

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
          {ADDONS.map((addon, idx) => (
            <div key={addon.id} className="addon-box text-white bg-secondary rounded mb-2 px-3 py-2 d-inline-block">
              <span>{addon.name} ${addon.price}</span>
              <div className="d-flex align-items-center justify-content-center mt-2">
                <button
                  className="btn btn-sm btn-dark mx-1"
                  onClick={() => handleChange(idx, -1)}
                  disabled={counts[idx] === 0}
                  type="button"
                >-</button>
                <span className="mx-2">{counts[idx]}</span>
                <button
                  className="btn btn-sm btn-dark mx-1"
                  onClick={() => handleChange(idx, 1)}
                  disabled={counts[idx] === addon.max}
                  type="button"
                >+</button>
              </div>
            </div>
          ))}
        </div>
        <h2 id="total-price" className="mt-3">${totalPrice}</h2>
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