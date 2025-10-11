import React from "react";
// src/components/FeatureSection.jsx
import {
  ShieldCheck,
  BarChart3,
  BookOpenCheck,
  AlertTriangle,
} from "lucide-react";

const features = [
  {
    icon: <ShieldCheck size={24} className="text-primary inline-block mr-2" />,
    title: "Real-time Misinformation Detection",
    description:
      "Analyze headlines or URLs instantly using AI models trained on verified, diverse datasets.",
  },
  {
    icon: <BarChart3 size={24} className="text-primary inline-block mr-2" />,
    title: "Credibility Scoring System",
    description:
      "View a transparent credibility score backed by NLP analysis and fact-checked sources.",
  },
  {
    icon: (
      <BookOpenCheck size={24} className="text-primary inline-block mr-2" />
    ),
    title: "Explainable AI",
    description:
      "Understand the reasoning behind every verdict — see emotional triggers, source bias & more.",
  },
  {
    icon: (
      <AlertTriangle size={24} className="text-primary inline-block mr-2" />
    ),
    title: "Bias & Emotion Detection",
    description:
      "Identify emotionally manipulative or ideologically biased phrasing in seconds.",
  },
];

const FeatureSection = () => {
  return (
    <section className="bg-background py-24 px-6">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-space font-bold text-text mb-6">
          Core Features of FactGuard
        </h2>
        <p className="text-lg text-muted mb-16 max-w-2xl mx-auto font-inter">
          Powered by AI and NLP, FactGuard helps you spot misinformation with
          confidence and clarity.
        </p>

        {/* Vertical Timeline */}
        <div className="relative">
          {/* Vertical Line in Center */}
          <div className="absolute top-0 left-1/2 w-[2px] h-full bg-border -translate-x-1/2"></div>

          <div className="space-y-16">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`flex flex-col md:flex-row items-center md:items-start ${
                  index % 2 === 0 ? "md:justify-start" : "md:justify-end"
                } relative`}
              >
                <div
                  className={`w-full md:w-1/2 px-4 text-left ${
                    index % 2 === 0 ? "md:text-right" : "md:text-left"
                  }`}
                >
                  <h3 className="text-lg font-semibold text-text mb-2 font-space">
                    {feature.icon}
                    {feature.title}
                  </h3>
                  <p className="text-sm text-muted font-inter">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
