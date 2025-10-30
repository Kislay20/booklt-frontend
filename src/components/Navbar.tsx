import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import logo from '../assets/82a78e0996a66aeb4d079ebaeb5cee43da6f1f88.png'; // adjust path if needed

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const currentQuery = queryParams.get('q') || '';

  const [search, setSearch] = useState(currentQuery);

  const handleSearch = () => {
    if (!search.trim()) {
      navigate('/');
      return;
    }
    navigate(`/?q=${encodeURIComponent(search.trim())}`);
  };

  return (
    <div
      className="sticky top-0 flex items-center justify-between px-6 z-50 bg-pageBg"
      // Replaced inline style with bg-pageBg
    >
      {/* Logo section */}
      <Link to="/" className="flex items-center">
        <img
          src={logo}
          alt="Highway Delite Logo"
          className="h-[55px] w-[100px] object-contain"
        />
      </Link>

      {/* Search section */}
      <div className="flex items-center gap-3">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          // Replaced inline style with bg-inputBg
          // Replaced placeholder-[#727272] with placeholder-placeholderText (from config)
          className="h-10 w-96 rounded-md bg-inputBg px-3 text-sm text-gray-700 placeholder-placeholderText focus:outline-none"
          placeholder="Search experiences"
        />
        <button
          onClick={handleSearch}
          // Replaced inline style with bg-brandYellow
          className="px-4 py-2 rounded-md bg-brandYellow font-medium"
        >
          Search
        </button>
      </div>
    </div>
  );
}