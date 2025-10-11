// src/components/ScrollToTop.jsx
import React, { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import { FiArrowUp } from "react-icons/fi";

const ScrollToTop = ({ modalOpen = false }) => {
  const { pathname } = useLocation();
  const [visible, setVisible] = useState(false);
  const lastScrollY = useRef(0);
  const inactivityTimer = useRef(null);
  const [isUserActive, setIsUserActive] = useState(true);

  // Instant scroll when route changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    const resetInactivityTimer = () => {
      if (inactivityTimer.current) clearTimeout(inactivityTimer.current);
      inactivityTimer.current = setTimeout(() => {
        setIsUserActive(false);
      }, 4000);
    };

    const handleUserActivity = () => {
      setIsUserActive(true);
      resetInactivityTimer();
    };

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (modalOpen) {
        setVisible(false);
        return;
      }

      if (currentScrollY > 300 && currentScrollY > lastScrollY.current) {
        setVisible(true);
        setIsUserActive(true);
        resetInactivityTimer();
      } else {
        setVisible(false);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("mousemove", handleUserActivity);
    window.addEventListener("touchstart", handleUserActivity);

    resetInactivityTimer();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleUserActivity);
      window.removeEventListener("touchstart", handleUserActivity);
      if (inactivityTimer.current) clearTimeout(inactivityTimer.current);
    };
  }, [modalOpen]);

  useEffect(() => {
    if (modalOpen) setVisible(false);
  }, [modalOpen]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const shouldShow = visible && isUserActive && !modalOpen;

  return (
    <div
      className={`
        fixed bottom-6 right-6 md:bottom-8 md:right-8 z-50 transition-all duration-300
        ${shouldShow ? "opacity-100 scale-100" : "opacity-0 scale-0 pointer-events-none"}
      `}
    >
      <button
        onClick={scrollToTop}
        aria-label="Scroll to top"
        className="p-3 rounded-full bottom-6 right-6 bg-primary text-black  shadow-lg hover:scale-105 transition"
      >
        <FiArrowUp className="text-xl" />
      </button>
    </div>
  );
};

export default ScrollToTop;
