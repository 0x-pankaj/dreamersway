"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from 'next/navigation';
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu, Phone } from "lucide-react";
import Image from "next/image";
import TopBar from "./TopBar";

const navigationLinks = [
  { href: "/", label: "Home" },
  { href: "/colleges", label: "Colleges" },
  { href: "/notices", label: "Notices" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  // Track scroll for navbar shadow effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    // Handle scroll to contact section on home page
    if (href === "/#contact" && pathname === "/") {
      e.preventDefault();
      const element = document.querySelector("#contact");
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
        setIsOpen(false);
      }
    }
  };

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    if (href === "/contact") return false;
    return pathname.startsWith(href);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* Top Bar */}
      <TopBar />

      {/* Main Navigation */}
      <nav className={`bg-white/95 dark:bg-black/95 backdrop-blur-sm border-b border-gray-100 dark:border-gray-800 transition-shadow duration-300 ${scrolled ? 'shadow-md dark:shadow-gray-900/50' : ''}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center min-h-[4.5rem] py-2">
            {/* Logo */}
            <div className="flex items-center">
              <Link
                href="/"
                className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight flex items-center gap-2"
              >
                <Image
                  src="/dwc_logo_dark.png"
                  width={120}
                  height={120}
                  alt="DWC Logo"
                  priority
                  className="h-10 w-auto lg:h-12 max-w-[200px] object-contain dark:hidden"
                />
                <Image
                  src="/dwc_logo.png"
                  width={120}
                  height={120}
                  alt="DWC Logo"
                  priority
                  className="h-10 w-auto lg:h-12 max-w-[200px] object-contain hidden dark:block"
                />
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              {navigationLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${isActive(link.href)
                    ? 'text-sky-600 bg-sky-50 dark:bg-sky-900/20'
                    : 'text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-900'
                    }`}
                  onClick={(e) => handleClick(e, link.href)}
                >
                  {link.label}
                </Link>
              ))}

              {/* CTA Button */}
              <a
                href="https://cal.com/pankaj-singh-iqlvyw/15min"
                target="_blank"
                rel="noopener noreferrer"
                className="ml-4 inline-flex items-center gap-2 bg-sky-600 hover:bg-sky-700 text-white px-5 py-2.5 rounded-lg font-medium text-sm transition-colors shadow-sm hover:shadow"
              >
                Book Consultation
              </a>
            </div>

            {/* Mobile Navigation */}
            <div className="md:hidden flex items-center gap-2">
              <a
                href="tel:+9779819602000"
                className="inline-flex items-center justify-center w-10 h-10 bg-sky-600 text-white rounded-lg"
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
                <SheetContent side="right" className="w-80">
                  <SheetHeader>
                    <SheetTitle className="text-left font-mont">MENU</SheetTitle>
                  </SheetHeader>
                  <div className="flex flex-col mt-8 space-y-1">
                    {navigationLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        className={`text-lg py-3 px-4 rounded-lg transition-colors ${isActive(link.href)
                          ? 'text-sky-600 bg-sky-50 dark:bg-sky-900/20 font-medium'
                          : 'text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-900'
                          }`}
                        onClick={(e) => handleClick(e, link.href)}
                      >
                        {link.label}
                      </Link>
                    ))}

                    <div className="pt-4 mt-4 border-t border-gray-100 dark:border-gray-800">
                      <a
                        href="https://cal.com/pankaj-singh-iqlvyw/15min"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 bg-sky-600 hover:bg-sky-700 text-white px-5 py-3 rounded-lg font-medium transition-colors"
                      >
                        Book Consultation
                      </a>
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
