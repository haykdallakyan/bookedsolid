"use client";

import { useState, useEffect } from "react";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white shadow-md" : "bg-white/95 backdrop-blur-sm"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <span className="text-[#1B2A4A] font-bold text-lg tracking-tight">
            The Conversion Machine
          </span>

          <div className="hidden md:flex items-center gap-8">
            {[
              { label: "How It Works", id: "how-it-works" },
              { label: "Results", id: "results" },
              { label: "Pricing", id: "pricing" },
              { label: "Contact", id: "contact" },
            ].map(({ label, id }) => (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                className="text-[#1B2A4A] font-medium text-sm hover:text-[#E87722] transition-colors duration-200 cursor-pointer"
              >
                {label}
              </button>
            ))}
            <button
              onClick={() => scrollTo("contact")}
              className="bg-[#E87722] text-white px-5 py-2 rounded-lg font-semibold text-sm hover:bg-orange-600 transition-colors duration-200 cursor-pointer"
            >
              Get Started
            </button>
          </div>

          {/* Mobile CTA only */}
          <button
            onClick={() => scrollTo("contact")}
            className="md:hidden bg-[#E87722] text-white px-4 py-2 rounded-lg font-semibold text-sm cursor-pointer"
          >
            Get Started
          </button>
        </div>
      </div>
    </nav>
  );
}
