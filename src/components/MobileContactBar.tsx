"use client";

import { Phone, Mail, MessageCircle, Calendar } from "lucide-react";
import Link from "next/link";
import { siteConfig } from "@/lib/site-config";

export default function MobileContactBar() {
  const tel = siteConfig.contact.phonePrimary.replace(/\s/g, "");
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white dark:bg-gray-950 border-t border-gray-200 dark:border-gray-800 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
      <div className="grid grid-cols-4 gap-1">
        <a href={`tel:${tel}`} className="flex flex-col items-center justify-center py-2.5 text-gray-700 dark:text-gray-300">
          <Phone className="w-5 h-5 text-primary mb-0.5" />
          <span className="text-[10px] font-medium">Call</span>
        </a>
        <a href={`https://wa.me/${siteConfig.contact.whatsapp}`} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center justify-center py-2.5 text-gray-700 dark:text-gray-300">
          <MessageCircle className="w-5 h-5 text-green-500 mb-0.5" />
          <span className="text-[10px] font-medium">WhatsApp</span>
        </a>
        <a href={`mailto:${siteConfig.contact.email}`} className="flex flex-col items-center justify-center py-2.5 text-gray-700 dark:text-gray-300">
          <Mail className="w-5 h-5 text-blue-500 mb-0.5" />
          <span className="text-[10px] font-medium">Email</span>
        </a>
        <Link href="/contact?intent=book" className="flex flex-col items-center justify-center py-2.5 bg-primary text-primary-foreground">
          <Calendar className="w-5 h-5 mb-0.5" />
          <span className="text-[10px] font-bold">Book</span>
        </Link>
      </div>
    </div>
  );
}
