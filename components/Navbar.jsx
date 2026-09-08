"use client";

import { useState } from "react";
import Image from "next/image";
import { COMPANY_INFO, CATEGORIES } from "../data/products";
import {
  ShoppingBag,
  Search,
  Phone,
  Menu,
  X,
  MessageCircle,
  ShieldCheck,
  Truck,
  Sparkles,
  ChevronDown
} from "lucide-react";

export default function Navbar({
  cartCount,
  onOpenCart,
  searchTerm,
  setSearchTerm,
  selectedCategory,
  setSelectedCategory
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [categoryDropdown, setCategoryDropdown] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const directWhatsAppUrl = `https://wa.me/${COMPANY_INFO.whatsappNumberIntl}?text=${encodeURIComponent(
    "Assalam-o-Alaikum, I would like to place an order / inquire about Swizz food products (Rox Food Pvt Ltd)."
  )}`;

  return (
    <header className="sticky top-0 z-40 w-full transition-all bg-white/95 backdrop-blur-md shadow-sm">
      {/* Top Announcement Bar */}
      <div className="bg-gradient-to-r from-[#7a091a] via-[#c8102e] to-[#7a091a] text-white py-1.5 px-4 text-xs">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-4 text-[11px] sm:text-xs">
            <span className="flex items-center gap-1.5 font-semibold text-amber-200">
              <ShieldCheck className="w-3.5 h-3.5" /> 100% Halal &amp; HACCP Certified
            </span>
            <span className="hidden md:inline text-red-200/60">•</span>
            <span className="hidden md:flex items-center gap-1.5 text-red-100">
              <Truck className="w-3.5 h-3.5" /> Fast Dispatch in Karachi &amp; Nationwide
            </span>
          </div>

          <div className="flex items-center gap-3 sm:gap-4 text-[11px] sm:text-xs shrink-0">
            <a
              href={`tel:${COMPANY_INFO.whatsappNumber}`}
              className="hidden sm:flex items-center gap-1 text-amber-200 hover:text-white transition font-medium"
            >
              <Phone className="w-3 h-3" /> Call: {COMPANY_INFO.whatsappDisplay}
            </a>
            <span className="hidden sm:inline text-red-200/60">•</span>
            <a
              href={directWhatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-500 text-white px-3 py-0.5 rounded-full font-bold transition shadow-sm"
            >
              <MessageCircle className="w-3 h-3 fill-current" />
              <span>WhatsApp: {COMPANY_INFO.whatsappDisplay}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 sm:h-20 gap-4">
          {/* Brand Logo */}
          <a href="#" className="flex items-center gap-3 shrink-0 group py-1">
            <div className="relative h-12 w-14 sm:h-14 sm:w-16 flex items-center justify-center transition-transform group-hover:scale-105">
              <Image
                src="/logo.png"
                alt="Swizz / Swizz Food Logo - Rox Food Pvt Ltd"
                fill
                sizes="(max-width: 640px) 56px, 64px"
                className="object-contain"
                priority
              />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="text-lg sm:text-xl font-black tracking-tight text-zinc-900 group-hover:text-[#c8102e] transition-colors leading-none">
                  Swizz
                </span>
                <span className="text-[9px] uppercase font-bold tracking-wider bg-red-100 text-[#c8102e] px-1.5 py-0.5 rounded leading-none">
                  Foods
                </span>
              </div>
              <span className="text-[9px] sm:text-[10px] uppercase tracking-widest text-[#c8102e] font-extrabold mt-0.5">
                Rox Food Pvt Ltd
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links (Spaced and Well-Organized) */}
          <nav className="hidden xl:flex items-center gap-6 2xl:gap-8 font-semibold text-xs 2xl:text-sm text-zinc-700">
            <a
              href="#"
              className="hover:text-[#c8102e] transition-colors py-2"
            >
              Home
            </a>

            <a
              href="#products"
              onClick={() => setSelectedCategory("all")}
              className={`transition-colors py-2 ${selectedCategory === "all" ? "text-[#c8102e] font-bold" : "hover:text-[#c8102e]"
                }`}
            >
              All Products (17)
            </a>

            {/* Categories Dropdown */}
            <div className="relative group">
              <button
                onClick={() => setCategoryDropdown(!categoryDropdown)}
                onMouseEnter={() => setCategoryDropdown(true)}
                className="flex items-center gap-1 hover:text-[#c8102e] transition-colors py-2"
              >
                <span>Categories</span>
                <ChevronDown className="w-3.5 h-3.5 transition-transform group-hover:rotate-180" />
              </button>

              <div
                onMouseLeave={() => setCategoryDropdown(false)}
                className={`absolute top-full left-0 w-56 bg-white rounded-2xl shadow-xl border border-stone-200 py-2 transition-all ${categoryDropdown ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-2 pointer-events-none"
                  }`}
              >
                {CATEGORIES.filter(c => c.id !== "all").map((cat) => (
                  <a
                    key={cat.id}
                    href="#products"
                    onClick={() => {
                      setSelectedCategory(cat.id);
                      setCategoryDropdown(false);
                    }}
                    className="flex items-center justify-between px-4 py-2.5 text-xs text-zinc-700 hover:bg-stone-50 hover:text-[#c8102e] font-medium"
                  >
                    <span>{cat.label}</span>
                    <span className="text-[10px] bg-stone-100 text-stone-500 px-1.5 py-0.5 rounded-full font-bold">
                      {cat.count}
                    </span>
                  </a>
                ))}
              </div>
            </div>

            <a
              href="#ceo-message"
              className="hover:text-[#c8102e] transition-colors py-2 text-[#c8102e] font-bold flex items-center gap-1"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>CEO Message</span>
            </a>

            <a
              href="#why-Swizz"
              className="hover:text-[#c8102e] transition-colors py-2"
            >
              Why Swizz
            </a>
          </nav>

          {/* Actions: Search, WhatsApp Direct, Cart, Menu Toggle */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Search Box */}
            <div className="relative hidden md:block w-40 lg:w-56">
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-stone-100 border border-stone-200 rounded-full pl-8 pr-3 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-[#c8102e]/30 focus:border-[#c8102e] transition"
              />
              <Search className="w-3.5 h-3.5 text-stone-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-stone-400 hover:text-stone-700"
                >
                  ×
                </button>
              )}
            </div>

            {/* Mobile Search Toggle */}
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="md:hidden p-2 text-zinc-700 hover:text-[#c8102e] rounded-xl hover:bg-stone-100 transition"
              aria-label="Toggle search"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* WhatsApp Direct Action Button */}
            <a
              href={directWhatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white px-3.5 py-2 rounded-xl text-xs font-bold shadow-sm hover:shadow-emerald-600/30 transition active:scale-95"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>0310-2067193</span>
            </a>

            {/* Cart Button */}
            <button
              onClick={onOpenCart}
              className="relative p-2.5 bg-stone-100 hover:bg-[#c8102e] hover:text-white text-zinc-800 rounded-xl transition shadow-sm active:scale-95 flex items-center justify-center group"
              aria-label="Shopping basket"
            >
              <ShoppingBag className="w-5 h-5 transition-transform group-hover:scale-110" />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-[#c8102e] group-hover:bg-white group-hover:text-[#c8102e] text-white text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center border-2 border-white shadow-sm">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile / Tablet Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 text-zinc-700 hover:text-[#c8102e] rounded-xl hover:bg-stone-100 transition"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Search Input */}
        {searchOpen && (
          <div className="md:hidden pb-3">
            <div className="relative">
              <input
                type="text"
                placeholder="Search jam, achar, vinegar, sauces..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-stone-100 border border-stone-200 rounded-xl pl-9 pr-4 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-[#c8102e]"
                autoFocus
              />
              <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
            </div>
          </div>
        )}
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-white border-t border-stone-200 shadow-2xl px-5 py-5 space-y-4">
          <div className="space-y-1 font-bold text-sm text-zinc-800">
            <a
              href="#"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-xl hover:bg-stone-50"
            >
              Home
            </a>
            <a
              href="#products"
              onClick={() => {
                setSelectedCategory("all");
                setMobileMenuOpen(false);
              }}
              className="block px-3 py-2 rounded-xl hover:bg-stone-50 text-[#c8102e]"
            >
              All Products (17)
            </a>

            <div className="pt-2 pb-1 px-3 text-[11px] font-extrabold uppercase tracking-wider text-stone-400">
              Categories
            </div>
            {CATEGORIES.filter(c => c.id !== "all").map((cat) => (
              <a
                key={cat.id}
                href="#products"
                onClick={() => {
                  setSelectedCategory(cat.id);
                  setMobileMenuOpen(false);
                }}
                className="flex items-center justify-between px-3 py-2 rounded-xl hover:bg-stone-50 text-xs font-semibold text-stone-700"
              >
                <span>{cat.label}</span>
                <span className="text-[10px] bg-stone-100 text-stone-600 px-2 py-0.5 rounded-full font-bold">
                  {cat.count}
                </span>
              </a>
            ))}

            <div className="pt-2 border-t border-stone-100 space-y-1">
              <a
                href="#ceo-message"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-xl hover:bg-stone-50 text-[#c8102e]"
              >
                Message from CEO
              </a>
              <a
                href="#why-Swizz"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-xl hover:bg-stone-50"
              >
                Why Swizz Foods
              </a>
            </div>
          </div>

          <div className="pt-3 border-t border-stone-100">
            <a
              href={directWhatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-emerald-600 text-white py-3 rounded-xl font-bold w-full shadow-md text-xs"
            >
              <MessageCircle className="w-4 h-4" /> Order on WhatsApp: 0310-2067193
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
