"use client";

import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import HeroBanner from "../components/HeroBanner";
import ProductCatalog from "../components/ProductCatalog";
import ProductModal from "../components/ProductModal";
import CartDrawer from "../components/CartDrawer";
import CeoMessage from "../components/CeoMessage";
import FeaturesSection from "../components/FeaturesSection";
import FaqSection from "../components/FaqSection";
import Footer from "../components/Footer";
import FloatingWhatsApp from "../components/FloatingWhatsApp";
import { CheckCircle2, ShoppingBag, ArrowRight } from "lucide-react";

export default function Home() {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProductForModal, setSelectedProductForModal] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [toastMessage, setToastMessage] = useState(null);

  // Load cart from localStorage on client mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem("rox_swiss_cart");
      if (saved) {
        setCartItems(JSON.parse(saved));
      }
    } catch (e) {
      console.error("Failed to load cart from storage", e);
    }
  }, []);

  // Sync cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem("rox_swiss_cart", JSON.stringify(cartItems));
    } catch (e) {
      console.error("Failed to save cart to storage", e);
    }
  }, [cartItems]);

  const showToast = (message) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const handleAddToCart = (product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [
          ...prev,
          {
            id: product.id,
            name: product.name,
            price: product.price,
            unit: product.unit,
            image: product.image,
            quantity: 1
          }
        ];
      }
    });
    showToast(`Added "${product.name}" to your basket!`);
  };

  const handleUpdateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      handleRemoveItem(productId);
    } else {
      setCartItems((prev) =>
        prev.map((item) =>
          item.id === productId ? { ...item, quantity: newQuantity } : item
        )
      );
    }
  };

  const handleRemoveItem = (productId) => {
    setCartItems((prev) => prev.filter((item) => item.id !== productId));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col selection:bg-red-500 selection:text-white">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-24 right-4 z-50 bg-zinc-900 text-white px-4 py-3 rounded-2xl shadow-2xl border border-zinc-700 flex items-center gap-3 animate-slideIn">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span className="text-xs font-bold">{toastMessage}</span>
          <button
            onClick={() => setIsCartOpen(true)}
            className="text-xs font-bold text-amber-300 hover:text-white underline ml-1"
          >
            View Basket
          </button>
        </div>
      )}

      {/* Navigation */}
      <Navbar
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />

      {/* Main Content */}
      <main className="flex-1">
        {/* Hero Banner with Strawberry Jam, Mix Achar, and Vinegar Bottle */}
        <HeroBanner
          onSelectProduct={(product) => setSelectedProductForModal(product)}
          onAddToCart={handleAddToCart}
        />

        {/* Product Catalog Grid with All Client Images */}
        <ProductCatalog
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          onOpenProductModal={(product) => setSelectedProductForModal(product)}
          onAddToCart={handleAddToCart}
        />

        {/* Message from CEO (Features CEO.jpeg) */}
        <CeoMessage />

        {/* Brand Features & Trust Signals */}
        <FeaturesSection />

        {/* FAQs */}
        <FaqSection />
      </main>

      {/* Footer */}
      <Footer onSelectCategory={(catId) => setSelectedCategory(catId)} />

      {/* Floating WhatsApp Action Button */}
      <FloatingWhatsApp />

      {/* Product Quick View Modal */}
      {selectedProductForModal && (
        <ProductModal
          product={selectedProductForModal}
          onClose={() => setSelectedProductForModal(null)}
          onAddToCart={handleAddToCart}
        />
      )}

      {/* Slide-out Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />
    </div>
  );
}
