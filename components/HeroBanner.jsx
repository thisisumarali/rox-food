"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { COMPANY_INFO } from "../data/products";
import {
  MessageCircle,
  ShoppingBag,
  ChevronLeft,
  ChevronRight
} from "lucide-react";

export default function HeroBanner({ onSelectProduct, onAddToCart }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const slides = [
    {
      id: "stawberry-jam-bucket",
      name: "Swizz Strawberry Jam",
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
      id: "Swizz-mix-achar-eid",
      name: "Swizz Mix Achar in Oil",
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
      id: "Swizz-synthetic-vinegar-bottle",
      name: "Swizz Synthetic Vinegar",
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
    const text = `Assalam-o-Alaikum Rox Food / Swizz!
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
              className={`absolute inset-0 w-full h-full transition-all duration-1000 ease-in-out ${isActive
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



                    {/* Main Action Buttons */}
                    <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 pt-2">
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

        {/* Minimal Slide Indicator Dots */}
        <div className="absolute bottom-5 sm:bottom-7 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentSlide(i)}
              className={`transition-all duration-300 rounded-full ${
                i === currentSlide
                  ? "w-8 h-2 bg-amber-400 shadow-md"
                  : "w-2 h-2 bg-white/40 hover:bg-white/70"
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
