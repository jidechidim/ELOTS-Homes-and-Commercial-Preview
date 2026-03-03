"use client";

import { useState } from "react";
import Link from "next/link";

export default function Footer() {
  const [email, setEmail] = useState("");
  const year = new Date().getFullYear();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    alert("Subscribed successfully!");
    setEmail("");
  };

  return (
    <footer className="bg-black text-white py-16 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8">
        {/* Brand */}
        <div>
          <img src="/logo.svg" alt="ELOTS" className="h-7 mb-6" />
          <p className="text-gray-400 text-sm leading-relaxed">
            Your trusted partner in finding the perfect property.
          </p>
        </div>

        {/* Subscribe */}
        <div className="lg:col-span-2">
          <h4 className="font-bold mb-6">Subscribe</h4>
          <form
            onSubmit={handleSubmit}
            className="flex bg-gray-800 rounded-lg overflow-hidden"
          >
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-gray-800 px-4 py-2 w-full outline-none text-sm"
            />
            <button
              type="submit"
              className="bg-blue-600 px-4 flex items-center justify-center hover:bg-blue-700 transition"
            >
              <i className="fa-solid fa-arrow-right"></i>
            </button>
          </form>
        </div>

        {/* Column */}
        <div>
          <h4 className="font-bold mb-6">Company</h4>
          <ul className="space-y-3 text-gray-400 text-sm">
            {["About", "Careers", "Blog"].map((item) => (
              <li key={item}>
                <Link href="#" className="hover:text-white transition">
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Details */}
        <div>
          <h4 className="font-bold mb-6">Contact</h4>
          <ul className="space-y-3 text-gray-400 text-sm">
            <li>
              <span className="text-white">Phone:</span>{" "}
              <a href="tel:+2348033238539" className="hover:text-white transition">
                +234 803 323 8539
              </a>
            </li>
            <li>
              <span className="text-white">Email:</span>{" "}
              <a
                href="mailto:info@elotshomes.com"
                className="hover:text-white transition"
              >
                info@elotshomes.com
              </a>
            </li>
            <li>
              <span className="text-white">Address:</span> Abuja, Nigeria
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-gray-800 mt-16 pt-8 text-center text-gray-500 text-sm">
        &copy; {year} ELOTS LTD. All rights reserved.
      </div>
    </footer>
  );
}
