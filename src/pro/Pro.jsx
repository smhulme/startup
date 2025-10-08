import React from 'react';

export default function Pro() {
  return (
    <>
      <header className="bg-black">
        <a href="/">
          <img src="/Logo2-1.png" alt="Red Sound" className="img-fluid mx-auto d-block" style={{maxWidth: "150px"}} />
        </a>
        <nav className="text-center">
          <a href="/base" className="text-red mx-2 text-decoration-none">Base</a>
          <a href="/premium" className="text-red mx-2 text-decoration-none">Premium</a>
          <a href="/" className="text-red mx-2 text-decoration-none">Home</a>
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