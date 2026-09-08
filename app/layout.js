import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata = {
  title: "Swiss Foods | Rox Food Pvt Limited - Official E-Commerce Store",
  description:
    "Explore premium Swiss food products by Rox Food Pvt Ltd Karachi. Fresh Strawberry Jam, authentic Mix Achar in Sarson oil, Chilli Garlic Sauce, and Pure Synthetic Vinegar. Order directly on WhatsApp: 0310-2067193.",
  keywords: [
    "Rox Food Pvt Limited",
    "Swiss Foods Pakistan",
    "Swizz Jam",
    "Mix Achar Sarson Oil",
    "Strawberry Jam Pakistan",
    "Synthetic Vinegar",
    "Chilli Garlic Sauce",
    "Halal Food Karachi"
  ],
  authors: [{ name: "Rox Food Pvt Limited" }]
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${plusJakartaSans.variable} scroll-smooth`}>
      <body className="min-h-screen flex flex-col antialiased bg-[#faf8f5] text-zinc-900 selection:bg-red-500 selection:text-white">
        {children}
      </body>
    </html>
  );
}
