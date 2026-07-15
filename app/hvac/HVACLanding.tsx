"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import Script from "next/script";
import Nav from "../components/Nav";
import Footer from "../components/Footer";

// ── Types ──────────────────────────────────────────────────────────────────────

type FormData = {
  firstName: string;
  businessName: string;
  phone: string;
  email: string;
  notes?: string;
};

// ── Sub-components ─────────────────────────────────────────────────────────────

function PhoneMockup() {
  return (
    <div className="relative mx-auto w-60 h-[460px] select-none">
      {/* Outer frame */}
      <div className="absolute inset-0 bg-[#0f1e36] rounded-[42px] shadow-2xl" />
      {/* Side buttons */}
      <div className="absolute left-[-4px] top-20 w-1 h-8 bg-[#0a1525] rounded-l-sm" />
      <div className="absolute left-[-4px] top-32 w-1 h-12 bg-[#0a1525] rounded-l-sm" />
      <div className="absolute right-[-4px] top-28 w-1 h-16 bg-[#0a1525] rounded-r-sm" />
      {/* Screen */}
      <div className="absolute inset-[5px] bg-white rounded-[38px] overflow-hidden flex flex-col">
        {/* Status bar */}
        <div className="bg-gray-900 text-white text-[10px] px-5 pt-3 pb-1.5 flex justify-between items-center flex-shrink-0">
          <span className="font-medium">9:41 AM</span>
          <div className="flex items-center gap-1.5">
            <svg className="w-3 h-3 fill-white" viewBox="0 0 24 24"><path d="M1.5 8.5a13 13 0 0121 0M5 12a10 10 0 0114 0M8.5 15.5a6 6 0 017 0M12 19h.01" strokeWidth="2" stroke="white" fill="none" strokeLinecap="round"/></svg>
            <svg className="w-3 h-2 fill-white" viewBox="0 0 24 16"><rect x="0" y="0" width="18" height="16" rx="2" fill="none" stroke="white" strokeWidth="1.5"/><rect x="2" y="2" width="12" height="12" rx="1" fill="white"/><rect x="19" y="5" width="3" height="6" rx="1" fill="white"/></svg>
          </div>
        </div>
        {/* Chat header */}
        <div className="bg-gray-900 px-4 pb-3 flex items-center gap-3 flex-shrink-0">
          <div className="w-9 h-9 rounded-full bg-[#E87722] flex items-center justify-center flex-shrink-0">
            <span className="text-white text-sm font-bold">C</span>
          </div>
          <div>
            <p className="text-white text-sm font-semibold leading-tight">Customer</p>
            <p className="text-gray-400 text-[10px]">iMessage</p>
          </div>
        </div>
        {/* Messages */}
        <div className="flex-1 px-3 py-4 space-y-3 bg-gray-100 overflow-hidden">
          {/* Missed call pill */}
          <div className="flex justify-center">
            <div className="bg-white border border-gray-200 rounded-xl px-3 py-2 flex items-center gap-2 shadow-sm">
              <svg className="w-3.5 h-3.5 text-red-500 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
              </svg>
              <div>
                <p className="text-red-500 text-[10px] font-semibold leading-none">Missed Call</p>
                <p className="text-gray-400 text-[9px] mt-0.5">2:47 PM</p>
              </div>
            </div>
          </div>
          {/* Outgoing — green bubble */}
          <div className="flex justify-end">
            <div className="bg-[#34C759] text-white text-[11px] rounded-2xl rounded-br-[4px] px-3 py-2 max-w-[82%] leading-relaxed shadow-sm">
              Hi! Sorry we missed you — we&apos;re on a job. We&apos;ll call you back shortly. What&apos;s your address and what&apos;s going on?
            </div>
          </div>
          {/* Incoming — white bubble */}
          <div className="flex justify-start">
            <div className="bg-white text-gray-800 text-[11px] rounded-2xl rounded-bl-[4px] px-3 py-2 max-w-[75%] leading-relaxed shadow-sm">
              12 Maple St, Scarborough. Furnace won&apos;t fire.
            </div>
          </div>
        </div>
        {/* Input bar */}
        <div className="bg-white px-3 py-2.5 flex items-center gap-2 border-t border-gray-100 flex-shrink-0">
          <div className="flex-1 bg-gray-100 rounded-full px-3 py-1.5">
            <span className="text-gray-300 text-[11px]">iMessage</span>
          </div>
          <div className="w-7 h-7 rounded-full bg-[#34C759] flex items-center justify-center flex-shrink-0">
            <svg className="w-3.5 h-3.5 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
            </svg>
          </div>
        </div>
      </div>
      {/* Home indicator */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-20 h-1 bg-white/20 rounded-full" />
    </div>
  );
}

function CheckIcon() {
  return (
    <svg
      className="w-4 h-4 text-[#E87722] flex-shrink-0 mt-0.5"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
    </svg>
  );
}

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-gray-100 last:border-0">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex justify-between items-start py-5 text-left gap-4 cursor-pointer"
      >
        <span className="font-semibold text-[#1B2A4A] text-base leading-snug">{q}</span>
        <span
          className={`text-[#E87722] text-2xl font-light flex-shrink-0 leading-none transition-transform duration-200 ${
            open ? "rotate-45" : ""
          }`}
        >
          +
        </span>
      </button>
      {open && (
        <p className="text-gray-500 text-sm leading-relaxed pb-5 -mt-1">{a}</p>
      )}
    </div>
  );
}

// ── Main Page ──────────────────────────────────────────────────────────────────

export default function HVACLanding() {
  const router = useRouter();
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    setSending(true);
    setError("");
    console.log(data);
    router.push("/thank-you");
  };

  const scrollToDemo = () => {
    document.getElementById("cal-embed")?.scrollIntoView({ behavior: "smooth" });
  };

  const inputClass =
    "w-full px-4 py-3 rounded-xl border border-gray-200 text-[#1B2A4A] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#E87722] focus:border-transparent transition-all duration-200 text-sm bg-white";
  const errorClass = "text-red-500 text-xs mt-1";

  const faqs = [
    {
      q: "Do I need to change my phone number?",
      a: "No. The system runs off your existing business number. You keep everything as-is.",
    },
    {
      q: "What if I already have voicemail set up?",
      a: "The text-back and your voicemail work together. Voicemail still records. The customer just also gets a text within 10 seconds so they don't hang up and call your competitor.",
    },
    {
      q: "How does the $97 offer work?",
      a: "We're onboarding 5 HVAC contractors in the GTA this month at $97 setup instead of the usual $297. After the first month, you continue at $147/month, or cancel — no questions asked.",
    },
    {
      q: "What happens after the first 30 days?",
      a: "You continue at $147/month for as long as you want. No contract. Cancel anytime with an email. Most contractors save more than $147 in the first week of use.",
    },
    {
      q: "Where are you based?",
      a: "We're based in North York, Ontario. We only work with GTA-area service businesses. Everything is done remotely — we install and test the system before we hand it over.",
    },
  ];

  return (
    <main>
      <Nav />

      {/* ── HERO ─────────────────────────────────────────────────────────────── */}
      <section className="pt-24 pb-16 bg-[#1B2A4A] text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: copy */}
            <div>
              <span className="inline-block text-[#E87722] text-xs font-bold tracking-widest uppercase mb-5">
                For GTA HVAC Contractors Only
              </span>
              <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight mb-6">
                Stop Losing $2,400 Jobs to Missed Calls.
              </h1>
              <p className="text-gray-300 text-lg leading-relaxed mb-8">
                When you&apos;re on a rooftop, our system texts your missed callers back in under 10
                seconds — from your existing number — so they don&apos;t call the next guy on Google Maps.
              </p>
              <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-300 mb-8">
                {[
                  "7-day setup guarantee",
                  "No contracts",
                  "No apps to install",
                ].map((t) => (
                  <span key={t} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#E87722] flex-shrink-0" />
                    {t}
                  </span>
                ))}
              </div>
              <button
                onClick={scrollToDemo}
                className="bg-[#E87722] text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-orange-600 transition-colors duration-200 cursor-pointer w-full sm:w-auto"
              >
                Book My Free 15-Min Demo →
              </button>
              <p className="mt-3 text-gray-400 text-sm">
                $97 setup for the first 5 HVAC contractors this month.{" "}
                <span className="text-white font-medium">Normally $297.</span>
              </p>
            </div>
            {/* Right: phone mockup */}
            <div className="flex justify-center lg:justify-end pt-8 lg:pt-0">
              <PhoneMockup />
            </div>
          </div>
        </div>
      </section>

      {/* ── PROBLEM ──────────────────────────────────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1B2A4A] text-center mb-14">
            Every Missed Call Is a $2,000 Bill You&apos;ll Never See.
          </h2>
          <div className="grid md:grid-cols-3 gap-6 mb-10">
            {[
              {
                title: "YOU'RE ON A JOB",
                body: "Your hands are in a condenser 20 feet up. Phone rings. You can't answer.",
                icon: (
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                ),
              },
              {
                title: "THEY WON'T WAIT",
                body: "30% of callers never call back. They just tap the next HVAC pin on Google Maps.",
                icon: (
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ),
              },
              {
                title: "YOU'LL NEVER KNOW",
                body: 'There\'s no notification that says "you just lost $2,000." The phone just stops ringing. You assume it was a slow month.',
                icon: (
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ),
              },
            ].map(({ title, body, icon }) => (
              <div
                key={title}
                className="bg-gray-50 rounded-2xl p-7 border border-gray-100"
              >
                <div className="w-14 h-14 bg-[#1B2A4A] rounded-xl flex items-center justify-center text-white mb-5">
                  {icon}
                </div>
                <h3 className="font-bold text-[#1B2A4A] text-xs tracking-widest uppercase mb-3">
                  {title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
          {/* Stat callout */}
          <div className="bg-[#1B2A4A] rounded-2xl p-7 text-center">
            <p className="text-white text-base sm:text-lg font-medium leading-relaxed">
              <span className="text-[#E87722] font-bold">3 missed calls/day</span> × 22 working days
              × 30% never-call-back × $800 avg ticket ={" "}
              <span className="text-[#E87722] font-extrabold text-xl sm:text-2xl">
                $15,840/month
              </span>{" "}
              walking out your door.
            </p>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ─────────────────────────────────────────────────────── */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="text-[#E87722] text-xs font-bold tracking-widest uppercase">
              How It Works
            </span>
            <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold text-[#1B2A4A]">
              10 Seconds. That&apos;s All It Takes.
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6 mb-10">
            {[
              {
                step: "01",
                title: "Customer calls, you can't answer",
                body: "Any missed call to your business number — after hours, mid-job, at the supply store — triggers the system.",
              },
              {
                step: "02",
                title: "They get a text in 10 seconds",
                body: 'Our system texts them back from your number: "Hi! Sorry we missed you — we\'re on a job. We\'ll call you back shortly."',
              },
              {
                step: "03",
                title: "They text you their address",
                body: "Now you have their name, number, address, and the problem — in writing — for when you climb down.",
              },
            ].map(({ step, title, body }) => (
              <div
                key={step}
                className="bg-white rounded-2xl p-7 border border-gray-100 shadow-sm relative overflow-hidden"
              >
                <div className="text-6xl font-extrabold text-[#E87722]/10 mb-3 leading-none select-none">
                  {step}
                </div>
                <h3 className="font-bold text-[#1B2A4A] text-base mb-3">{title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
          <p className="text-center text-gray-400 text-sm max-w-xl mx-auto">
            Runs on your existing business phone number. No app. No new hardware. You never touch it.
          </p>
        </div>
      </section>

      {/* ── OFFER ────────────────────────────────────────────────────────────── */}
      <section className="py-20 bg-[#1B2A4A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <span className="text-[#E87722] text-xs font-bold tracking-widest uppercase">
              Limited Offer
            </span>
            <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold text-white">
              First 5 GTA HVAC Contractors — $97 Setup.
            </h2>
          </div>
          <div className="bg-white rounded-2xl overflow-hidden">
            <div className="grid md:grid-cols-2">
              {/* What you get */}
              <div className="p-8 border-b md:border-b-0 md:border-r border-gray-100">
                <h3 className="font-bold text-[#1B2A4A] text-lg mb-6">What You Get</h3>
                <ul className="space-y-3.5">
                  {[
                    "Missed Call Text-Back system (fully installed)",
                    "Custom SMS response written for your business",
                    "Works from your existing number",
                    "7-day setup guarantee (or you don't pay)",
                    "No long-term contract — cancel anytime after 30 days",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm text-gray-600">
                      <CheckIcon />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              {/* Pricing */}
              <div className="p-8 flex flex-col justify-between">
                <div>
                  <h3 className="font-bold text-[#1B2A4A] text-lg mb-6">Pricing</h3>
                  <div className="mb-5">
                    <p className="text-gray-400 text-xs font-semibold uppercase tracking-wide mb-2">
                      Setup fee
                    </p>
                    <div className="flex items-baseline gap-3">
                      <span className="text-gray-300 line-through text-xl font-medium">$297</span>
                      <span className="text-[#E87722] font-extrabold text-5xl leading-none">
                        $97
                      </span>
                    </div>
                    <p className="text-gray-400 text-xs mt-1">first 5 contractors only</p>
                  </div>
                  <div className="mb-6">
                    <p className="text-gray-400 text-xs font-semibold uppercase tracking-wide mb-2">
                      Then
                    </p>
                    <span className="text-[#1B2A4A] font-bold text-2xl">
                      $147
                      <span className="text-sm font-normal text-gray-400">/month</span>
                    </span>
                  </div>
                  <p className="text-[#E87722] font-semibold text-sm mb-1">
                    One saved job pays for the year.
                  </p>
                  <p className="text-gray-400 text-xs mb-8">
                    3 of 5 spots remaining for this month.
                  </p>
                </div>
                <button
                  onClick={scrollToDemo}
                  className="w-full bg-[#E87722] text-white py-4 rounded-xl font-bold text-base hover:bg-orange-600 transition-colors duration-200 cursor-pointer"
                >
                  Book My 15-Min Demo →
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── BOOK A DEMO (Cal.com) ────────────────────────────────────────────── */}
      <section id="cal-embed" className="py-20 bg-white scroll-mt-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-[#E87722] text-xs font-bold tracking-widest uppercase">
            Book a Demo
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold text-[#1B2A4A] mb-4">
            Grab a 15-Minute Slot. We&apos;ll Show You Exactly How It Works.
          </h2>
          <p className="text-gray-500 text-lg mb-10 max-w-xl mx-auto">
            No slide deck. No pushy pitch. We&apos;ll open our own system, show you the SMS live,
            and answer your questions.
          </p>
          {/* Cal.com inline embed */}
          <div id="cal-embed-widget" className="rounded-2xl overflow-hidden mb-8 min-h-[600px]" />
          <Script id="cal-embed-script" strategy="afterInteractive">
            {`
              (function (C, A, L) {
                let p = function (a, ar) { a.q.push(ar); };
                let d = C.document;
                C.Cal = C.Cal || function () {
                  let cal = C.Cal; let ar = arguments;
                  if (!cal.loaded) {
                    cal.ns = {}; cal.q = cal.q || [];
                    d.head.appendChild(d.createElement("script")).src = A;
                    cal.loaded = true;
                  }
                  if (ar[0] === L) {
                    const api = function () { p(api, arguments); };
                    const namespace = ar[1];
                    api.q = api.q || [];
                    if (typeof namespace === "string") {
                      cal.ns[namespace] = cal.ns[namespace] || api;
                      p(cal.ns[namespace], ar);
                      p(cal, [L, namespace, ar[2]]);
                    } else p(cal, ar);
                    return;
                  }
                  p(cal, ar);
                };
              })(window, "https://app.cal.com/embed/embed.js", "init");
              Cal("init", "15-min-demo", { origin: "https://cal.com" });
              Cal("inline", {
                elementOrSelector: "#cal-embed-widget",
                calLink: "hayk-dallakyan-yjf19x/15-min-demo",
                layout: "month_view"
              });
              Cal("ui", {
                hideEventTypeDetails: false,
                layout: "month_view"
              });
            `}
          </Script>
          <p className="text-gray-400 text-sm">
            Prefer to text?{" "}
            <a
              href="sms:+14379888484"
              className="text-[#E87722] font-semibold hover:underline"
            >
              (437) 988-8484
            </a>
          </p>
        </div>
      </section>

      {/* ── CONTACT FORM ─────────────────────────────────────────────────────── */}
      <section id="contact" className="py-20 bg-gray-50">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <span className="text-[#E87722] text-xs font-bold tracking-widest uppercase">
              Get Started
            </span>
            <h2 className="mt-3 text-3xl font-extrabold text-[#1B2A4A]">
              Send Us Your Info
            </h2>
            <p className="mt-3 text-gray-500 text-base">
              We&apos;ll reach out within a few hours to confirm your spot.
            </p>
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm space-y-5"
            noValidate
          >
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label
                  className="block text-xs font-semibold text-[#1B2A4A] mb-1.5"
                  htmlFor="firstName"
                >
                  First Name <span className="text-[#E87722]">*</span>
                </label>
                <input
                  id="firstName"
                  {...register("firstName", { required: "Required" })}
                  placeholder="Mike"
                  className={inputClass}
                />
                {errors.firstName && (
                  <p className={errorClass}>{errors.firstName.message}</p>
                )}
              </div>
              <div>
                <label
                  className="block text-xs font-semibold text-[#1B2A4A] mb-1.5"
                  htmlFor="businessName"
                >
                  Business Name <span className="text-[#E87722]">*</span>
                </label>
                <input
                  id="businessName"
                  {...register("businessName", { required: "Required" })}
                  placeholder="Mike's HVAC"
                  className={inputClass}
                />
                {errors.businessName && (
                  <p className={errorClass}>{errors.businessName.message}</p>
                )}
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label
                  className="block text-xs font-semibold text-[#1B2A4A] mb-1.5"
                  htmlFor="hvac-phone"
                >
                  Phone Number <span className="text-[#E87722]">*</span>
                </label>
                <input
                  id="hvac-phone"
                  type="tel"
                  {...register("phone", { required: "Required" })}
                  placeholder="+1 (647) 000-0000"
                  className={inputClass}
                />
                {errors.phone && <p className={errorClass}>{errors.phone.message}</p>}
              </div>
              <div>
                <label
                  className="block text-xs font-semibold text-[#1B2A4A] mb-1.5"
                  htmlFor="hvac-email"
                >
                  Email <span className="text-[#E87722]">*</span>
                </label>
                <input
                  id="hvac-email"
                  type="email"
                  {...register("email", {
                    required: "Required",
                    pattern: {
                      value: /^\S+@\S+\.\S+$/,
                      message: "Invalid email address",
                    },
                  })}
                  placeholder="mike@mikeshvac.ca"
                  className={inputClass}
                />
                {errors.email && <p className={errorClass}>{errors.email.message}</p>}
              </div>
            </div>
            <div>
              <label
                className="block text-xs font-semibold text-[#1B2A4A] mb-1.5"
                htmlFor="notes"
              >
                Anything we should know?{" "}
                <span className="text-gray-400 font-normal">(optional)</span>
              </label>
              <textarea
                id="notes"
                {...register("notes")}
                rows={3}
                placeholder="How many calls do you miss per week? How long have you been in business?"
                className={inputClass + " resize-none"}
              />
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <button
              type="submit"
              disabled={sending}
              className="w-full bg-[#E87722] text-white py-4 rounded-xl font-bold text-base hover:bg-orange-600 transition-colors duration-200 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {sending ? "Sending..." : "Send My Info →"}
            </button>
          </form>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-[#E87722] text-xs font-bold tracking-widest uppercase">FAQ</span>
            <h2 className="mt-3 text-3xl font-extrabold text-[#1B2A4A]">Common Questions</h2>
          </div>
          <div>
            {faqs.map((faq) => (
              <FAQItem key={faq.q} q={faq.q} a={faq.a} />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
