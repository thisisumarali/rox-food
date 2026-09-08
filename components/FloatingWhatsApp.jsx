"use client";

import { MessageCircle } from "lucide-react";
import { COMPANY_INFO } from "../data/products";

export default function FloatingWhatsApp() {
  const directWhatsAppUrl = `https://wa.me/${COMPANY_INFO.whatsappNumberIntl}?text=${encodeURIComponent(
    "Assalam-o-Alaikum, I am visiting the Swiss Foods / Rox Food website and would like to order or inquire about products."
  )}`;

  return (
    <div className="fixed bottom-6 right-6 z-40 flex items-center gap-3">
      {/* Tooltip on larger screens */}
      <a
        href={directWhatsAppUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="hidden md:flex items-center gap-2 bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-2xl shadow-xl border border-stone-200 text-xs font-bold text-zinc-800 hover:text-emerald-600 transition-all hover:scale-105"
      >
        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
        <span>Order on WhatsApp: <strong>{COMPANY_INFO.whatsappDisplay}</strong></span>
      </a>

      {/* Floating Circular Action Button */}
      <a
        href={directWhatsAppUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="relative w-14 h-14 bg-emerald-500 hover:bg-emerald-600 text-white rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 hover:scale-110 active:scale-95 whatsapp-pulse group"
        aria-label="Contact us on WhatsApp 03102067193"
      >
        <MessageCircle className="w-7 h-7 fill-current transition-transform group-hover:rotate-12" />
        {/* Active status dot */}
        <span className="absolute top-1 right-1 w-3.5 h-3.5 bg-white rounded-full border-2 border-emerald-500 flex items-center justify-center">
          <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
        </span>
      </a>
    </div>
  );
}
