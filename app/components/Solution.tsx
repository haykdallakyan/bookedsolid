"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

function FlowStep({ label, sub, accent }: { label: string; sub?: string; accent?: boolean }) {
  return (
    <div className={`flex items-start gap-3 ${accent ? "pl-6" : ""}`}>
      <div className={`mt-1 w-2 h-2 rounded-full flex-shrink-0 ${accent ? "bg-[#E87722]" : "bg-white/40"}`} />
      <div>
        <p className={`text-sm font-semibold ${accent ? "text-[#E87722]" : "text-white"}`}>{label}</p>
        {sub && <p className="text-xs text-gray-300 mt-0.5">{sub}</p>}
      </div>
    </div>
  );
}

function SmsPhoneMockup() {
  return (
    <div className="relative mx-auto w-56 h-[420px]">
      <div className="absolute inset-0 bg-white/10 rounded-[36px] border-2 border-white/20 backdrop-blur-sm" />
      <div className="absolute inset-[5px] bg-[#0f1e35] rounded-[31px] overflow-hidden flex flex-col">
        <div className="bg-[#1B2A4A] px-3 py-2 flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-[#E87722] flex items-center justify-center text-white text-[9px] font-bold">CM</div>
          <div>
            <p className="text-white text-[10px] font-semibold">Auto-SMS</p>
            <p className="text-gray-400 text-[8px]">Automation</p>
          </div>
        </div>
        <div className="flex-1 p-3 flex flex-col gap-2">
          {[
            { from: "owner", text: "QUOTE +16471234567 2500" },
            { from: "system", text: "✓ Quote record created. Follow-up sequence started." },
            { from: "customer", text: "Hi! You have a quote for $2,500. Reply YES to confirm or call us." },
            { from: "owner", text: "DONE +16471234567" },
            { from: "customer", text: "Thanks for choosing us! Mind leaving a Google review? ⭐ bit.ly/review" },
          ].map((msg, i) => (
            <div key={i} className={`flex ${msg.from === "owner" ? "justify-end" : "justify-start"}`}>
              <div
                className={`text-[9px] rounded-xl px-2.5 py-1.5 max-w-[85%] ${
                  msg.from === "owner"
                    ? "bg-[#1B2A4A] text-white rounded-tr-sm"
                    : msg.from === "system"
                    ? "bg-white/10 text-gray-300 rounded-tl-sm"
                    : "bg-[#E87722] text-white rounded-tl-sm"
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Solution() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="py-20 bg-[#1B2A4A]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14" ref={ref}>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-3xl sm:text-4xl font-extrabold text-white"
          >
            3 Automations.{" "}
            <span className="text-[#E87722]">Zero Manual Work.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.15, duration: 0.5 }}
            className="mt-4 text-gray-300 text-lg max-w-xl mx-auto"
          >
            Three systems running in the background — catching missed leads,
            closing quotes, and collecting reviews — automatically.
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 items-start">
          {/* Flow diagram */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="space-y-6 lg:col-span-2"
          >
            {/* Missed Call flow */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-5">
                <div className="bg-[#E87722] text-white text-xs font-bold px-3 py-1 rounded-full">
                  AUTO 1
                </div>
                <code className="text-[#E87722] font-mono text-sm font-bold">
                  MISSED CALL → TEXT-BACK
                </code>
              </div>
              <div className="space-y-3">
                <FlowStep label="Customer calls — goes unanswered" />
                <FlowStep label="Text fires automatically in under 10 seconds" accent />
                <FlowStep label="&ldquo;Hi! Sorry we missed you — we&apos;re on a job. We&apos;ll call you back shortly.&rdquo;" />
                <FlowStep label="Lead stays warm instead of calling your competitor" accent />
              </div>
            </div>

            {/* Quote flow */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-5">
                <div className="bg-[#E87722] text-white text-xs font-bold px-3 py-1 rounded-full">
                  AUTO 2
                </div>
                <code className="text-[#E87722] font-mono text-sm font-bold">
                  QUOTE +16471234567 2500
                </code>
              </div>
              <div className="space-y-3">
                <FlowStep label="Quote record created in your system" />
                <FlowStep label="Confirmation SMS sent to customer instantly" />
                <FlowStep label="4-touch follow-up sequence starts automatically" accent />
                <div className="pl-9 space-y-1.5">
                  {["Day 1 — First follow-up", "Day 4 — Second touch", "Day 8 — Check-in", "Day 14 — Final nudge"].map((d) => (
                    <p key={d} className="text-[11px] text-gray-400">{d}</p>
                  ))}
                </div>
              </div>
            </div>

            {/* Done flow */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-5">
                <div className="bg-[#E87722] text-white text-xs font-bold px-3 py-1 rounded-full">
                  AUTO 3
                </div>
                <code className="text-[#E87722] font-mono text-sm font-bold">
                  DONE +16471234567
                </code>
              </div>
              <div className="space-y-3">
                <FlowStep label="Job marked complete" />
                <FlowStep label="60 min later: personalized Google review request sent" accent />
                <FlowStep label="Customer clicks link → leaves your review" />
              </div>
            </div>
          </motion.div>

          {/* Phone mockup */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="flex justify-center"
          >
            <SmsPhoneMockup />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
