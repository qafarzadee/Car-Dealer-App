// src/app/page.js
"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Home() {
  const [makes, setMakes] = useState([]);
  const [selectedMake, setSelectedMake] = useState(null);
  const [selectedYear, setSelectedYear] = useState(null);
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  // Fetch vehicle makes
  useEffect(() => {
    fetch('https://vpic.nhtsa.dot.gov/api/vehicles/GetMakesForVehicleType/car?format=json')
      .then(res => res.json())
      .then(data => setMakes(data.Results));
      
    // Set the current year only on the client side
    setCurrentYear(new Date().getFullYear());
  }, []);

  return (
    <div className="flex flex-col items-center p-8">
      <h1 className="text-2xl mb-4">Select Vehicle Type and Model Year</h1>
      
      {/* Vehicle makes dropdown */}
      <select 
        className="mb-4 p-2 border"
        onChange={(e) => setSelectedMake(e.target.value)}
        defaultValue=""
      >
        <option value="" disabled>Select Make</option>
        {makes.map((make) => (
          <option key={make.MakeId} value={make.MakeId}>{make.MakeName}</option>
        ))}
      </select>
      
      {/* Model year dropdown */}
      <select 
        className="mb-4 p-2 border"
        onChange={(e) => setSelectedYear(e.target.value)}
        defaultValue=""
      >
        <option value="" disabled>Select Year</option>
        {[...Array(currentYear - 2014).keys()].map((y) => (
          <option key={y} value={2015 + y}>{2015 + y}</option>
        ))}
      </select>
      
      {/* Next button */}
      <Link href={`/result/${selectedMake}/${selectedYear}`}>
        <button 
          disabled={!selectedMake || !selectedYear} 
          className={`p-2 bg-blue-500 text-white rounded ${(!selectedMake || !selectedYear) ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'}`}
        >
          Next
        </button>
      </Link>
    </div>
  );
}