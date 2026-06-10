"use client";

export default function Footer() {
  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <footer className="bg-[#1B2A4A] text-white py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8 mb-10">
          <div className="md:col-span-2">
            <span className="text-white font-bold text-lg">The Conversion Machine</span>
            <p className="mt-3 text-gray-400 text-sm leading-relaxed max-w-sm">
              Websites and automations for local businesses that want to grow. Serving Ontario.
            </p>
          </div>
          <div>
            <p className="text-gray-400 text-xs font-semibold tracking-widest uppercase mb-4">Quick Links</p>
            <ul className="space-y-2">
              {[
                { label: "How It Works", id: "how-it-works" },
                { label: "Pricing", id: "pricing" },
                { label: "Contact", id: "contact" },
              ].map(({ label, id }) => (
                <li key={id}>
                  <button
                    onClick={() => scrollTo(id)}
                    className="text-gray-300 text-sm hover:text-[#E87722] transition-colors duration-200 cursor-pointer"
                  >
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-gray-500 text-xs">
            © 2025 The Conversion Machine. All rights reserved.
          </p>
          <p className="text-gray-500 text-xs">Built for GTA local businesses.</p>
        </div>
      </div>
    </footer>
  );
}
