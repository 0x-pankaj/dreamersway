"use client";

import { useState } from "react";
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
import { Menu } from "lucide-react";
import Image from "next/image";

const homeNavigationLinks = [
  { href: "#services", label: "Services", isScroll: true },
  { href: "/properties", label: "Listings", isScroll: false },
  { href: "/about", label: "About", isScroll: false },
  { href: "#contact", label: "Contact", isScroll: true },
];

const otherPagesNavigationLinks = [
  { href: "/", label: "Home", isScroll: false },
  { href: "/properties", label: "Listings", isScroll: false },
  { href: "/about", label: "About", isScroll: false },
];

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // Determine which navigation links to show
  const navigationLinks = pathname === '/' ? homeNavigationLinks : otherPagesNavigationLinks;

  const handleClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
    isScroll: boolean
  ) => {
    if (isScroll) {
      e.preventDefault();
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
        setIsOpen(false);
      }
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link
              href="/"
              className="text-2xl font-bold text-gray-900 tracking-tight flex items-center gap-2"
            >
              <Image
                src="/metro_logo.png"
                width={100}
                height={100}
                alt="Metrosquare Logo"
                priority
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigationLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-gray-700 hover:text-gray-900 transition-colors font-medium ${
                  pathname === link.href ? 'text-sky-600' : ''
                }`}
                onClick={(e) => handleClick(e, link.href, link.isScroll)}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Open navigation menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80">
                <SheetHeader>
                  <SheetTitle className="text-left font-mont">MENU</SheetTitle>
                </SheetHeader>
                <div className="flex flex-col mt-8  items-center">
                  {navigationLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={`text-lg text-gray-700 hover:text-gray-900 transition-colors py-2 border-1 w-full  ${
                        pathname === link.href ? 'text-sky-600' : ''
                      }`}
                      onClick={(e) => handleClick(e, link.href, link.isScroll)}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}
