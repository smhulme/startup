import React from 'react';
import '../app.css'; // or import './base.css' if you want page-specific styles

export default function Base() {
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
        <h1>Base Package</h1>
        <div className="main-box" id="main-box">
          <div className="item-row" id="item-row">
            <div className="item-box">Two Speakers</div>
            <div className="item-box">One Microphone</div>
            <div className="item-box">Included Set-Up and Take-Down</div>
          </div>
        </div>
        <h2>Add-ons</h2>
        <div className="addon-pool mb-4" id="addon-pool">
          <div className="addon-box text-white bg-secondary rounded mb-2 px-3 py-2 d-inline-block" draggable="true" id="addon1">Extra Microphone $30</div>
          <div className="addon-box text-white bg-secondary rounded mb-2 px-3 py-2 d-inline-block" draggable="true" id="addon2">Lighting $50</div>
          <div className="addon-box text-white bg-secondary rounded mb-2 px-3 py-2 d-inline-block" draggable="true" id="addon3">DJ Services $100/hour</div>
          <div className="addon-box text-white bg-secondary rounded mb-2 px-3 py-2 d-inline-block" draggable="true" id="addon4">On-site Technician $200</div>
          <div className="addon-box text-white bg-secondary rounded mb-2 px-3 py-2 d-inline-block" draggable="true" id="addon5">Subwoofer $80/subwoofer</div>
          <div className="addon-box text-white bg-secondary rounded mb-2 px-3 py-2 d-inline-block" draggable="true" id="addon6">Speaker Upgrade $150/speaker</div>
        </div>
        <h2 id="total-price" className="mt-3">$399</h2>
        <div className="purchase-box my-4">
          <a href="/login" className="text-decoration-none" style={{color: "inherit"}}>
            <h4 className="bg-danger text-white rounded px-4 py-2 d-inline-block">Purchase</h4>
          </a>
        </div>
      </main>
      <footer className="bg-black text-red py-3 text-center">
        © 2025 Red Sound. All rights reserved.
      </footer>
    </>
  );
}