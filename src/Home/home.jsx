import React from 'react';

export default function Home() {
  return (
    <>
      <header>
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
        <h1>Welcome to Red Sound</h1>
        <p>
          Professional Audio Solutions for All Events.<br />
          From intimate gatherings like weddings and parties to large events including concerts and festivals, we have you covered.
        </p>
      </main>
      <footer className="bg-black text-red py-3 text-center">
        © 2025 Red Sound. All rights reserved.
      </footer>
    </>
  );
}