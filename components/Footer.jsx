"use client";

import Image from "next/image";
import { COMPANY_INFO, CATEGORIES } from "../data/products";
import {
  Phone,
  Mail,
  MapPin,
  MessageCircle,
  ShieldCheck,
  Globe,
  Heart
} from "lucide-react";

export default function Footer({ onSelectCategory }) {
  const directWhatsAppUrl = `https://wa.me/${COMPANY_INFO.whatsappNumberIntl}?text=Assalam-o-Alaikum, I am visiting your website and have a question for Rox Food / Swiss.`;

  return (
    <footer className="bg-zinc-950 text-stone-300 pt-16 pb-12 border-t border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-zinc-800">
          {/* Brand Info */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative h-14 w-18 bg-white/95 backdrop-blur-sm rounded-xl p-1.5 shadow-md overflow-hidden shrink-0">
                <Image
                  src="/logo.png"
                  alt="Swiss / Swizz Food Logo"
                  fill
                  sizes="72px"
                  className="object-contain"
                />
              </div>
              <div>
                <span className="text-xl font-black text-white tracking-tight block">
                  SWISS FOOD
                </span>
                <span className="block text-[10px] uppercase tracking-widest text-[#c8102e] font-extrabold">
                  {COMPANY_INFO.name} • EST. 1978
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-stone-400 leading-relaxed max-w-sm">
              Pakistan&apos;s trusted manufacturer of premium fruit jams, authentic Sarson oil pickles, zesty table sauces, and high-purity synthetic vinegar.
            </p>

            <div className="flex items-center gap-2 text-xs font-semibold text-amber-400">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>100% Halal Certified & HACCP Compliant</span>
            </div>
          </div>

          {/* Categories Links */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white">
              Product Categories
            </h4>
            <ul className="space-y-2 text-xs">
              {CATEGORIES.map((cat) => (
                <li key={cat.id}>
                  <a
                    href="#products"
                    onClick={() => onSelectCategory(cat.id)}
                    className="hover:text-white transition-colors flex items-center justify-between"
                  >
                    <span>{cat.label}</span>
                    <span className="text-zinc-500 font-mono">({cat.count})</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Navigation */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white">
              Company
            </h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>
                <a href="#ceo-message" className="hover:text-white transition">
                  Our CEO Message
                </a>
              </li>
              <li>
                <a href="#why-swiss" className="hover:text-white transition">
                  Why Swiss Foods
                </a>
              </li>
              <li>
                <a href="#products" className="hover:text-white transition">
                  Browse Catalog
                </a>
              </li>
              <li>
                <a
                  href={directWhatsAppUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-emerald-400 transition flex items-center gap-1 text-emerald-400"
                >
                  <MessageCircle className="w-3 h-3" /> WhatsApp Support
                </a>
              </li>
            </ul>
          </div>

          {/* Official Contact & Orders */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white">
              Direct Orders &amp; Inquiries
            </h4>
            <div className="space-y-2.5 text-xs text-stone-400">
              <div className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <span className="block font-semibold text-white">Helpline / WhatsApp</span>
                  <a
                    href={`https://wa.me/${COMPANY_INFO.whatsappNumberIntl}`}
                    className="text-emerald-400 font-bold hover:underline"
                  >
                    {COMPANY_INFO.whatsappDisplay}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#c8102e] shrink-0 mt-0.5" />
                <div>
                  <span className="block font-semibold text-white">Factory &amp; Head Office</span>
                  <span>{COMPANY_INFO.address}</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Globe className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                <div>
                  <span className="block font-semibold text-white">Official Portal</span>
                  <span className="text-stone-400">{COMPANY_INFO.website}</span>
                </div>
              </div>
            </div>

            {/* Direct Order Button */}
            <div className="pt-2">
              <a
                href={directWhatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs py-2.5 px-3 rounded-xl transition shadow"
              >
                <MessageCircle className="w-3.5 h-3.5 fill-current" />
                <span>Order on WhatsApp (03102067193)</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Credits & Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <p>
            © {new Date().getFullYear()} {COMPANY_INFO.name}. Brand: <strong>{COMPANY_INFO.brand}</strong>. All rights reserved.
          </p>
          <p className="flex items-center gap-1 text-stone-400">
            Crafted for Pakistani food lovers with <Heart className="w-3.5 h-3.5 text-red-500 fill-current" /> in Karachi
          </p>
        </div>
      </div>
    </footer>
  );
}
