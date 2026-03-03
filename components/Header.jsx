"use client";

import { useState } from "react";
import Link from "next/link";
import Button from "./ui/Button";

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [selected, setSelected] = useState("For sale");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const options = ["For sale", "For rent", "New construction", "Just sold"];

  return (
    <header className="absolute top-0 left-0 w-full z-50 px-6 py-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center relative">
        
        {/* Logo */}
        <Link href="/">
          <img src="/logo.svg" alt="ELOTS" className="h-7" />
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex space-x-8 text-white text-base font-medium absolute left-1/2 transform -translate-x-1/2">
          {["Home", "Buy", "Rent", "Sell", "Find a Home", "Advertise"].map(
            (item) => (
              <Link
                key={item}
                href="#"
                className="hover:text-blue-500 transition"
              >
                {item}
              </Link>
            )
          )}
        </nav>

        {/* Auth Buttons */}
        <div className="hidden md:flex items-center space-x-4">
          <Link
            href="#"
            className="text-white text-base font-medium hover:text-blue-500"
          >
            Log In
          </Link>
          <Button variant="primary" size="sm" type="button">
            Sign Up
          </Button>
        </div>

        {/* Mobile Button */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden text-white"
        >
          {mobileOpen ? (
            <i className="fa-solid fa-xmark text-2xl"></i>
          ) : (
            <i className="fa-solid fa-bars text-2xl"></i>
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden mt-4 bg-black/90 backdrop-blur-lg rounded-2xl p-6 space-y-4 text-white">
          {["Home", "Buy", "Rent", "Sell", "Find a Home", "Advertise"].map(
            (item) => (
              <Link key={item} href="#" className="block hover:text-blue-400">
                {item}
              </Link>
            )
          )}
          <div className="pt-4 border-t border-gray-700 space-y-3">
            <Link href="#" className="block hover:text-blue-400">
              Log In
            </Link>
            <Button variant="primary" size="sm" fullWidth type="button">
              Sign Up
            </Button>
          </div>
        </div>
      )}

      {/* Search Dropdown (You can place this in hero if preferred) */}
      <div className="hidden">
        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-2"
          >
            {selected}
            <i className="fa-solid fa-chevron-down text-xs"></i>
          </button>

          {dropdownOpen && (
            <div className="absolute mt-2 bg-white shadow-xl rounded-xl w-56 p-2">
              {options.map((option) => (
                <button
                  key={option}
                  onClick={() => {
                    setSelected(option);
                    setDropdownOpen(false);
                  }}
                  className={`flex justify-between w-full px-4 py-2 rounded-lg hover:bg-blue-50 ${
                    selected === option
                      ? "text-blue-600 font-semibold"
                      : "text-gray-700"
                  }`}
                >
                  {option}
                  {selected === option && (
                    <i className="fa-solid fa-check text-xs"></i>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
