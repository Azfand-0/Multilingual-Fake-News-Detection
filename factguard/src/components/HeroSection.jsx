import React from "react";
// src/components/HeroSection.jsx
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="relative bg-background text-text py-24 px-6 text-center overflow-hidden">
      {/* Subtle glowing gradient for visual depth */}
      <div className="absolute mid-[-120px] left-[-120px] w-[320px] h-[320px] bg-primary rounded-full blur-3xl opacity-10 z-0"></div>
      <div className="absolute mid-[-120px] right-[-120px] w-[320px] h-[320px] bg-primary rounded-full blur-3xl opacity-10 z-0"></div>
      <div className="relative z-10 max-w-5xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-space font-bold text-text leading-tight mb-6 tracking-tight">
          FactGuard
          <br />
          <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            AI-Powered Misinformation Detection
          </span>
        </h1>

        <p className="text-lg md:text-xl text-muted mb-10 max-w-3xl mx-auto font-inter">
          Instantly detect misleading headlines, fake news, and deceptive
          articles using advanced AI trained on misinformation patterns.
        </p>

        <div className="flex justify-center gap-4 flex-wrap">
          <Link
            to="/analyze"
            className="bg-gradient-to-r from-primary to-secondary text-black font-semibold px-6 py-3 rounded-xl shadow-lg hover:scale-105 transition-transform duration-300"
          >
            Analyze Now
          </Link>
          <Link
            to="/how-it-works"
            className="bg-surface text-muted border border-border hover:border-primary hover:text-primary font-medium px-6 py-3 rounded-xl transition"
          >
            Learn How It Works
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
