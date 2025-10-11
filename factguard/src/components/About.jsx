import React, { useState } from "react";

const examples = [
  {
    fake: "COVID-19 vaccines cause infertility, new study finds.",
    real: "Scientific consensus confirms vaccines are safe and do not affect fertility.",
  },
  {
    fake: "NASA confirms sun will explode in 2030.",
    real: "NASA has not made such a statement; the sun remains stable for billions of years.",
  },
];

const About = () => {
  const [index, setIndex] = useState(0);
  const nextExample = () => setIndex((index + 1) % examples.length);

  return (
    <section className="bg-background text-text font-inter">
      {/* Hero / Mission */}
      <div className="text-center px-6 py-28">
        <h1 className="text-5xl md:text-6xl font-space font-bold tracking-tight mb-6">
          AI That Helps You See Through the Noise
        </h1>
        <p className="text-lg text-muted max-w-3xl mx-auto leading-relaxed">
          FactGuard is an intelligent misinformation detection system built to
          help users validate what they read — in real-time. We use explainable
          AI to analyze content, provide credibility scores, and help you make
          informed decisions in an era of information overload.
        </p>
      </div>

      {/* Why We Exist */}
      <div className="max-w-6xl mx-auto px-6 py-24 grid md:grid-cols-2 gap-16 items-center">
        <div>
          <h2 className="text-3xl font-space font-bold mb-4">
            The Misinformation Epidemic
          </h2>
          <p className="text-muted leading-relaxed text-base">
            From viral conspiracy theories to deepfakes and AI-generated hoaxes,
            misinformation has evolved — and so must our response. At FactGuard,
            we believe fighting falsehoods begins with trust, transparency, and
            technology that explains itself.
          </p>
          <p className="text-muted mt-4 leading-relaxed text-base">
            That’s why we built a platform that doesn’t just detect fake news,
            but helps you understand the **why** behind it — breaking down the
            logic, tone, sources, and patterns that signal deception.
          </p>
        </div>

        {/* Example Card */}
        <div className="bg-surface p-6 rounded-2xl border border-border shadow-md">
          <p className="text-danger font-semibold text-sm mb-1">
            Detected Misinformation
          </p>
          <p className="italic text-muted mb-4">"{examples[index].fake}"</p>
          <p className="text-success font-semibold text-sm mb-1">
            Verified Statement
          </p>
          <p className="italic text-muted mb-4">"{examples[index].real}"</p>
          <button
            onClick={nextExample}
            className="mt-4 bg-gradient-to-r from-primary to-secondary text-black font-semibold px-5 py-2 rounded-xl shadow hover:scale-105 transition"
          >
            Show Another Example
          </button>
        </div>
      </div>

      {/* What We Do (Feature Grid) */}
      <div className="bg-background py-24 px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-space font-bold mb-6">
          What FactGuard Offers
        </h2>
        <p className="text-muted max-w-2xl mx-auto mb-12 text-lg">
          Designed with transparency and clarity at its core.
        </p>

        <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto text-left">
          <div>
            <h3 className="text-white text-xl font-semibold mb-2">
              Real-Time Detection
            </h3>
            <p className="text-muted text-sm">
              Instantly analyze headlines, links, or content to detect
              misinformation with contextual understanding.
            </p>
          </div>
          <div>
            <h3 className="text-white text-xl font-semibold mb-2">
              Explainable AI Verdicts
            </h3>
            <p className="text-muted text-sm">
              Every detection includes human-readable explanations to help users
              understand credibility concerns.
            </p>
          </div>
          <div>
            <h3 className="text-white text-xl font-semibold mb-2">
              Contextual Scoring
            </h3>
            <p className="text-muted text-sm">
              Our AI evaluates tone, keywords, and citation quality to produce a
              dynamic credibility score.
            </p>
          </div>
          <div>
            <h3 className="text-white text-xl font-semibold mb-2">
              User-Centered Design
            </h3>
            <p className="text-muted text-sm">
              FactGuard is built for clarity — no clutter, no jargon, just
              insights you can use immediately.
            </p>
          </div>
          <div>
            <h3 className="text-white text-xl font-semibold mb-2">
              Privacy by Design
            </h3>
            <p className="text-muted text-sm">
              Your data is never stored or used for profiling. Everything runs
              locally or anonymously unless shared.
            </p>
          </div>
          <div>
            <h3 className="text-white text-xl font-semibold mb-2">
              Built for Citizens, Journalists & Researchers
            </h3>
            <p className="text-muted text-sm">
              Whether you’re fact-checking for a news outlet or just reading
              responsibly — FactGuard has your back.
            </p>
          </div>
        </div>
      </div>

      {/* Our Belief */}
      <div className="text-center py-24 px-6">
        <h2 className="text-3xl md:text-4xl font-space font-bold mb-6">
          We don’t detect lies. We illuminate truth.
        </h2>
        <p className="text-muted max-w-2xl mx-auto text-lg">
          Our belief is simple: trust isn’t earned through black boxes or
          sensational red flags. It’s earned by transparency, precision, and
          tools that put power in people’s hands — not platforms.
        </p>
      </div>

      {/* Timeline (Optional) */}
      <div className="bg-background py-20 px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-space font-bold mb-10">
          How We Got Here
        </h2>

        <div className="max-w-4xl mx-auto space-y-8 text-left border-l-2 border-primary pl-6">
          <div>
            <h4 className="text-white font-bold text-sm uppercase">
              2024 — Problem Defined
            </h4>
            <p className="text-muted text-sm mt-1">
              Our team began exploring the psychological, technical, and
              political impact of misinformation across platforms.
            </p>
          </div>
          <div>
            <h4 className="text-white font-bold text-sm uppercase">
              2025 — Building FactGuard
            </h4>
            <p className="text-muted text-sm mt-1">
              Building as a university final year project and evolving into a
              full platform for real-time detection.
            </p>
          </div>
          <div>
            <h4 className="text-white font-bold text-sm uppercase">
              The Future
            </h4>
            <p className="text-muted text-sm mt-1">
              We're building integrations with browsers, APIs for journalists,
              and tools for academic research.
            </p>
          </div>
        </div>
      </div>

      {/* Final CTA */}
      <div className="text-center py-24 px-6">
        <h2 className="text-3xl md:text-4xl font-space font-bold mb-4">
          Misinformation is scalable. So is truth.
        </h2>
        <p className="text-muted max-w-2xl mx-auto text-lg mb-6">
          Whether you're a curious reader or an investigative reporter,
          FactGuard gives you the tools to check facts and challenge fiction —
          instantly.
        </p>
        <a
          href="/analyze"
          className="inline-block bg-gradient-to-r from-primary to-secondary text-black font-semibold px-6 py-3 rounded-full shadow hover:scale-105 transition"
        >
          Try FactGuard Now
        </a>
      </div>
    </section>
  );
};

export default About;
