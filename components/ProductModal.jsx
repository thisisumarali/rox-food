"use client";

import { useState } from "react";
import Image from "next/image";
import { COMPANY_INFO } from "../data/products";
import {
  X,
  MessageCircle,
  ShoppingBag,
  CheckCircle2,
  ShieldCheck,
  Star,
  Plus,
  Minus,
  Sparkles,
  MapPin
} from "lucide-react";

export default function ProductModal({ product, onClose, onAddToCart }) {
  const [quantity, setQuantity] = useState(1);
  const [cityNote, setCityNote] = useState("");

  if (!product) return null;

  const totalPrice = product.price * quantity;

  const handleWhatsAppOrder = () => {
    const message = `*Order Request - Swizz Foods (Rox Food Pvt Ltd)*
--------------------------------------
*Product:* ${product.name}
*Packaging / Size:* ${product.unit}
*Unit Price:* Rs. ${product.price} PKR
*Quantity:* ${quantity}
*Total Amount:* Rs. ${totalPrice.toLocaleString()} PKR
${cityNote ? `*Delivery City / Note:* ${cityNote}` : ""}
--------------------------------------
Kindly confirm stock availability, delivery charges, and dispatch time.`;

    const url = `https://wa.me/${COMPANY_INFO.whatsappNumberIntl}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  const handleAddToCartModal = () => {
    for (let i = 0; i < quantity; i++) {
      onAddToCart(product);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-stone-200 overflow-hidden my-8">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-700 transition"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 max-h-[85vh] overflow-y-auto">
          {/* Left Column: Image */}
          <div className="md:col-span-5 bg-stone-50 p-6 flex flex-col items-center justify-center relative border-b md:border-b-0 md:border-r border-stone-200">
            <div className="relative w-full aspect-square max-w-[280px]">
              <Image
                src={product.image}
                alt={product.name}
                fill
                sizes="280px"
                className="object-contain p-2"
                priority
              />
            </div>

            <div className="mt-4 flex items-center gap-2 text-xs font-bold text-stone-600">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>100% Halal & Pure Formulation</span>
            </div>
            <span className="text-[11px] text-stone-400 mt-0.5">
              Rox Food Pvt Ltd • Karachi
            </span>
          </div>

          {/* Right Column: Details & Actions */}
          <div className="md:col-span-7 p-6 sm:p-8 flex flex-col justify-between space-y-5">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider bg-red-100 text-red-800 px-2.5 py-0.5 rounded-md">
                  <Sparkles className="w-3 h-3" />
                  {product.tag}
                </span>
                <span className="text-xs font-semibold text-stone-500">
                  {product.categoryLabel}
                </span>
              </div>

              <h2 className="text-2xl font-black text-zinc-900 leading-tight">
                {product.name}
              </h2>

              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1 text-amber-500 text-xs font-bold">
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <span>{product.rating}</span>
                  <span className="text-stone-400">({product.reviewsCount} customer reviews)</span>
                </div>
                <span className="text-stone-300">•</span>
                <span className="text-xs font-bold text-stone-700 bg-stone-100 px-2 py-0.5 rounded">
                  {product.unit}
                </span>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-3 pt-1">
                <span className="text-2xl sm:text-3xl font-black text-zinc-950">
                  Rs. {product.price}
                </span>
                {product.originalPrice && (
                  <span className="text-sm text-stone-400 line-through">
                    Rs. {product.originalPrice}
                  </span>
                )}
                <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                  Special Online Rate
                </span>
              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                {product.description}
              </p>

              {/* Ingredients & Highlights */}
              <div className="p-3.5 bg-stone-50 rounded-2xl border border-stone-200 text-xs space-y-1.5">
                <p className="font-bold text-zinc-800">Key Features:</p>
                <div className="grid grid-cols-2 gap-1.5 text-stone-600">
                  {product.features?.map((f, i) => (
                    <div key={i} className="flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0" />
                      <span className="truncate">{f}</span>
                    </div>
                  ))}
                </div>
                {product.ingredients && (
                  <p className="text-[11px] text-stone-500 pt-1 border-t border-stone-200/60 mt-2">
                    <strong>Ingredients:</strong> {product.ingredients}
                  </p>
                )}
              </div>
            </div>

            {/* Quantity Selector & WhatsApp Order Form */}
            <div className="space-y-3 pt-2 border-t border-stone-200">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-zinc-700">Select Quantity:</span>
                <div className="flex items-center gap-2 border border-stone-300 rounded-xl p-1 bg-white">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="p-1 rounded-lg hover:bg-stone-100 text-zinc-700 transition"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="w-8 text-center text-sm font-bold text-zinc-900">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="p-1 rounded-lg hover:bg-stone-100 text-zinc-700 transition"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Optional City Note */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="Your City / Delivery Address (Optional)"
                  value={cityNote}
                  onChange={(e) => setCityNote(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl pl-8 pr-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-[#c8102e]"
                />
                <MapPin className="w-3.5 h-3.5 text-stone-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
              </div>

              {/* Subtotal Pill */}
              <div className="flex items-center justify-between text-xs bg-amber-50 p-2.5 rounded-xl border border-amber-200">
                <span className="font-semibold text-amber-900">Order Subtotal:</span>
                <span className="font-black text-sm text-amber-950">
                  Rs. {totalPrice.toLocaleString()} PKR
                </span>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <button
                  onClick={handleWhatsAppOrder}
                  className="inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm py-3 px-4 rounded-xl shadow-md transition active:scale-95"
                >
                  <MessageCircle className="w-4 h-4 fill-current" />
                  <span>Order on WhatsApp (03102067193)</span>
                </button>

                <button
                  onClick={handleAddToCartModal}
                  className="inline-flex items-center justify-center gap-1.5 bg-stone-900 hover:bg-zinc-800 text-white font-bold text-xs sm:text-sm py-3 px-4 rounded-xl transition active:scale-95"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add {quantity} to Cart</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
