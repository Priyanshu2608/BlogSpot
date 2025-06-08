import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Search } from "lucide-react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-gradient-to-r from-blue-50 to-blue-100 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-bold text-blue-700 font-serif tracking-tight"
        >
          BlogSpot
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8 text-gray-700 font-medium">
          <Link to="/" className="hover:text-blue-600 transition">Home</Link>
          <Link to="/about" className="hover:text-blue-600 transition">About</Link>
          <Link to="/project" className="hover:text-blue-600 transition">Project</Link>
        </nav>

        {/* Search */}
        <div className="hidden lg:flex relative w-64">
          <input
            type="text"
            placeholder="Search articles..."
            className="w-full py-2 pl-4 pr-10 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Search className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-500 w-5 h-5" />
        </div>

        {/* Sign In Button */}
        <div className="hidden md:flex items-center">
          <Link to="/signin">
            <span className="text-blue-600 border border-blue-600 px-4 py-2 rounded-full font-medium hover:bg-blue-600 hover:text-white transition">
              Sign In
            </span>
          </Link>
        </div>

        {/* Burger Menu */}
        <button
          className="md:hidden text-blue-700 focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden px-4 pb-4 bg-blue-50 border-t border-blue-200">
          <nav className="flex flex-col gap-4 py-2 text-gray-700 font-medium">
            <Link to="/" onClick={() => setIsMenuOpen(false)}>Home</Link>
            <Link to="/about" onClick={() => setIsMenuOpen(false)}>About</Link>
            <Link to="/project" onClick={() => setIsMenuOpen(false)}>Project</Link>

            <div className="mt-2">
              <Link
                to="/signin"
                className="block text-center border border-blue-600 text-blue-600 py-2 rounded-full hover:bg-blue-100 transition"
                onClick={() => setIsMenuOpen(false)}
              >
                Sign In
              </Link>
            </div>

            <div className="relative mt-3">
              <input
                type="text"
                placeholder="Search..."
                className="w-full py-2 pl-4 pr-10 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Search className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-500 w-5 h-5" />
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
