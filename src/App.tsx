import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import DetailsPage from './pages/DetailsPage';
import CheckoutPage from './pages/CheckoutPage';
import ResultPage from './pages/ResultPage';

export default function App() {
  return (
    // Replaced inline style with bg-pageBg
    <div className="min-h-screen bg-pageBg">
      {/* Full-width navbar background */}
      <div
        // Replaced inline style with bg-pageBg
        className="sticky top-0 z-50 shadow-lg bg-pageBg"
      >
        <div className="max-w-6xl mx-auto px-6 py-4">
          <Navbar />
        </div>
      </div>

      {/* Main content container */}
      <div className="max-w-6xl mx-auto px-6 py-10">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/experience/:id" element={<DetailsPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/result" element={<ResultPage />} />
        </Routes>
      </div>
    </div>
  );
}