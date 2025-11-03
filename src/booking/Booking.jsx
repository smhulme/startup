import React, { useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './booking.css';
import { usePackage } from '../context/PackageContext'; // Import the hook

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
  const navigate = useNavigate();
  // Clear the package context when we leave the booking 
  const { setPackageSpec } = usePackage(); 

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
  
  // New Logout Function
  async function handleLogout() {
    try {
      const response = await fetch('/api/auth/logout', {
        method: 'DELETE', // Logout typically uses a DELETE request
      });

      if (response.ok) {
        console.log('Logout successful.');
        setPackageSpec(null); // Clear any pending package details
        navigate('/'); // Navigate to the home page (or login page)
      } else {
        const errorText = await response.text();
        console.error('Logout failed on server:', errorText);
        // Even if the server returns an error (e.g., token expired), 
        // we usually log the user out on the client side for safety.
        setPackageSpec(null);
        navigate('/');
      }
    } catch (error) {
      console.error('Network error during logout:', error);
      // In case of network error, clear client state and navigate anyway
      setPackageSpec(null); 
      navigate('/'); 
    }
  }


  return (
    <>
      {/* --- RESTORED HEADER --- */}
      <header className="bg-black position-relative">
        <NavLink to="/" style={{ textDecoration: "none", color: "inherit" }}>
          <img src="/Logo2-1.png" alt="Red Sound" className="img-fluid mx-auto d-block" style={{ maxWidth: "150px" }} />
        </NavLink>
        {/* Logout button in top right, now using the handleLogout function */}
        <button
          className="text-red mx-2 text-decoration-none logout-btn"
          style={{ top: 20, right: 20, position: "absolute" }}
          onClick={handleLogout} // MODIFIED
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
        
        {/* Package Receipt */}
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
