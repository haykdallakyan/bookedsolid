"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

function CheckIcon() {
  return (
    <svg className="w-5 h-5 text-[#E87722] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
    </svg>
  );
}

const plans = [
  {
    name: "Website Development",
    setup: "$497",
    monthly: "$47",
    badge: null,
    description: "Get found online with a professional website.",
    features: [
      "5-page professional website",
      "Mobile-first, fast-loading design",
      "Contact form + click-to-call",
      "On-page SEO for local search",
      "Google Business Profile setup",
      "Done-for-you setup — live in 7 days",
    ],
    cta: "Get Started",
    highlighted: false,
  },
  {
    name: "Automation Bundle",
    setup: "$297",
    monthly: "$147",
    badge: "Most Popular",
    description: "3 automations that run on autopilot — zero manual work.",
    features: [
      "Missed call → instant text-back",
      "Quote follow-up (4-touch sequence)",
      "Google review request after every job",
      "Runs from your existing phone number",
      "No apps — fully automatic",
      "One saved job covers the monthly fee",
    ],
    cta: "Get Started",
    highlighted: true,
  },
];

export default function Pricing() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const scrollToContact = () =>
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });

  return (
    <section id="pricing" className="py-20 bg-[#F8F9FA]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        <div className="text-center mb-14">
          <motion.span
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            className="text-[#E87722] text-xs font-bold tracking-widest uppercase"
          >
            Pricing
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="mt-3 text-3xl sm:text-4xl font-extrabold text-[#1B2A4A]"
          >
            Simple, Transparent Pricing
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="mt-4 text-gray-500 text-lg"
          >
            Setup done for you. Everything configured and tested before handoff.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 + i * 0.12, duration: 0.5 }}
              className={`relative rounded-2xl p-8 flex flex-col ${
                plan.highlighted
                  ? "bg-[#1B2A4A] text-white shadow-2xl shadow-navy/20 ring-2 ring-[#E87722]"
                  : "bg-[#F0F4FA] border border-[#D6E0F0] shadow-sm"
              }`}
            >
              {plan.badge && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <span className="bg-[#E87722] text-white text-xs font-bold px-4 py-1.5 rounded-full">
                    {plan.badge}
                  </span>
                </div>
              )}

              <div className="mb-6">
                <h3 className={`text-xl font-bold mb-1 ${plan.highlighted ? "text-white" : "text-[#1B2A4A]"}`}>
                  {plan.name}
                </h3>
                <p className={`text-sm ${plan.highlighted ? "text-gray-300" : "text-gray-500"}`}>
                  {plan.description}
                </p>
              </div>

              <div className="mb-6">
                <div className="flex items-baseline gap-2 mb-1">
                  <span className={`text-4xl font-extrabold ${plan.highlighted ? "text-white" : "text-[#1B2A4A]"}`}>
                    {(plan as {setup: string}).setup}
                  </span>
                  <span className={`text-sm ${plan.highlighted ? "text-gray-300" : "text-gray-400"}`}>
                    setup
                  </span>
                </div>
                <div className="flex items-baseline gap-1">
                  <span className={`text-2xl font-bold ${plan.highlighted ? "text-[#E87722]" : "text-[#E87722]"}`}>
                    {(plan as {monthly: string}).monthly}
                  </span>
                  <span className={`text-sm ${plan.highlighted ? "text-gray-300" : "text-gray-400"}`}>
                    / month
                  </span>
                </div>
              </div>

              <ul className="space-y-3 mb-8 flex-1">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-3">
                    <CheckIcon />
                    <span className={`text-sm ${plan.highlighted ? "text-gray-200" : "text-gray-600"}`}>{f}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={scrollToContact}
                className={`w-full py-4 rounded-xl font-bold text-base transition-colors duration-200 cursor-pointer ${
                  plan.highlighted
                    ? "bg-[#E87722] text-white hover:bg-orange-600"
                    : "bg-[#1B2A4A] text-white hover:bg-navy/90"
                }`}
              >
                {plan.cta}
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
