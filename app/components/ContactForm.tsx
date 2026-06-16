"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
type FormData = {
  firstName: string;
  businessName: string;
  businessType: string;
  phone: string;
  email: string;
  package: string;
  message: string;
};

export default function ContactForm() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [submitted, setSubmitted] = useState(false);
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
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Server error");
      setSubmitted(true);
    } catch {
      setError("Something went wrong. Please email us directly at admin@bookedsolid.live");
    } finally {
      setSending(false);
    }
  };

  const inputClass =
    "w-full px-4 py-3 rounded-xl border border-gray-200 text-[#1B2A4A] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#E87722] focus:border-transparent transition-all duration-200 text-sm bg-white";
  const errorClass = "text-red-500 text-xs mt-1";

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        <div className="text-center mb-14">
          <motion.span
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            className="text-[#E87722] text-xs font-bold tracking-widest uppercase"
          >
            Get In Touch
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="mt-3 text-3xl sm:text-4xl font-extrabold text-[#1B2A4A]"
          >
            Let&apos;s Build Your Machine
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="mt-4 text-gray-500 text-lg"
          >
            Fill out the form and we&apos;ll reach out within 24 hours.
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-5 gap-12">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.25, duration: 0.5 }}
            className="lg:col-span-3"
          >
            {submitted ? (
              <div className="bg-white rounded-2xl p-12 text-center border border-gray-100 shadow-sm">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-[#1B2A4A] font-bold text-2xl mb-2">You&apos;re In!</h3>
                <p className="text-gray-500">
                  We&apos;ve received your info and will reach out within 24 hours to get your machine built.
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm space-y-5"
                noValidate
              >
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-semibold text-[#1B2A4A] mb-1.5" htmlFor="firstName">
                      First Name <span className="text-[#E87722]">*</span>
                    </label>
                    <input
                      id="firstName"
                      {...register("firstName", { required: "First name is required" })}
                      placeholder="Mike"
                      className={inputClass}
                    />
                    {errors.firstName && <p className={errorClass}>{errors.firstName.message}</p>}
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#1B2A4A] mb-1.5" htmlFor="businessName">
                      Business Name <span className="text-[#E87722]">*</span>
                    </label>
                    <input
                      id="businessName"
                      {...register("businessName", { required: "Business name is required" })}
                      placeholder="Mike's HVAC"
                      className={inputClass}
                    />
                    {errors.businessName && <p className={errorClass}>{errors.businessName.message}</p>}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#1B2A4A] mb-1.5" htmlFor="businessType">
                    Business Type
                  </label>
                  <select
                    id="businessType"
                    {...register("businessType")}
                    className={inputClass + " cursor-pointer"}
                  >
                    <option value="">Select your industry...</option>
                    <option>HVAC</option>
                    <option>Auto Repair</option>
                    <option>Landscaping</option>
                    <option>Nail Salon</option>
                    <option>Plumbing</option>
                    <option>Electrical</option>
                    <option>Other</option>
                  </select>
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-semibold text-[#1B2A4A] mb-1.5" htmlFor="phone">
                      Phone Number <span className="text-[#E87722]">*</span>
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      {...register("phone", { required: "Phone number is required" })}
                      placeholder="+1 (647) 000-0000"
                      className={inputClass}
                    />
                    {errors.phone && <p className={errorClass}>{errors.phone.message}</p>}
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#1B2A4A] mb-1.5" htmlFor="email">
                      Email Address <span className="text-[#E87722]">*</span>
                    </label>
                    <input
                      id="email"
                      type="email"
                      {...register("email", {
                        required: "Email is required",
                        pattern: { value: /^\S+@\S+\.\S+$/, message: "Invalid email address" },
                      })}
                      placeholder="mike@mikeshvac.ca"
                      className={inputClass}
                    />
                    {errors.email && <p className={errorClass}>{errors.email.message}</p>}
                  </div>
                </div>

                <div>
                  <p className="block text-xs font-semibold text-[#1B2A4A] mb-2.5">
                    Which package are you interested in?
                  </p>
                  <div className="flex flex-wrap gap-4">
                    {["Website — $497 + $47/mo", "Automation Bundle — $297 + $147/mo", "Not Sure"].map((pkg) => (
                      <label key={pkg} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          value={pkg}
                          {...register("package")}
                          className="accent-[#E87722] w-4 h-4 cursor-pointer"
                        />
                        <span className="text-sm text-[#1B2A4A]">{pkg}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#1B2A4A] mb-1.5" htmlFor="message">
                    Anything else? (optional)
                  </label>
                  <textarea
                    id="message"
                    {...register("message")}
                    rows={3}
                    placeholder="Tell us a bit about your business..."
                    className={inputClass + " resize-none"}
                  />
                </div>

                {error && <p className="text-red-500 text-sm">{error}</p>}

                <button
                  type="submit"
                  disabled={sending}
                  className="w-full bg-[#E87722] text-white py-4 rounded-xl font-bold text-base hover:bg-orange-600 transition-colors duration-200 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {sending ? "Sending..." : "Send My Info"}
                </button>
              </form>
            )}
          </motion.div>

          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.35, duration: 0.5 }}
            className="lg:col-span-2 flex flex-col justify-center space-y-8"
          >
            <div>
              <h3 className="text-[#1B2A4A] font-bold text-xl mb-6">
                Or reach us directly
              </h3>
              <div className="space-y-5">
                <a
                  href="tel:+14379888484"
                  className="flex items-center gap-4 group cursor-pointer"
                >
                  <div className="w-12 h-12 bg-[#1B2A4A] rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-[#E87722] transition-colors duration-200">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 font-medium">Call or Text</p>
                    <p className="text-[#1B2A4A] font-semibold">+1 (437) 988-8484</p>
                  </div>
                </a>

                <a
                  href="mailto:admin@bookedsolid.live"
                  className="flex items-center gap-4 group cursor-pointer"
                >
                  <div className="w-12 h-12 bg-[#1B2A4A] rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-[#E87722] transition-colors duration-200">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 font-medium">Email</p>
                    <p className="text-[#1B2A4A] font-semibold break-all">admin@bookedsolid.live</p>
                  </div>
                </a>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-[#1B2A4A] rounded-xl flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 font-medium">Service Area</p>
                    <p className="text-[#1B2A4A] font-semibold">Ontario</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[#1B2A4A] rounded-2xl p-6">
              <p className="text-white font-bold text-lg mb-2">
                We respond within 24 hours.
              </p>
              <p className="text-gray-300 text-sm leading-relaxed">
                No pressure, no hard sell. We&apos;ll have a quick chat to see if
                The Conversion Machine is the right fit for your business.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
