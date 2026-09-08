"use client";

import { useState } from "react";
import Image from "next/image";
import { COMPANY_INFO } from "../data/products";
import {
  X,
  Trash2,
  Plus,
  Minus,
  MessageCircle,
  ShoppingBag,
  ArrowRight,
  ShieldCheck,
  Truck
} from "lucide-react";

export default function CartDrawer({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart
}) {
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerAddress, setCustomerAddress] = useState("");

  if (!isOpen) return null;

  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const handleCheckoutViaWhatsApp = () => {
    if (cartItems.length === 0) return;

    let itemsListText = cartItems
      .map(
        (item, idx) =>
          `${idx + 1}. *${item.name}* (${item.unit})\n   Qty: ${item.quantity} × Rs. ${item.price} = Rs. ${(
            item.price * item.quantity
          ).toLocaleString()} PKR`
      )
      .join("\n");

    const message = `*NEW ORDER - SWISS FOODS (ROX FOOD PVT LTD)*
=================================
*CUSTOMER DETAILS:*
• *Name:* ${customerName.trim() || "Not provided"}
• *Contact:* ${customerPhone.trim() || "Same as WhatsApp"}
• *Address:* ${customerAddress.trim() || "To be confirmed on chat"}
=================================
*ORDER ITEMS (${totalItems} total):*
${itemsListText}
=================================
*GRAND TOTAL:* Rs. ${totalAmount.toLocaleString()} PKR
=================================
Please confirm my order, shipping charges, and delivery schedule. Thank you!`;

    const url = `https://wa.me/${COMPANY_INFO.whatsappNumberIntl}?text=${encodeURIComponent(
      message
    )}`;
    window.open(url, "_blank");
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col">
          {/* Header */}
          <div className="p-5 border-b border-stone-200 flex items-center justify-between bg-stone-50">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-[#c8102e] text-white rounded-xl">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-base font-black text-zinc-900">Your Food Basket</h2>
                <p className="text-xs text-stone-500">
                  {totalItems} {totalItems === 1 ? "item" : "items"} selected
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-xl text-stone-500 hover:bg-stone-200 transition"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {cartItems.length === 0 ? (
              <div className="text-center py-16 space-y-3">
                <div className="w-16 h-16 bg-stone-100 rounded-full flex items-center justify-center mx-auto text-stone-400">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h3 className="text-base font-bold text-zinc-800">Your basket is empty</h3>
                <p className="text-xs text-stone-500 max-w-xs mx-auto">
                  Explore our Swiss Strawberry Jam, traditional Sarson oil pickles, sauces, and vinegars to start ordering.
                </p>
                <button
                  onClick={onClose}
                  className="mt-2 inline-flex items-center gap-1.5 bg-[#c8102e] text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow"
                >
                  <span>Explore Products</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-3 p-3 bg-stone-50 rounded-2xl border border-stone-200/80 hover:border-stone-300 transition"
                  >
                    <div className="relative w-16 h-16 rounded-xl bg-white p-1 border border-stone-200 overflow-hidden shrink-0">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        sizes="64px"
                        className="object-contain"
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-bold text-zinc-900 truncate">
                        {item.name}
                      </h4>
                      <p className="text-[11px] text-stone-500">{item.unit}</p>
                      <p className="text-xs font-black text-[#c8102e] mt-0.5">
                        Rs. {item.price} PKR
                      </p>
                    </div>

                    {/* Quantity controls */}
                    <div className="flex items-center gap-1.5 border border-stone-300 rounded-lg p-0.5 bg-white">
                      <button
                        onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                        className="p-1 text-stone-600 hover:text-black transition"
                        aria-label="Decrease"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-xs font-bold w-5 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                        className="p-1 text-stone-600 hover:text-black transition"
                        aria-label="Increase"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    {/* Remove */}
                    <button
                      onClick={() => onRemoveItem(item.id)}
                      className="p-1.5 text-stone-400 hover:text-red-600 rounded-lg hover:bg-stone-100 transition"
                      aria-label="Remove item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}

                <button
                  onClick={onClearCart}
                  className="text-xs text-stone-400 hover:text-red-600 underline font-medium pt-1 block ml-auto"
                >
                  Clear all items
                </button>
              </div>
            )}

            {/* Optional Customer info form for speedy checkout */}
            {cartItems.length > 0 && (
              <div className="pt-4 border-t border-stone-200 space-y-3">
                <p className="text-xs font-bold text-zinc-800 uppercase tracking-wider">
                  Delivery Details (Optional):
                </p>
                <div className="space-y-2 text-xs">
                  <input
                    type="text"
                    placeholder="Your Full Name"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#c8102e]"
                  />
                  <input
                    type="tel"
                    placeholder="Mobile / WhatsApp Number"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#c8102e]"
                  />
                  <textarea
                    rows={2}
                    placeholder="Delivery Address & City (e.g. Clifton, Karachi)"
                    value={customerAddress}
                    onChange={(e) => setCustomerAddress(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#c8102e] resize-none"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Footer & WhatsApp Checkout */}
          {cartItems.length > 0 && (
            <div className="p-5 border-t border-stone-200 bg-stone-50 space-y-3">
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs text-stone-500">
                  <span>Subtotal ({totalItems} items)</span>
                  <span className="font-semibold text-zinc-900">
                    Rs. {totalAmount.toLocaleString()} PKR
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs text-stone-500">
                  <span className="flex items-center gap-1">
                    <Truck className="w-3.5 h-3.5 text-emerald-600" /> Delivery Charges
                  </span>
                  <span className="font-medium text-emerald-700">Calculated on WhatsApp</span>
                </div>
                <div className="flex items-center justify-between text-base font-black text-zinc-950 pt-2 border-t border-stone-200">
                  <span>Estimated Total</span>
                  <span className="text-xl text-[#c8102e]">
                    Rs. {totalAmount.toLocaleString()} PKR
                  </span>
                </div>
              </div>

              {/* Main Checkout Button redirecting to 03102067193 */}
              <button
                onClick={handleCheckoutViaWhatsApp}
                className="w-full py-4 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-black text-sm rounded-2xl shadow-lg hover:shadow-emerald-600/30 transition flex items-center justify-center gap-2 active:scale-98"
              >
                <MessageCircle className="w-5 h-5 fill-current" />
                <span>Send Order to 03102067193</span>
              </button>

              <div className="flex items-center justify-center gap-3 text-[11px] text-stone-400 font-medium">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> Safe WhatsApp Order
                </span>
                <span>•</span>
                <span>Rox Food Pvt Ltd Karachi</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
