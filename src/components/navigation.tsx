"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu, Phone, ChevronDown } from "lucide-react";
import Image from "next/image";
import TopBar from "./TopBar";
import { siteConfig } from "@/lib/site-config";

const navigationLinks: { href: string; label: string }[] = [
  { href: "/", label: "Home" },
  { href: "/universities", label: "Universities" },
  { href: "/scholarships", label: "Scholarships" },
  { href: "/services", label: "Services" },
  { href: "/blog", label: "Resources" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [destOpen, setDestOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <TopBar />
      <nav
        className={`bg-white/95 dark:bg-black/95 backdrop-blur-sm border-b border-gray-100 dark:border-gray-800 transition-shadow duration-300 ${scrolled ? "shadow-md dark:shadow-gray-900/50" : ""
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center min-h-[4.5rem] py-2">
            <div className="flex items-center">
              <Link
                href="/"
                className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight flex items-center gap-2"
              >
                <Image
                  src="/dwc_logo_dark.png"
                  width={120}
                  height={120}
                  alt={`${siteConfig.name} Logo`}
                  priority
                  className="h-10 w-auto lg:h-12 max-w-[200px] object-contain dark:hidden"
                />
                <Image
                  src="/dwc_logo.png"
                  width={120}
                  height={120}
                  alt={`${siteConfig.name} Logo`}
                  priority
                  className="h-10 w-auto lg:h-12 max-w-[200px] object-contain hidden dark:block"
                />
              </Link>
            </div>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center space-x-1">
              <Link
                href="/"
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${isActive("/")
                  ? "text-primary bg-primary/5 dark:bg-primary/10"
                  : "text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-900"
                  }`}
              >
                Home
              </Link>

              {/* Destinations dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setDestOpen(true)}
                onMouseLeave={() => setDestOpen(false)}
              >
                <button
                  className={`px-3 py-2 rounded-lg text-sm font-medium flex items-center gap-1 transition-all ${pathname.startsWith("/study-in")
                    ? "text-primary bg-primary/5 dark:bg-primary/10"
                    : "text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-900"
                    }`}
                >
                  Destinations <ChevronDown className="w-4 h-4" />
                </button>
                {destOpen && (
                  <div className="absolute top-full left-0 pt-2 w-[360px]">
                    <div className="bg-white dark:bg-gray-950 border border-gray-100 dark:border-gray-800 rounded-2xl shadow-2xl overflow-hidden">
                      <div className="px-5 pt-4 pb-2 text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                        Study Abroad
                      </div>
                      {siteConfig.countries.map((c) => (
                        <Link
                          key={c.code}
                          href={`/study-in/${c.code}`}
                          className="flex items-center gap-3 px-5 py-3 hover:bg-primary/5 dark:hover:bg-primary/10 transition-colors group"
                        >
                          <span className="text-3xl">{c.flag}</span>
                          <div className="flex-1">
                            <div className="font-semibold text-gray-900 dark:text-white text-sm group-hover:text-primary transition-colors">
                              {c.name}
                            </div>
                            <div className="text-xs text-gray-500 dark:text-gray-400">
                              {c.stream} · {c.forStudents}
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {navigationLinks.slice(1).map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${isActive(link.href)
                    ? "text-primary bg-primary/5 dark:bg-primary/10"
                    : "text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-900"
                    }`}
                >
                  {link.label}
                </Link>
              ))}

              <Link
                href="/contact?intent=book"
                className="ml-3 inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground px-5 py-2.5 rounded-lg font-medium text-sm transition-colors shadow-sm hover:shadow"
              >
                Free Consultation
              </Link>
            </div>

            {/* Mobile */}
            <div className="lg:hidden flex items-center gap-2">
              <a
                href={`tel:${siteConfig.contact.phonePrimary.replace(/\s/g, "")}`}
                className="inline-flex items-center justify-center w-10 h-10 bg-primary text-primary-foreground rounded-lg"
              >
                <Phone className="w-5 h-5" />
              </a>
              <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-10 w-10">
                    <Menu className="h-6 w-6" />
                    <span className="sr-only">Open navigation menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-80 overflow-y-auto">
                  <SheetHeader>
                    <SheetTitle className="text-left font-mont">MENU</SheetTitle>
                  </SheetHeader>
                  <div className="flex flex-col mt-6 space-y-1">
                    <Link
                      href="/"
                      onClick={() => setIsOpen(false)}
                      className={`text-base py-3 px-4 rounded-lg ${isActive("/") ? "text-primary bg-primary/5 font-semibold" : "text-gray-700 dark:text-gray-300"
                        }`}
                    >
                      Home
                    </Link>

                    <div className="pt-2 px-4 text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                      Destinations
                    </div>
                    {siteConfig.countries.map((c) => (
                      <Link
                        key={c.code}
                        href={`/study-in/${c.code}`}
                        onClick={() => setIsOpen(false)}
                        className="flex items-center gap-3 px-4 py-2.5 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-900"
                      >
                        <span className="text-2xl">{c.flag}</span>
                        <div>
                          <div className="text-sm font-semibold text-gray-900 dark:text-white">{c.name}</div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">{c.stream}</div>
                        </div>
                      </Link>
                    ))}

                    <div className="pt-2 px-4 text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                      Explore
                    </div>
                    {navigationLinks.slice(1).map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={() => setIsOpen(false)}
                        className={`text-base py-3 px-4 rounded-lg transition-colors ${isActive(link.href)
                          ? "text-primary bg-primary/5 font-semibold"
                          : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-900"
                          }`}
                      >
                        {link.label}
                      </Link>
                    ))}

                    <div className="pt-4 mt-4 border-t border-gray-100 dark:border-gray-800">
                      <Link
                        href="/contact?intent=book"
                        onClick={() => setIsOpen(false)}
                        className="flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground px-5 py-3 rounded-lg font-medium transition-colors"
                      >
                        Free Consultation
                      </Link>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
