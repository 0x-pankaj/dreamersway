"use client";

import { useEffect, useState } from "react";
import WhatsAppButton from "@/components/WhatsAppButton";
import MobileContactBar from "@/components/MobileContactBar";
import { ArrowUp } from "lucide-react";

export default function ClientBody({
  children,
}: {
  children: React.ReactNode;
}) {
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="antialiased">
      {children}
      <WhatsAppButton />
      <MobileContactBar />

      {/* Back to Top Button */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-24 right-6 z-50 flex items-center justify-center w-12 h-12 bg-primary hover:bg-primary/90 text-primary-foreground rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 ${
          showBackToTop ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
        }`}
        aria-label="Back to top"
      >
        <ArrowUp className="w-5 h-5" />
      </button>
    </div>
  );
}
