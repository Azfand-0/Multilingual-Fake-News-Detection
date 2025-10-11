import { Menu, X } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "How It Works", path: "/how-it-works" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },

    // ✅ NEW HISTORY LINK
    { name: "History", path: "/history" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [menuOpen]);

  return (
    <header className="sticky top-4 z-50 px-4 sm:px-6 lg:px-8">
      <div
        className={`relative flex h-[52px] sm:h-[64px]  items-center justify-between rounded-2xl border px-4 lg:px-6 backdrop-blur-md transition-all duration-500
        ${
          scrolled
            ? "bg-background border-[#3b3b3b] shadow-[0_8px_40px_rgba(0,255,255,0.06)]"
            : "bg-transparent border-transparent shadow-none"
        }`}
      >
        {scrolled && (
          <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-[70%] h-10 bg-[radial-gradient(ellipse_at_center,_rgba(0,240,181,0.2)_0%,_transparent_70%)] blur-2xl pointer-events-none z-[-1]" />
        )}

        <Link
          to="/"
          className={`text-lg font-semibold tracking-tight transition-colors ${
            scrolled ? "text-[#00F0B5]" : "text-white"
          }`}
        >
          FactGuard
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`transition-colors duration-300 p-2 rounded-md motion-reduce:transition-none 
        hover:bg-[#1A1A1A]/30 dark:hover:bg-[#EDEDED]/10
        ${
          location.pathname === link.path
            ? "text-[#00F0B5] underline underline-offset-4"
            : scrolled
            ? "text-white hover:text-[#00F0B5]"
            : "text-white/80 hover:text-white"
        }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-4">
          {user ? (
            <button
              onClick={logout}
              className="px-4 py-2 text-sm rounded-lg bg-red-500 hover:bg-red-600 text-white transition"
            >
              Logout
            </button>
          ) : (
            <Link
              to="/login"
              className="px-4 py-2 text-sm rounded-lg font-medium shadow transition-all duration-300
              bg-background/5 text-white border border-transparent
              hover:border-[#00F0B5] hover:shadow-[0_0_1px_#00F0B5]"
            >
              Sign in
            </Link>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="lg:hidden text-white"
          onClick={() => setMenuOpen(true)}
        >
          <Menu size={24} />
        </button>
      </div>

      {/* Fullscreen Mobile Drawer */}
      {menuOpen && (
        <div className="fixed inset-0 z-50 bg-black text-white flex flex-col justify-between px-8 py-8">
          {/* Top Row: Logo + Close Button */}
          <div className="flex justify-between items-center">
            <Link
              to="/"
              className="text-lg font-semibold tracking-tight text-[#00F0B5]"
              onClick={() => setMenuOpen(false)}
            >
              FactGuard
            </Link>
            <button
              onClick={() => setMenuOpen(false)}
              className="text-white hover:text-[#00F0B5] transition"
            >
              <X size={24} />
            </button>
          </div>

          {/* Nav Links Close to Top */}
          <div className="flex flex-col gap-6 mt-10">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setMenuOpen(false)}
                className={`text-[2rem] leading-[2.5rem] font-semibold tracking-tight ${
                  location.pathname === link.path
                    ? "text-[#00F0B5]"
                    : "text-white hover:text-[#00F0B5] transition"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="pt-8">
            {user ? (
              <button
                onClick={() => {
                  logout();
                  setMenuOpen(false);
                }}
                className="w-full rounded-lg border border-red-500 text-red-500 py-3 text-sm font-semibold hover:bg-red-600/10 transition shadow-[0_0_10px_#ff3b3b50]"
              >
                Logout
              </button>
            ) : (
              <Link
                to="/login"
                onClick={() => setMenuOpen(false)}
                className="w-full inline-flex justify-center items-center rounded-lg border border-[#00F0B5] text-[#00F0B5] py-3 text-sm font-semibold hover:bg-[#00F0B5]/10 transition shadow-[0_0_10px_#00F0B5]"
              >
                Sign in
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;

