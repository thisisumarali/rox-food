"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { PRODUCTS, CATEGORIES, COMPANY_INFO } from "../data/products";
import {
  Search,
  SlidersHorizontal,
  ShoppingBag,
  MessageCircle,
  Eye,
  Star,
  Sparkles,
  Tag,
  Check
} from "lucide-react";

export default function ProductCatalog({
  searchTerm,
  setSearchTerm,
  selectedCategory,
  setSelectedCategory,
  onOpenProductModal,
  onAddToCart
}) {
  const [sortBy, setSortBy] = useState("default");
  const [addedAnimationId, setAddedAnimationId] = useState(null);

  // Filter & sort products
  const filteredProducts = useMemo(() => {
    let list = [...PRODUCTS];

    if (selectedCategory !== "all") {
      list = list.filter((item) => item.category === selectedCategory);
    }

    if (searchTerm.trim() !== "") {
      const q = searchTerm.toLowerCase();
      list = list.filter(
        (item) =>
          item.name.toLowerCase().includes(q) ||
          item.shortDesc.toLowerCase().includes(q) ||
          item.categoryLabel.toLowerCase().includes(q) ||
          item.tag.toLowerCase().includes(q)
      );
    }

    if (sortBy === "price-low") {
      list.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-high") {
      list.sort((a, b) => b.price - a.price);
    } else if (sortBy === "rating") {
      list.sort((a, b) => b.rating - a.rating);
    }

    return list;
  }, [selectedCategory, searchTerm, sortBy]);

  const handleAddToCartWithFeedback = (product) => {
    onAddToCart(product);
    setAddedAnimationId(product.id);
    setTimeout(() => {
      setAddedAnimationId(null);
    }, 1200);
  };

  const getWhatsAppOrderUrl = (product) => {
    const text = `Assalam-o-Alaikum Rox Food / Swiss! I would like to order:
- *Product:* ${product.name}
- *Size / Unit:* ${product.unit}
- *Price:* Rs. ${product.price} PKR
- *Quantity:* 1

Please share available stock, delivery time, and confirmation details for Karachi / Pakistan.`;
    return `https://wa.me/${COMPANY_INFO.whatsappNumberIntl}?text=${encodeURIComponent(text)}`;
  };

  return (
    <section id="products" className="py-16 bg-[#faf8f5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-900 mb-2">
              <Sparkles className="w-3.5 h-3.5" /> Complete Product Range
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-zinc-900 tracking-tight">
              Swiss Quality <span className="text-[#c8102e]">Culinary Collection</span>
            </h2>
            <p className="text-stone-600 text-sm sm:text-base mt-1 max-w-xl">
              All manufactured with premium ingredients by Rox Food Pvt Limited. 
              Select your favorites and order directly on WhatsApp.
            </p>
          </div>

          {/* Sort selector */}
          <div className="flex items-center gap-2 self-start md:self-auto">
            <span className="text-xs font-semibold text-stone-500 flex items-center gap-1">
              <SlidersHorizontal className="w-3.5 h-3.5" /> Sort:
            </span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-white border border-stone-200 rounded-xl px-3 py-2 text-xs font-semibold text-zinc-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#c8102e]"
            >
              <option value="default">Featured Selection</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none no-scrollbar">
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`whitespace-nowrap px-4 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 ${
                  isSelected
                    ? "bg-[#c8102e] text-white shadow-lg shadow-red-700/25 scale-105"
                    : "bg-white text-zinc-700 hover:bg-stone-100 border border-stone-200"
                }`}
              >
                <span>{cat.label}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                    isSelected ? "bg-white/20 text-white" : "bg-stone-100 text-stone-600"
                  }`}
                >
                  {cat.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Active Filter Indicators */}
        {(searchTerm || selectedCategory !== "all") && (
          <div className="flex items-center gap-3 mb-6 text-xs text-stone-600">
            <span>Showing {filteredProducts.length} results</span>
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="bg-stone-200 hover:bg-stone-300 text-zinc-800 px-2.5 py-1 rounded-full font-medium flex items-center gap-1"
              >
                Query: &ldquo;{searchTerm}&rdquo; ×
              </button>
            )}
            {selectedCategory !== "all" && (
              <button
                onClick={() => setSelectedCategory("all")}
                className="bg-stone-200 hover:bg-stone-300 text-zinc-800 px-2.5 py-1 rounded-full font-medium flex items-center gap-1"
              >
                Reset Category ×
              </button>
            )}
          </div>
        )}

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-stone-200 p-8">
            <p className="text-4xl mb-3">🔍</p>
            <h3 className="text-lg font-bold text-zinc-900">No products found</h3>
            <p className="text-xs text-stone-500 mt-1 mb-4">
              We couldn&apos;t find any item matching &ldquo;{searchTerm}&rdquo;. Try another search term.
            </p>
            <button
              onClick={() => {
                setSearchTerm("");
                setSelectedCategory("all");
              }}
              className="bg-[#c8102e] text-white text-xs font-bold px-4 py-2 rounded-xl"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => {
              const isJustAdded = addedAnimationId === product.id;
              const waUrl = getWhatsAppOrderUrl(product);

              return (
                <div
                  key={product.id}
                  className="product-card group bg-white rounded-3xl border border-stone-200/90 shadow-sm hover:shadow-xl hover:border-red-200 transition-all duration-300 flex flex-col overflow-hidden"
                >
                  {/* Card Image Area */}
                  <div className="relative h-60 w-full bg-stone-50 p-4 flex items-center justify-center overflow-hidden border-b border-stone-100">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="product-card-img object-contain p-3"
                    />

                    {/* Tag Badge */}
                    <div className="absolute top-3 left-3 z-10">
                      <span className="inline-flex items-center gap-1 bg-zinc-900/85 backdrop-blur-sm text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow-sm">
                        <Tag className="w-2.5 h-2.5 text-amber-400" />
                        {product.tag}
                      </span>
                    </div>

                    {/* Unit Size Pill */}
                    <div className="absolute top-3 right-3 z-10">
                      <span className="bg-white/90 backdrop-blur-sm border border-stone-200 text-zinc-700 text-[10px] font-bold px-2 py-0.5 rounded-lg shadow-sm">
                        {product.unit}
                      </span>
                    </div>

                    {/* Quick View Button on Hover */}
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                      <button
                        onClick={() => onOpenProductModal(product)}
                        className="bg-white text-zinc-900 font-bold text-xs px-3.5 py-2 rounded-xl shadow-lg hover:bg-stone-100 flex items-center gap-1.5 transition transform translate-y-2 group-hover:translate-y-0"
                      >
                        <Eye className="w-3.5 h-3.5 text-[#c8102e]" /> Quick View
                      </button>
                    </div>
                  </div>

                  {/* Card Details */}
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between text-xs text-stone-500">
                        <span className="font-semibold text-amber-700 uppercase text-[10px] tracking-wider">
                          {product.categoryLabel}
                        </span>
                        <div className="flex items-center gap-1 text-amber-500 font-bold text-[11px]">
                          <Star className="w-3 h-3 fill-current" />
                          <span>{product.rating}</span>
                          <span className="text-stone-400 font-normal">({product.reviewsCount})</span>
                        </div>
                      </div>

                      <h3
                        onClick={() => onOpenProductModal(product)}
                        className="text-base font-bold text-zinc-900 group-hover:text-[#c8102e] transition-colors line-clamp-1 cursor-pointer"
                        title={product.name}
                      >
                        {product.name}
                      </h3>

                      <p className="text-xs text-stone-500 line-clamp-2 leading-relaxed">
                        {product.shortDesc}
                      </p>
                    </div>

                    {/* Price & Primary WhatsApp Actions */}
                    <div className="pt-2 border-t border-stone-100 space-y-3">
                      <div className="flex items-baseline justify-between">
                        <div>
                          <span className="text-xs font-semibold text-stone-500 mr-1">PKR</span>
                          <span className="text-xl font-black text-zinc-950">
                            Rs. {product.price}
                          </span>
                          {product.originalPrice && (
                            <span className="text-xs text-stone-400 line-through ml-2">
                              Rs. {product.originalPrice}
                            </span>
                          )}
                        </div>
                        <span className="text-[10px] font-semibold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">
                          Save Rs. {product.originalPrice - product.price}
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        {/* Direct 1-Click WhatsApp Order */}
                        <a
                          href={waUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs py-2.5 px-2 rounded-xl shadow-sm transition active:scale-95"
                          title="Order directly to 03102067193 via WhatsApp"
                        >
                          <MessageCircle className="w-3.5 h-3.5 fill-current" />
                          <span>WhatsApp</span>
                        </a>

                        {/* Add to Cart Drawer */}
                        <button
                          onClick={() => handleAddToCartWithFeedback(product)}
                          className={`inline-flex items-center justify-center gap-1 text-xs font-bold py-2.5 px-2 rounded-xl border transition active:scale-95 ${
                            isJustAdded
                              ? "bg-emerald-100 text-emerald-800 border-emerald-300"
                              : "bg-stone-100 hover:bg-[#c8102e] hover:text-white hover:border-[#c8102e] text-zinc-800 border-stone-200"
                          }`}
                        >
                          {isJustAdded ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-emerald-700" />
                              <span>Added!</span>
                            </>
                          ) : (
                            <>
                              <ShoppingBag className="w-3.5 h-3.5" />
                              <span>+ Cart</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
