"use client";

import Image from "next/image";
import { COMPANY_INFO } from "../data/products";
import {
  Quote,
  ShieldCheck,
  Award,
  Factory,
  CheckCircle,
  MessageCircle,
  Phone
} from "lucide-react";

export default function CeoMessage() {
  const directWhatsAppUrl = `https://wa.me/${COMPANY_INFO.whatsappNumberIntl}?text=${encodeURIComponent(
    "Assalam-o-Alaikum, I read the CEO Message on your website and would like to connect with Rox Food Pvt Ltd regarding orders / distribution."
  )}`;

  return (
    <section id="ceo-message" className="py-20 bg-zinc-950 text-white relative overflow-hidden">
      {/* Subtle background luxury pattern & glows */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-[#c8102e]/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-amber-600/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-bold text-amber-300 border border-white/10 uppercase tracking-widest">
            <Award className="w-3.5 h-3.5" /> Corporate Leadership
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white">
            Message From Our <span className="text-[#c8102e]">Chief Executive Officer</span>
          </h2>
          <p className="text-stone-400 text-sm sm:text-base">
            Guiding Rox Food Pvt Limited with an unyielding commitment to purity, hygiene, and Pakistani culinary traditions.
          </p>
        </div>

        {/* Main CEO Profile Card */}
        <div className="bg-zinc-900/90 border border-zinc-800 rounded-3xl p-6 sm:p-10 lg:p-12 shadow-2xl backdrop-blur-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* CEO Image Column */}
            <div className="lg:col-span-5 flex flex-col items-center">
              <div className="relative w-full max-w-sm aspect-[4/5] rounded-2xl overflow-hidden border-2 border-zinc-700 shadow-2xl group">
                <Image
                  src={COMPANY_INFO.ceo.image}
                  alt={COMPANY_INFO.ceo.name}
                  fill
                  sizes="(max-width: 1024px) 384px, 450px"
                  className="object-cover object-top group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                {/* Overlay Name Tag */}
                <div className="absolute bottom-4 left-4 right-4 bg-zinc-950/80 backdrop-blur-md p-3.5 rounded-xl border border-white/10 text-left">
                  <p className="text-base font-bold text-white tracking-wide">
                    {COMPANY_INFO.ceo.name}
                  </p>
                  <p className="text-xs font-semibold text-amber-400">
                    {COMPANY_INFO.ceo.title}
                  </p>
                  <p className="text-[11px] text-zinc-400">
                    {COMPANY_INFO.name} • Karachi, Pakistan
                  </p>
                </div>
              </div>

              {/* Direct Hotline Pill */}
              <div className="mt-5 w-full max-w-sm flex items-center justify-between p-3 bg-zinc-800/80 rounded-xl border border-zinc-700 text-xs">
                <span className="text-zinc-400 font-medium">Direct Inquiries:</span>
                <a
                  href={`tel:${COMPANY_INFO.whatsappNumber}`}
                  className="font-bold text-amber-400 hover:text-white flex items-center gap-1.5 transition"
                >
                  <Phone className="w-3.5 h-3.5" /> {COMPANY_INFO.whatsappDisplay}
                </a>
              </div>
            </div>

            {/* CEO Message Text & Credentials */}
            <div className="lg:col-span-7 space-y-6">
              <div className="relative">
                <Quote className="w-12 h-12 text-[#c8102e]/30 -mb-4" />
                <blockquote className="text-xl sm:text-2xl font-semibold italic text-stone-200 leading-snug">
                  &ldquo;{COMPANY_INFO.ceo.quote}&rdquo;
                </blockquote>
              </div>

              <div className="space-y-4 text-stone-300 text-sm sm:text-base leading-relaxed">
                <p>
                  {COMPANY_INFO.ceo.message}
                </p>
                <p className="text-stone-400 text-sm">
                  Whether it is our flagship <strong>Swizz Strawberry Jam</strong> crafted for Eid celebrations,
                  our authentic <strong>Mix Achar</strong> cured in pure Sarson ka Tel, or our crystal clear <strong>Vinegar</strong>,
                  we take personal pride in knowing our products grace thousands of dastarkhwans every day.
                  We welcome nationwide retailers, wholesalers, and consumers to experience the Swizz standard.
                </p>
              </div>

              {/* Executive Credentials Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                <div className="p-3.5 bg-zinc-950/60 rounded-xl border border-zinc-800 text-left">
                  <ShieldCheck className="w-5 h-5 text-emerald-400 mb-1.5" />
                  <p className="text-xs font-bold text-white">100% Halal Certified</p>
                  <p className="text-[11px] text-zinc-400">Pure, hygienic formulation</p>
                </div>

                <div className="p-3.5 bg-zinc-950/60 rounded-xl border border-zinc-800 text-left">
                  <Factory className="w-5 h-5 text-amber-400 mb-1.5" />
                  <p className="text-xs font-bold text-white">S.I.T.E Karachi Plant</p>
                  <p className="text-[11px] text-zinc-400">Modern automated facility</p>
                </div>

                <div className="p-3.5 bg-zinc-950/60 rounded-xl border border-zinc-800 text-left">
                  <Award className="w-5 h-5 text-[#c8102e] mb-1.5" />
                  <p className="text-xs font-bold text-white">HACCP & SOP Quality</p>
                  <p className="text-[11px] text-zinc-400">Strict food safety checks</p>
                </div>
              </div>

              {/* CTA Row */}
              <div className="pt-4 flex flex-wrap items-center gap-4">
                <a
                  href={directWhatsAppUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm px-6 py-3.5 rounded-xl shadow-lg transition active:scale-95"
                >
                  <MessageCircle className="w-4 h-4 fill-current" />
                  <span>Connect with Sales on WhatsApp</span>
                </a>
                <span className="text-xs text-stone-400">
                  Direct Line: <strong>{COMPANY_INFO.whatsappDisplay}</strong>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
