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
    name: "Starter",
    price: "$497",
    period: "one-time",
    badge: null,
    description: "Get found online with a professional website.",
    features: [
      "5-page professional website",
      "Mobile-first, fast-loading design",
      "Contact form included",
      "Basic on-page SEO",
      "Google Business Profile setup",
      "Done-for-you setup",
      "No monthly fees",
    ],
    cta: "Get Started",
    highlighted: false,
  },
  {
    name: "Pro",
    price: "$797",
    period: "one-time",
    badge: "Most Popular",
    description: "Website + full automation suite. The complete machine.",
    features: [
      "Everything in Starter",
      "SMS quote follow-up automation",
      "4-touch follow-up sequence",
      "Google review request automation",
      "Owner SMS command setup (QUOTE / DONE)",
      "Testing & handoff included",
      "No monthly fees. No software to learn.",
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
            Setup done for you. No monthly fees. No software to learn.
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
                <span className={`text-5xl font-extrabold ${plan.highlighted ? "text-white" : "text-[#1B2A4A]"}`}>
                  {plan.price}
                </span>
                <span className={`ml-2 text-sm ${plan.highlighted ? "text-gray-300" : "text-gray-400"}`}>
                  {plan.period}
                </span>
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
