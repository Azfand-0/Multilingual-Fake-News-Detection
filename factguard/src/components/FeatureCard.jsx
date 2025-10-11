import React from "react";

const FeatureCard = ({ icon, title, description }) => {
  return (
    <div className="bg-surface p-8 rounded-2xl border border-border text-center shadow-lg hover:shadow-teal-500/30 hover:-translate-y-2 hover:scale-105 transform transition duration-300 ease-in-out">
      <div className="text-4xl mb-4 text-primary">{icon}</div>
      <h3 className="text-xl font-semibold mb-2 text-text">{title}</h3>
      <p className="text-muted text-sm leading-relaxed">{description}</p>
    </div>
  );
};

export default FeatureCard;
