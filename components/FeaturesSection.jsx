"use client";

import {
  ShieldCheck,
  Award,
  Truck,
  HeartHandshake,
  Clock,
  Sparkles,
  Flame,
  Leaf
} from "lucide-react";

export default function FeaturesSection() {
  const features = [
    {
      icon: ShieldCheck,
      color: "text-emerald-600 bg-emerald-50",
      title: "100% Halal & Pure",
      description: "Strict Halal certified manufacturing with zero questionable additives or gelatin."
    },
    {
      icon: Flame,
      color: "text-amber-600 bg-amber-50",
      title: "Authentic Sarson Oil",
      description: "Our pickles are cured in genuine cold-pressed mustard oil with traditional spices."
    },
    {
      icon: Leaf,
      color: "text-rose-600 bg-rose-50",
      title: "Real Fruit Goodness",
      description: "High fruit pulp concentration gives our jams natural aroma, color, and rich flavor."
    },
    {
      icon: Award,
      color: "text-blue-600 bg-blue-50",
      title: "HACCP Safety Standard",
      description: "Compliant with international food processing and hygiene SOPs in our Karachi plant."
    },
    {
      icon: Truck,
      color: "text-indigo-600 bg-indigo-50",
      title: "Karachi & Nationwide Dispatch",
      description: "Safe, bubble-wrapped packaging delivered securely to your doorstep across Pakistan."
    },
    {
      icon: HeartHandshake,
      color: "text-purple-600 bg-purple-50",
      title: "Wholesale & Retail Ready",
      description: "Supplying top marts, bakeries, cafes, and household kitchens with competitive PKR rates."
    }
  ];

  return (
    <section id="why-Swizz" className="py-16 bg-white border-y border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-[#c8102e] bg-red-50 px-3 py-1 rounded-full border border-red-200">
            Why Choose Us
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-zinc-900 mt-2 tracking-tight">
            The Rox Food &amp; Swizz Promise
          </h2>
          <p className="text-stone-500 text-sm mt-1">
            Setting benchmark standards in Pakistani food processing, taste, and kitchen joy.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <div
              key={i}
              className="p-6 rounded-2xl bg-[#faf8f5] border border-stone-200/90 hover:border-red-200 hover:shadow-lg transition-all group"
            >
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110 ${f.color}`}
              >
                <f.icon className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-zinc-900 group-hover:text-[#c8102e] transition-colors">
                {f.title}
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 mt-1.5 leading-relaxed">
                {f.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
