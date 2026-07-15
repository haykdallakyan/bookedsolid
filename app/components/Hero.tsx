"use client";

import { motion, type Variants } from "framer-motion";
import { useState, useEffect } from "react";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.5, ease: "easeOut" as const },
  }),
};

type MsgFrom = "owner" | "system" | "customer";

const CHAT: { from: MsgFrom; text: string }[] = [
  { from: "owner",    text: "QUOTE +16471234567 2500" },
  { from: "system",   text: "✓ Quote sent! Mike will receive a follow-up in 24 hours." },
  { from: "customer", text: "Hi Mike! We sent you a quote for $2,500. Any questions? Reply YES to confirm." },
  { from: "owner",    text: "DONE +16471234567" },
  { from: "customer", text: "Thanks Mike! Happy with the service? Leave us a Google review: bit.ly/review ⭐" },
];

function TypingDots({ align }: { align: "left" | "right" }) {
  return (
    <motion.div
      className={`flex ${align === "right" ? "justify-end" : "justify-start"}`}
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
    >
      <div className="bg-white border border-gray-200 rounded-2xl px-3 py-2 shadow-sm flex gap-1 items-center">
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="block w-1.5 h-1.5 rounded-full bg-gray-400"
            animate={{ y: [0, -3, 0] }}
            transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.15 }}
          />
        ))}
      </div>
    </motion.div>
  );
}

function MessageBubble({ msg }: { msg: { from: MsgFrom; text: string } }) {
  const isRight = msg.from === "owner";
  return (
    <motion.div
      className={`flex ${isRight ? "justify-end" : "justify-start"}`}
      initial={{ opacity: 0, x: isRight ? 14 : -14 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
    >
      <div
        className={`text-[10px] rounded-2xl px-3 py-2 max-w-[85%] shadow-sm ${
          msg.from === "owner"
            ? "bg-[#1B2A4A] text-white rounded-tr-sm"
            : msg.from === "system"
            ? "bg-white border border-gray-200 text-gray-700 rounded-tl-sm"
            : "bg-[#E87722] text-white rounded-tl-sm"
        }`}
      >
        {msg.text}
      </div>
    </motion.div>
  );
}

function PhoneMockup() {
  const [visibleCount, setVisibleCount] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [cycleKey, setCycleKey] = useState(0);

  useEffect(() => {
    const TYPING_MS  = 1100;
    const PAUSE_MS   = 700;
    const LOOP_PAUSE = 2500;

    let t: ReturnType<typeof setTimeout>;

    const runStep = (index: number) => {
      if (index >= CHAT.length) {
        t = setTimeout(() => {
          setVisibleCount(0);
          setIsTyping(false);
          t = setTimeout(() => setCycleKey((k) => k + 1), 400);
        }, LOOP_PAUSE);
        return;
      }
      setIsTyping(true);
      t = setTimeout(() => {
        setVisibleCount(index + 1);
        setIsTyping(false);
        t = setTimeout(() => runStep(index + 1), PAUSE_MS);
      }, TYPING_MS);
    };

    t = setTimeout(() => runStep(0), 600);
    return () => clearTimeout(t);
  }, [cycleKey]);

  const nextFrom = CHAT[visibleCount]?.from;
  const typingAlign = nextFrom === "owner" ? "right" : "left";

  return (
    <div className="relative mx-auto w-64 h-[480px]">
      {/* Phone frame */}
      <div className="absolute inset-0 bg-[#1B2A4A] rounded-[40px] shadow-2xl border-4 border-[#1B2A4A]" />
      <div className="absolute inset-[6px] bg-white rounded-[34px] overflow-hidden flex flex-col">
        {/* Status bar */}
        <div className="bg-gray-100 px-4 pt-3 pb-2 flex justify-between items-center text-[10px] text-gray-500">
          <span>9:41</span>
          <div className="w-16 h-2 bg-[#1B2A4A] rounded-full" />
          <span>100%</span>
        </div>
        {/* SMS header */}
        <div className="bg-[#1B2A4A] px-3 py-2 flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-[#E87722] flex items-center justify-center text-white text-xs font-bold">
            CM
          </div>
          <div>
            <p className="text-white text-xs font-semibold">Conversion Machine</p>
            <p className="text-gray-300 text-[9px]">Automation System</p>
          </div>
        </div>
        {/* Animated messages */}
        <div className="flex-1 bg-gray-50 p-3 flex flex-col gap-2 overflow-hidden">
          {CHAT.slice(0, visibleCount).map((msg, i) => (
            <MessageBubble key={i} msg={msg} />
          ))}
          {isTyping && <TypingDots align={typingAlign} />}
        </div>
      </div>
      {/* Home button */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 w-20 h-1 bg-gray-400 rounded-full" />
    </div>
  );
}

export default function Hero() {
  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section className="bg-[#F8F9FA] pt-28 pb-16 flex items-center">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Copy */}
          <div>
            <motion.div
              custom={0}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
            >
              <span className="inline-block bg-orange-100 text-[#E87722] text-xs font-semibold tracking-widest uppercase px-3 py-1 rounded-full mb-6">
                GTA Local Business Growth
              </span>
            </motion.div>

            <motion.h1
              custom={1}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="text-4xl sm:text-5xl lg:text-[56px] font-extrabold text-[#1B2A4A] leading-tight mb-6"
            >
              Stop Losing Quotes. Start Getting Reviews.{" "}
              <span className="text-[#E87722]">Automatically.</span>
            </motion.h1>

            <motion.p
              custom={2}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="text-gray-500 text-lg leading-relaxed mb-8 max-w-xl"
            >
              We build websites and 3 SMS automations for GTA local businesses —
              so you never miss a lead, close more quotes, and collect more
              5-star reviews, automatically.
            </motion.p>

            <motion.div
              custom={3}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="flex flex-col sm:flex-row gap-4"
            >
              <button
                onClick={() => scrollTo("contact")}
                className="bg-[#E87722] text-white px-8 py-4 rounded-xl font-bold text-base hover:bg-orange-600 transition-colors duration-200 cursor-pointer shadow-lg shadow-orange-200"
              >
                Get My Free Quote
              </button>
              <button
                onClick={() => scrollTo("how-it-works")}
                className="border-2 border-[#1B2A4A] text-[#1B2A4A] px-8 py-4 rounded-xl font-bold text-base hover:bg-[#1B2A4A] hover:text-white transition-colors duration-200 cursor-pointer"
              >
                See How It Works
              </button>
            </motion.div>

            <motion.div
              custom={4}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="mt-8 flex items-center gap-6 text-sm text-gray-400"
            >
              <span className="flex items-center gap-2">
                <svg className="w-4 h-4 text-[#E87722]" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                Live in 7 days
              </span>
              <span className="flex items-center gap-2">
                <svg className="w-4 h-4 text-[#E87722]" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                Done-for-you setup
              </span>
            </motion.div>
          </div>

          {/* Right: Phone mockup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.6, ease: "easeOut" }}
            className="flex justify-center"
          >
            <PhoneMockup />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
