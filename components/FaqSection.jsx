"use client";

import { useState } from "react";
import { ChevronDown, HelpCircle, MessageCircle } from "lucide-react";
import { COMPANY_INFO } from "../data/products";

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      q: "How do I place an order via WhatsApp (03102067193)?",
      a: "Simply browse any product on our website and click 'Order on WhatsApp' or add items to your cart and click 'Send Order to 03102067193'. Your product list, quantity, and PKR total will automatically be sent to our sales representative on WhatsApp for immediate confirmation."
    },
    {
      q: "Where is Rox Food Pvt Limited located?",
      a: "Our state-of-the-art food manufacturing facility is located in S.I.T.E Industrial Area, Karachi, Pakistan. We adhere to high hygiene protocols, HACCP standards, and 100% Halal processing."
    },
    {
      q: "Do you deliver Swizz products outside Karachi across Pakistan?",
      a: "Yes! While we offer express delivery in Karachi, we also dispatch orders nationwide across Lahore, Islamabad, Rawalpindi, Faisalabad, Multan, Peshawar, Quetta, and other cities through reliable courier partners."
    },
    {
      q: "Are the prices listed in Pakistani Rupees (PKR)?",
      a: "Yes, all product rates are clearly quoted in PKR (Pakistani Rupees) with transparent pricing. For bulk or wholesale quotes, you can inquire directly on 0310-2067193."
    },
    {
      q: "What makes Swizz Mixed Achar unique?",
      a: "Our Mixed Achar is made following authentic Desi heritage recipes, cured in 100% pure Mustard Oil (Sarson ka Tel) with whole fenugreek, fennel seeds, and selected raw mangoes, lemons, and green chillies."
    }
  ];

  return (
    <section className="py-16 bg-[#faf8f5]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <span className="text-xs font-bold uppercase tracking-widest text-amber-700 bg-amber-100 px-3 py-1 rounded-full">
            Help &amp; Queries
          </span>
          <h2 className="text-3xl font-black text-zinc-900 mt-2">
            Frequently Asked Questions
          </h2>
          <p className="text-stone-500 text-sm mt-1">
            Everything you need to know about our products and WhatsApp ordering.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={i}
                className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-sm transition"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? -1 : i)}
                  className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-zinc-900 hover:text-[#c8102e] transition-colors"
                >
                  <span className="flex items-center gap-2.5">
                    <HelpCircle className="w-4 h-4 text-stone-400 shrink-0" />
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-stone-400 transition-transform duration-200 shrink-0 ${isOpen ? "rotate-180 text-[#c8102e]" : ""
                      }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 text-xs sm:text-sm text-stone-600 leading-relaxed border-t border-stone-100 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Support Callout */}
        <div className="mt-8 text-center bg-emerald-50 border border-emerald-200 rounded-2xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-left">
            <p className="text-sm font-bold text-emerald-950">
              Have a bulk order or distribution question?
            </p>
            <p className="text-xs text-emerald-800">
              Chat directly with our representative on WhatsApp: 0310-2067193.
            </p>
          </div>
          <a
            href={`https://wa.me/${COMPANY_INFO.whatsappNumberIntl}?text=Assalam-o-Alaikum, I have a query about Rox Food / Swizz products.`}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow transition"
          >
            <MessageCircle className="w-4 h-4 fill-current" />
            <span>Chat on WhatsApp</span>
          </a>
        </div>
      </div>
    </section>
  );
}
