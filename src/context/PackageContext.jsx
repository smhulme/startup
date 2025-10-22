import React, { createContext, useState, useContext, useEffect } from 'react';

const PackageContext = createContext();

// Helper function to get the initial state from localStorage
const getInitialState = () => {
    const storedSpec = localStorage.getItem('packageSpec');
    try {
        // Try to parse the stored JSON
        return storedSpec ? JSON.parse(storedSpec) : null;
    } catch (error) {
        console.error('Failed to parse packageSpec from localStorage', error);
        return null;
    }
};

export function PackageProvider({ children }) {
  // 1. Initialize state BY READING from localStorage
  const [packageSpec, setPackageSpec] = useState(getInitialState());

  // 2. Use a useEffect to SAVE to localStorage whenever packageSpec changes
  useEffect(() => {
    if (packageSpec) {
      // If we have a spec, save it as a string
      localStorage.setItem('packageSpec', JSON.stringify(packageSpec));
    } else {
      // If packageSpec is null (e.g., booking complete), remove it
      localStorage.removeItem('packageSpec');
    }
  }, [packageSpec]); // This hook runs every time packageSpec changes

  return (
    <PackageContext.Provider value={{ packageSpec, setPackageSpec }}>
      {children}
    </PackageContext.Provider>
  );
}

export function usePackage() {
  return useContext(PackageContext);
}