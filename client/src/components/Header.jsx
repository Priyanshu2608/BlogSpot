import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu as MenuIcon, X, Search } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { Menu } from "@headlessui/react";
import { signInFailure } from "../redux/user/userSlice";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { currentUser } = useSelector((state) => state.user);
  const user = currentUser?.user || currentUser; // Handle both simple & Google login
  const dispatch = useDispatch();

  const handleLogout = () => {
  localStorage.removeItem("user"); 
  sessionStorage.removeItem("user"); 
  dispatch(signInFailure(null));
};

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

        {/* Desktop Avatar or Sign In */}
        <div className="hidden md:flex items-center">
          {user ? (
            <Menu as="div" className="relative inline-block text-left">
              <Menu.Button className="flex items-center gap-2 focus:outline-none">
                {user?.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt="User Avatar"
                    className="w-9 h-9 rounded-full border border-gray-300 shadow-sm"
                  />
                ) : (
                  <div className="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center text-lg font-semibold shadow-sm border border-gray-300">
                    {(user.displayName?.[0] || user.username?.[0] || "U").toUpperCase()}
                  </div>
                )}
              </Menu.Button>
              <Menu.Items className="absolute right-0 mt-2 w-60 origin-top-right bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg focus:outline-none z-50">
                <div className="px-4 py-3">
                  <p className="text-sm font-medium text-gray-900">
                    {user.displayName || user.username}
                  </p>
                  <p className="text-sm text-gray-500 truncate">
                    {user.email}
                  </p>
                </div>
                <div className="py-1">
                  <Menu.Item>
                    {({ active }) => (
                      <Link
                        to="/dashboard?tab=profile"
                        className={`${active ? "bg-gray-100" : ""} block px-4 py-2 text-sm text-gray-700`}
                      >
                        Profile
                      </Link>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <Link
                        to="/dashboard"
                        className={`${active ? "bg-gray-100" : ""} block px-4 py-2 text-sm text-gray-700`}
                      >
                        Dashboard
                      </Link>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <Link to="/signin">
                      <button
                        onClick={handleLogout}
                        className={`${active ? "bg-gray-100" : ""} block w-full text-left px-4 py-2 text-sm text-red-600`}
                      >
                        Logout
                      </button>
                      </Link>
                    )}
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Menu>
          ) : (
            <Link to="/signin">
              <span className="text-blue-600 border border-blue-600 px-4 py-2 rounded-full font-medium hover:bg-blue-600 hover:text-white transition">
                Sign In
              </span>
            </Link>
          )}
        </div>

        {/* Burger Menu */}
        <button
          className="md:hidden text-blue-700 focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={28} /> : <MenuIcon size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden px-4 pb-4 bg-blue-50 border-t border-blue-200">
          <nav className="flex flex-col gap-4 py-2 text-gray-700 font-medium">
            <Link to="/" onClick={() => setIsMenuOpen(false)}>Home</Link>
            <Link to="/about" onClick={() => setIsMenuOpen(false)}>About</Link>
            <Link to="/project" onClick={() => setIsMenuOpen(false)}>Project</Link>

            {user ? (
              <>
                <div className="border-t pt-3">
                  <div className="font-semibold text-gray-800">{user.displayName || user.username}</div>
                  <div className="text-sm text-gray-500 mb-2">{user.email}</div>
                </div>
                <Link to="/dashboard?tab=profile" onClick={() => setIsMenuOpen(false)}>Profile</Link>
                <Link to="/dashboard" onClick={() => setIsMenuOpen(false)}>Dashboard</Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMenuOpen(false);
                  }}
                  className="text-left text-red-600"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link to="/signin" onClick={() => setIsMenuOpen(false)}>
                <span className="block text-center border border-blue-600 text-blue-600 py-2 rounded-full hover:bg-blue-100 transition">
                  Sign In
                </span>
              </Link>
            )}

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
