import React, { useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './booking.css';
// --- NEW ---
import { usePackage } from '../context/PackageContext'; // Import the hook

// --- NEW ---
// A helper component to render the package receipt dynamically
const PackageReceipt = () => {
  const { packageSpec } = usePackage(); // Get the package data from context

  // If no package was selected
  if (!packageSpec) {
    return (
      <div className="bg-secondary text-white rounded p-3 mx-auto mb-4" style={{ maxWidth: "500px" }}>
        <h3 className="text-center mb-3">Your Selected Package</h3>
        <p>No package selected. Please go back and choose a package.</p>
      </div>
    );
  }

  // If a package IS selected, render its details
  return (
    <div className="bg-secondary text-white rounded p-3 mx-auto mb-4" style={{ maxWidth: "500px" }}>
      <h3 className="text-center mb-3">Your Selected Package</h3>
      <div className="text-start">
        <div className="d-flex justify-content-between mb-2">
          <span>{packageSpec.packageName}</span>
          <span>${packageSpec.basePrice.toFixed(2)}</span>
        </div>
        <hr className="my-2" />
        {packageSpec.addons && packageSpec.addons.length > 0 && (
          <>
            <div className="small text-muted mb-2">Add-ons:</div>
            {packageSpec.addons.map(addon => (
              <div key={addon.name} className="d-flex justify-content-between mb-1">
                <span>• {addon.name} (x{addon.quantity})</span>
                <span>${addon.price.toFixed(2)}</span>
              </div>
            ))}
            <hr className="my-2" />
          </>
        )}
        <div className="d-flex justify-content-between fw-bold">
          <span>Total:</span>
          <span>${packageSpec.totalPrice.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};

export default function Booking() {
  useEffect(() => {
    // --- RESTORED ---
    if (!window.Calendly) {
      const script = document.createElement('script');
      script.src = "https://assets.calendly.com/assets/external/widget.js";
      script.async = true;
      document.body.appendChild(script);
      return () => {
        document.body.removeChild(script);
      };
    }
  }, []);

  const navigate = useNavigate();

  return (
    <>
      {/* --- RESTORED HEADER --- */}
      <header className="bg-black position-relative">
        <NavLink to="/" style={{ textDecoration: "none", color: "inherit" }}>
          <img src="/Logo2-1.png" alt="Red Sound" className="img-fluid mx-auto d-block" style={{ maxWidth: "150px" }} />
        </NavLink>
        {/* Logout button in top right */}
        <button
          className="text-red mx-2 text-decoration-none logout-btn"
          style={{ top: 20, right: 20, position: "absolute" }}
          onClick={() => navigate('/')}
        >
          Logout
        </button>
        <nav className="text-center">
          <NavLink to="/premium" className="text-red mx-2 text-decoration-none">Premium</NavLink>
          <NavLink to="/pro" className="text-red mx-2 text-decoration-none">Pro</NavLink>
          <NavLink to="/" className="text-red mx-2 text-decoration-none">Home</NavLink>
        </nav>
      </header>

      {/* --- RESTORED MAIN CONTENT --- */}
      <main className="bg-dark text-red py-4 text-center">
        <h1>Booking</h1>
        {/* Calendly inline widget */}
        <div
          className="calendly-inline-widget"
          data-url="https://calendly.com/smhulme101/new-meeting?hide_event_type_details=1&background_color=000000&text_color=949494&primary_color=e72526"
          style={{ minWidth: "320px", height: "700px" }}
        ></div>
        
        {/* --- MODIFIED --- */}
        {/* Replaced hard-coded receipt with our new dynamic component */}
        <PackageReceipt />
        
        {/* --- RESTORED FORM --- */}
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
            PlaceHolder for Package submission with websocket
          </button>
        </form>
      </main>

      {/* --- RESTORED FOOTER --- */}
      <footer className="bg-black text-red py-3 text-center">
        © 2025 Red Sound. All rights reserved.
      </footer>
    </>
  );
}