import React from "react";
import { Link } from "react-router-dom";

const CallToAction = () => {
  return (
    <section className="bg-background py-24 px-6 text-center">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-space font-semibold text-text mb-4 tracking-tight">
          Stop Guessing. Start Verifying.
        </h2>
        <p className="text-muted text-lg mb-10">
          FactGuard uses explainable AI to analyze digital content, helping you
          make informed decisions in a world full of noise.
        </p>
        <Link
          to="/analyze"
          className="inline-block bg-gradient-to-r from-primary to-secondary text-black font-semibold px-6 py-3 rounded-xl shadow-xl hover:scale-105 transition"
        >
          Analyze Now
        </Link>
      </div>
    </section>
  );
};

export default CallToAction;
