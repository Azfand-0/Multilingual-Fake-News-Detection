import React from "react";
// src/components/HowItWorks.jsx
import { FileInput, Settings, BrainCog, ShieldCheck } from "lucide-react";

const steps = [
  {
    icon: FileInput,
    title: "Step 1: Input Submission",
    description:
      "Begin by pasting a news headline, blog snippet, or URL into FactGuard. Our platform accepts various input formats to ensure maximum flexibility.",
  },
  {
    icon: Settings,
    title: "Step 2: Smart Preprocessing",
    description:
      "Using advanced NLP techniques, we clean and structure your input — removing noise, detecting key entities, and segmenting it for better AI analysis.",
  },
  {
    icon: BrainCog,
    title: "Step 3: AI-Powered Fact Analysis",
    description:
      "Our AI model — trained on credible datasets — evaluates bias, sentiment, source reliability, citation presence, and linguistic indicators of misinformation.",
  },
  {
    icon: ShieldCheck,
    title: "Step 4: Transparent Verdict",
    description:
      "You receive a credibility score, a verdict (e.g. 'Likely False'), and a transparent explanation of *why* the claim was flagged or verified — all within seconds.",
  },
];

const HowItWorks = () => {
  return (
    <section className="bg-[#0D0D0D] text-white px-6 py-28 font-inter">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-space font-bold mb-6">
          How FactGuard Detects Misinformation
        </h2>
        <p className="text-muted text-lg max-w-2xl mx-auto mb-16">
          Behind every result lies a rigorous multi-step pipeline powered by AI,
          transparency, and trust.
        </p>
      </div>

      <div className="max-w-4xl mx-auto space-y-16 relative border-l border-white/10 pl-6">
        {steps.map((step, index) => {
          const Icon = step.icon;
          return (
            <div key={index} className="relative">
              {/* Dot and line */}
              <div className="absolute -left-[13px] top-1 w-6 h-6 bg-gradient-to-br from-primary to-secondary rounded-full border-2 border-[#0D0D0D] shadow-lg" />

              {/* Content */}
              <div className="ml-4 pl-4">
                <div className="flex items-center gap-4 mb-2">
                  <Icon size={28} className="text-primary" />
                  <h3 className="text-2xl font-semibold font-space">
                    {step.title}
                  </h3>
                </div>
                <p className="text-muted text-base leading-relaxed max-w-2xl">
                  {step.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="text-center mt-20">
        <a
          href="/analyze"
          className="inline-flex items-center gap-2 bg-gradient-to-r from-primary to-secondary text-black font-semibold px-6 py-3 rounded-full shadow hover:scale-105 transition"
        >
          Try a Live Example →
        </a>
      </div>
    </section>
  );
};

export default HowItWorks;
