import React from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { AlertTriangle, Share2, Brain } from "lucide-react";

const problemData = [
  {
    title: "The Rise of Fake News",
    icon: <AlertTriangle size={28} className="text-red-500" />,
    description:
      "Emotionally charged headlines are engineered to manipulate you — not inform you. They're fast, viral, and dangerously misleading.",
  },
  {
    title: "Amplified by Algorithms",
    icon: <Share2 size={28} className="text-yellow-500" />,
    description:
      "Social platforms reward engagement. This means outrage and misinformation often reach millions before any correction can catch up.",
  },
  {
    title: "Fueled by Human Bias",
    icon: <Brain size={28} className="text-purple-500" />,
    description:
      "People naturally believe what supports their views. That makes lies feel true, and truth feel suspicious.",
  },
];

const ProblemSection = () => {
  return (
    <section className="relative bg-background py-36 px-6 font-inter overflow-hidden">
      {/* Grid Background */}
      <div className="absolute inset-0 z-0 bg-grid-white/[0.03] pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto text-center">
        {/* Intro Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold text-text font-space mb-6"
        >
          Misinformation Isn’t Just Noise — It’s a Threat
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-lg text-muted max-w-2xl mx-auto mb-20"
        >
          It spreads faster than facts, thrives in emotional environments, and
          silently shapes public opinion. Before you know it, it becomes truth.
        </motion.p>

        {/* Problem Blocks */}
        <div className="grid md:grid-cols-3 gap-8 text-left">
          {problemData.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index, duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-surface border border-border p-8 rounded-3xl shadow-xl hover:shadow-primary/20 transition-all duration-300 group"
            >
              <div className="mb-5 flex items-center gap-3">
                <div className="bg-white/10 p-3 rounded-full">{item.icon}</div>
                <h3 className="text-xl font-semibold font-space text-text group-hover:text-primary transition">
                  {item.title}
                </h3>
              </div>
              <p className="text-muted text-sm leading-relaxed">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;
