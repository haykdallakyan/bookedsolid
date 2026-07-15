"use client";

import { useEffect } from "react";
import Link from "next/link";
import Nav from "../components/Nav";
import Footer from "../components/Footer";

declare const fbq: (...args: unknown[]) => void;

export default function ThankYouPage() {
  useEffect(() => {
    if (typeof fbq !== "undefined") {
      fbq("track", "Lead");
    }
  }, []);

  return (
    <main>
      <Nav />
      <section className="min-h-[calc(100vh-80px)] flex items-center justify-center bg-gray-50 pt-16">
        <div className="max-w-lg mx-auto px-4 text-center py-20">
          {/* Success icon */}
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg
              className="w-10 h-10 text-green-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#1B2A4A] mb-4">
            You&apos;re Booked In.
          </h1>
          <p className="text-gray-500 text-lg mb-8 leading-relaxed">
            We received your info and will reach out within a few hours to confirm your
            demo slot and answer any questions.
          </p>

          {/* While you wait card */}
          <div className="bg-[#1B2A4A] rounded-2xl p-6 mb-8 text-left">
            <p className="text-white font-semibold mb-3">While you wait:</p>
            <ul className="space-y-2.5">
              {[
                "Think about how many calls you miss in a typical week",
                "Multiply that by your average job value",
                "That's the number we'll talk about recovering",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-gray-300 text-sm">
                  <span className="text-[#E87722] font-bold mt-0.5 flex-shrink-0">→</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <p className="text-gray-400 text-sm mb-6">
            Questions before the call?{" "}
            <a
              href="sms:+14379888484"
              className="text-[#E87722] font-semibold hover:underline"
            >
              Text us at (437) 988-8484
            </a>
          </p>

          <Link
            href="/"
            className="text-gray-400 text-sm hover:text-[#1B2A4A] transition-colors duration-200"
          >
            ← Back to BookedSolid
          </Link>
        </div>
      </section>
      <Footer />
    </main>
  );
}
