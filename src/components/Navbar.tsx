import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Search } from 'lucide-react'; // optional icon
import logo from '../assets/82a78e0996a66aeb4d079ebaeb5cee43da6f1f88.png';

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const currentQuery = queryParams.get('q') || '';

  const [search, setSearch] = useState(currentQuery);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);

  const handleSearch = () => {
    if (!search.trim()) {
      navigate('/');
      return;
    }
    navigate(`/?q=${encodeURIComponent(search.trim())}`);
    if (mobileSearchOpen) setMobileSearchOpen(false);
  };

  return (
    <div className="sticky top-0 z-50 bg-pageBg">
      <div className="flex items-center justify-between px-4 sm:px-6 py-3">
        {/* --- Left: Logo --- */}
        <Link to="/" className="flex items-center">
          <img
            src={logo}
            alt="Highway Delite Logo"
            className="h-[45px] sm:h-[55px] w-auto object-contain"
          />
        </Link>

        {/* --- Right: Search (Desktop) --- */}
        <div className="hidden sm:flex items-center gap-2">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            className="h-10 w-72 lg:w-96 rounded-md bg-inputBg px-3 text-sm text-gray-700 placeholder-placeholderText focus:outline-none"
            placeholder="Search experiences"
          />
          <button
            onClick={handleSearch}
            className="px-4 py-2 rounded-md bg-brandYellow hover:bg-brandYellow-hover text-darkText font-medium transition"
          >
            Search
          </button>
        </div>

        {/* --- Mobile Search Toggle --- */}
        <button
          onClick={() => setMobileSearchOpen(!mobileSearchOpen)}
          className="sm:hidden p-2 rounded-md bg-brandYellow hover:bg-brandYellow-hover text-darkText"
        >
          <Search size={18} />
        </button>
      </div>

      {/* --- Mobile Search Bar --- */}
      {mobileSearchOpen && (
        <div className="sm:hidden px-4 pb-3 flex items-center gap-2">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            className="flex-1 h-10 rounded-md bg-inputBg px-3 text-sm text-gray-700 placeholder-placeholderText focus:outline-none"
            placeholder="Search experiences"
          />
          <button
            onClick={handleSearch}
            className="px-3 py-2 rounded-md bg-brandYellow hover:bg-brandYellow-hover text-darkText font-medium transition"
          >
            Go
          </button>
        </div>
      )}
    </div>
  );
}
