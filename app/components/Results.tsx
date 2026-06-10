"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const stats = [
  {
    value: "3–4x",
    label: "More quote follow-ups completed",
    sub: "vs. doing it manually",
  },
  {
    value: "60%+",
    label: "Of customers asked for a review respond",
    sub: "when asked at the right moment",
  },
  {
    value: "7 days",
    label: "Or less to go live",
    sub: "website + automations fully set up",
  },
];

export default function Results() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="results" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        <div className="text-center mb-14">
          <motion.span
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            className="text-[#E87722] text-xs font-bold tracking-widest uppercase"
          >
            Results
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="mt-3 text-3xl sm:text-4xl font-extrabold text-[#1B2A4A]"
          >
            What Happens When You Stop Leaving Money on the Table
          </motion.h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.15 + i * 0.12, duration: 0.5 }}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-center"
            >
              <div className="text-5xl font-extrabold text-[#E87722] mb-3">{s.value}</div>
              <div className="text-[#1B2A4A] font-bold text-lg mb-1">{s.label}</div>
              <div className="text-gray-400 text-sm">{s.sub}</div>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="text-center text-xs text-gray-400 mt-8"
        >
          * Based on industry benchmarks and typical client results. Individual results may vary.
        </motion.p>
      </div>
    </section>
  );
}
