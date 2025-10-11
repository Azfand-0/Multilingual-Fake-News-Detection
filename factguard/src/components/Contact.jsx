// src/pages/Contact.jsx
import React from "react";
import { toast } from "react-hot-toast";
import { Mail, Phone, MapPin, Send } from "lucide-react";

const ContactItem = ({ icon, title, line1, line2 }) => (
  <div className="flex items-start gap-4">
    {icon}
    <div>
      <p className="text-white font-medium">{title}</p>
      <p className="text-muted">{line1}</p>
      {line2 && <p className="text-muted">{line2}</p>}
    </div>
  </div>
);

const Contact = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success("Message sent successfully!");
  };

  return (
    <section className="min-h-screen px-6 py-28 bg-[#0D0D0D] text-white font-inter">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 bg-[#1C1C1E] border border-[#2C2C2E] rounded-3xl shadow-xl p-10 md:p-16">
        {/* Left: Contact Info */}
        <div className="flex flex-col justify-between">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold font-space mb-6 text-white">
              Get in Touch
            </h2>
            <p className="text-muted text-base mb-8 max-w-md">
              Questions, feedback, or partnership ideas? We’d love to hear from
              you.
            </p>

            <div className="space-y-6 text-sm">
              <ContactItem
                icon={<MapPin className="text-primary" />}
                title="Location"
                line1="Lahore, Punjab"
                line2="Pakistan"
              />
              <ContactItem
                icon={<Mail className="text-primary" />}
                title="Email us"
                line1="factguard.ai@gmail.com"
              />
              <ContactItem
                icon={<Phone className="text-primary" />}
                title="Phone"
                line1="+92 300 1234567"
              />
            </div>
          </div>

          <p className="mt-10 text-xs text-muted">
            Available Mon–Fri, 9AM–6PM (PKT)
          </p>
        </div>

        {/* Right: Contact Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Full Name"
              required
              className="bg-[#111] border border-[#333] rounded-lg px-4 py-3 text-sm placeholder-muted text-white focus:ring-2 focus:ring-primary focus:outline-none"
            />
            <input
              type="email"
              placeholder="Email Address"
              required
              className="bg-[#111] border border-[#333] rounded-lg px-4 py-3 text-sm placeholder-muted text-white focus:ring-2 focus:ring-primary focus:outline-none"
            />
          </div>

          <textarea
            placeholder="Your Message..."
            rows="5"
            required
            className="bg-[#111] border border-[#333] rounded-lg px-4 py-3 text-sm placeholder-muted text-white focus:ring-2 focus:ring-primary focus:outline-none"
          />

          <button
            type="submit"
            className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-primary to-secondary text-black font-semibold px-6 py-3 rounded-xl shadow hover:scale-105 transition"
          >
            <Send size={18} /> Send Message
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
