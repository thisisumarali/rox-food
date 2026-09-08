"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { COMPANY_INFO } from "../data/products";
import {
  MessageCircle,
  ShoppingBag,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Tag
} from "lucide-react";

export default function HeroBanner({ onSelectProduct, onAddToCart }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const slides = [
    {
      id: "stawberry-jam-bucket",
      name: "Swiss Strawberry Jam",
      subtitle: "Meetthi Eid Ki Meetthi Khushi",
      categoryTag: "🍓 Premium Fruit Preserves",
      price: 650,
      originalPrice: 750,
      unit: "1 kg Family Tub",
      image: "/stawberryjam.jpeg",
      badge: "Festive Eid Bestseller",
      tagline: "Bursting with farm-fresh strawberry pulp and natural sweetness. Handcrafted by Rox Food Pvt Ltd Karachi for your family breakfast feasts.",
      highlights: ["Real Fruit Pulp", "Zero Added Gelatin", "100% Halal Certified", "Karachi Facility"]
    },
    {
      id: "swiss-mix-achar-eid",
      name: "Swiss Mix Achar in Oil",
      subtitle: "Asli Sarson Ka Tel & Desi Masala",
      categoryTag: "🌶️ Traditional Desi Pickles",
      price: 490,
      originalPrice: 580,
      unit: "1 kg Tub (Eid Special)",
      image: "/mix-achar.jpeg",
      badge: "Pure Sarson Oil Achar",
      tagline: "Authentic Pakistani mixed pickle cured in cold-pressed mustard oil with fenugreek, fennel, raw green mangoes, crunchy carrots, and green chillies.",
      highlights: ["Pure Mustard (Sarson) Oil", "Desi Dastarkhwan Heritage", "Aged Traditional Recipe", "100% Halal"]
    },
    {
      id: "swiss-synthetic-vinegar-bottle",
      name: "Swiss Synthetic Vinegar",
      subtitle: "Crystal Clear Purity & Balanced Acidity",
      categoryTag: "🍶 Pure Kitchen Essentials",
      price: 190,
      originalPrice: 230,
      unit: "800 ml Fluted Bottle",
      image: "/vinegar bottle.jpeg",
      badge: "Gourmet Chinese & Pickling",
      tagline: "High-purity distilled table vinegar calibrated with 5% balanced acidity. Perfect for Chinese soups, marinating meats, salad dressings, and homemade pickling.",
      highlights: ["Crystal Clear Purity", "Ergonomic Fluted Bottle", "Multi-Purpose Culinary", "HACCP Safety Standard"]
    }
  ];

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  // Autoplay slider every 5 seconds
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(interval);
  }, [isPaused, nextSlide]);

  const getWhatsAppUrl = (slide) => {
    const text = `Assalam-o-Alaikum Rox Food / Swiss!
I want to order from the Hero Slide Banner:
- *Product:* ${slide.name} (${slide.unit})
- *Price:* Rs. ${slide.price} PKR
- *Quantity:* 1

Please confirm delivery to my address and total bill.`;
    return `https://wa.me/${COMPANY_INFO.whatsappNumberIntl}?text=${encodeURIComponent(text)}`;
  };

  return (
    <section
      className="relative w-full overflow-hidden bg-zinc-950 select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      aria-label="Full Screen Hero Banner Slider"
    >
      {/* Full-Screen Slides Container */}
      <div className="relative w-full min-h-[580px] sm:min-h-[640px] lg:min-h-[720px] 2xl:min-h-[760px] flex items-center">
        {slides.map((slide, idx) => {
          const isActive = idx === currentSlide;
          const waUrl = getWhatsAppUrl(slide);

          return (
            <div
              key={slide.id}
              className={`absolute inset-0 w-full h-full transition-all duration-1000 ease-in-out ${
                isActive
                  ? "opacity-100 scale-100 z-10 pointer-events-auto"
                  : "opacity-0 scale-105 z-0 pointer-events-none"
              }`}
            >
              {/* 1. The Real Product Image AS the Full Slide Background */}
              <div className="absolute inset-0 w-full h-full overflow-hidden">
                <Image
                  src={slide.image}
                  alt={slide.name}
                  fill
                  priority={idx === 0}
                  className="object-cover object-center scale-105 transition-transform duration-10000"
                />

                {/* 2. Seamless Gradient Overlays for High Legibility & Premium Contrast */}
                {/* Dark gradient on the left for text */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/80 to-black/40 lg:from-black/90 lg:via-black/60 lg:to-black/20" />
                {/* Vignette on top and bottom */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/60" />
              </div>

              {/* 3. Slide Content Overlay */}
              <div className="relative max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 py-14 lg:py-20 flex items-center">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center w-full">
                  
                  {/* Left Column: Glassmorphic Banner Card & Call-to-Actions */}
                  <div className="lg:col-span-8 text-white space-y-5 text-center lg:text-left">
                    {/* Top Badges */}
                    <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5">
                      <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-black bg-white/20 backdrop-blur-md text-white border border-white/30 tracking-wide uppercase shadow-lg">
                        <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                        {slide.badge}
                      </span>
                      <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold bg-black/50 backdrop-blur-md text-amber-200 border border-white/15">
                        <Tag className="w-3.5 h-3.5" />
                        {slide.categoryTag}
                      </span>
                    </div>

                    {/* Headline */}
                    <div className="space-y-1.5">
                      <p className="text-amber-300 font-black text-sm sm:text-base lg:text-lg tracking-widest uppercase drop-shadow">
                        {slide.subtitle}
                      </p>
                      <h1 className="text-3xl sm:text-5xl lg:text-6xl 2xl:text-7xl font-black text-white tracking-tight leading-[1.08] drop-shadow-2xl">
                        {slide.name}
                      </h1>
                    </div>

                    {/* Tagline */}
                    <p className="text-stone-200 text-sm sm:text-base lg:text-lg max-w-2xl leading-relaxed mx-auto lg:mx-0 drop-shadow-md">
                      {slide.tagline}
                    </p>

                    {/* Highlights Pills */}
                    <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 pt-1">
                      {slide.highlights.map((h, i) => (
                        <div
                          key={i}
                          className="flex items-center gap-1.5 bg-black/60 backdrop-blur-md border border-white/20 px-3 py-1.5 rounded-xl text-xs text-stone-100 font-semibold shadow-md"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                          <span>{h}</span>
                        </div>
                      ))}
                    </div>

                    {/* Pricing Box */}
                    <div className="flex items-baseline justify-center lg:justify-start gap-3 pt-2">
                      <div className="bg-black/60 backdrop-blur-xl border border-white/25 px-5 py-2.5 rounded-2xl flex items-baseline gap-2.5 shadow-2xl">
                        <span className="text-xs uppercase font-black text-amber-300 tracking-wider">
                          Price in PKR:
                        </span>
                        <span className="text-2xl sm:text-3xl lg:text-4xl font-black text-white">
                          Rs. {slide.price}
                        </span>
                        <span className="text-xs text-stone-300 font-bold">({slide.unit})</span>
                        {slide.originalPrice && (
                          <span className="text-xs text-stone-400 line-through ml-1">
                            Rs. {slide.originalPrice}
                          </span>
                        )}
                        <span className="text-[10px] font-bold text-emerald-300 bg-emerald-950/70 border border-emerald-500/40 px-2 py-0.5 rounded-full ml-1">
                          Special Rate
                        </span>
                      </div>
                    </div>

                    {/* Action CTAs */}
                    <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 pt-3">
                      <a
                        href={waUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-emerald-500 hover:bg-emerald-600 text-white font-black text-sm px-8 py-4 rounded-2xl shadow-2xl hover:shadow-emerald-500/50 transition-all active:scale-95 group"
                      >
                        <MessageCircle className="w-5 h-5 fill-current transition-transform group-hover:scale-110" />
                        <span>Order on WhatsApp (0310-2067193)</span>
                      </a>

                      <button
                        onClick={() => onAddToCart(slide)}
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white/20 hover:bg-white/30 backdrop-blur-xl text-white border border-white/40 font-bold text-sm px-6 py-4 rounded-2xl shadow-xl transition active:scale-95"
                      >
                        <ShoppingBag className="w-5 h-5" />
                        <span>+ Add to Basket</span>
                      </button>

                      <a
                        href="#products"
                        className="hidden sm:inline-flex items-center gap-1.5 text-xs font-bold text-stone-300 hover:text-white px-3 py-2 transition"
                      >
                        <span>View All 17 Products</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>

                  {/* Right Column: Mini Clear Stamp Card highlighting Rox Food Pvt Ltd */}
                  <div className="hidden lg:flex lg:col-span-4 justify-end">
                    <div className="bg-black/50 backdrop-blur-xl border border-white/20 p-5 rounded-3xl shadow-2xl text-white max-w-xs space-y-3">
                      <div className="flex items-center gap-2 text-xs font-bold text-amber-300">
                        <ShieldCheck className="w-4 h-4 text-emerald-400" />
                        <span>Rox Food Pvt Ltd Karachi</span>
                      </div>
                      <p className="text-xs text-stone-300 leading-relaxed">
                        Authentic culinary products processed under ISO &amp; HACCP quality standards. Freshly dispatched nationwide.
                      </p>
                      <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[11px] text-stone-400">
                        <span>Helpline:</span>
                        <strong className="text-white">0310-2067193</strong>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          );
        })}

        {/* Previous & Next Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-black/60 hover:bg-black/90 backdrop-blur-xl border border-white/30 text-white flex items-center justify-center transition-all hover:scale-110 active:scale-95 shadow-2xl"
          aria-label="Previous Slide"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-black/60 hover:bg-black/90 backdrop-blur-xl border border-white/30 text-white flex items-center justify-center transition-all hover:scale-110 active:scale-95 shadow-2xl"
          aria-label="Next Slide"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Bottom Slide Switcher Bar / Thumbnails */}
        <div className="absolute bottom-5 sm:bottom-7 left-1/2 -translate-x-1/2 z-20 w-full max-w-xl px-4">
          <div className="bg-black/70 backdrop-blur-2xl border border-white/25 rounded-2xl p-2 flex items-center justify-between gap-2 shadow-2xl">
            {slides.map((s, i) => {
              const isSelected = i === currentSlide;
              return (
                <button
                  key={s.id}
                  onClick={() => setCurrentSlide(i)}
                  className={`flex-1 flex items-center gap-2.5 p-1.5 sm:p-2 rounded-xl transition-all text-left ${
                    isSelected
                      ? "bg-white/25 border border-white/40 shadow-lg scale-102"
                      : "hover:bg-white/10 opacity-70 hover:opacity-100 border border-transparent"
                  }`}
                >
                  <div className="relative w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-black/40 overflow-hidden shrink-0 border border-white/20">
                    <Image
                      src={s.image}
                      alt={s.name}
                      fill
                      sizes="40px"
                      className="object-cover"
                    />
                  </div>
                  <div className="min-w-0 flex-1 hidden sm:block">
                    <p className="text-[11px] font-bold text-white truncate">
                      {s.name.replace("Swiss ", "")}
                    </p>
                    <p className="text-[10px] font-black text-amber-300">
                      Rs. {s.price} PKR
                    </p>
                  </div>
                  {/* Mobile progress bar */}
                  <div className="w-full sm:hidden h-1 bg-white/20 rounded-full overflow-hidden">
                    {isSelected && <div className="h-full bg-amber-400 rounded-full" />}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
