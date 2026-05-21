"use client";

import { Phone, Mail, Clock, Globe2 } from "lucide-react";
import { siteConfig } from "@/lib/site-config";

export default function TopBar() {
    return (
        <div className="bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-400 text-gray-900 py-2 text-sm border-b border-amber-500">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="hidden sm:flex items-center gap-2">
                        <Globe2 className="w-4 h-4" />
                        <span className="font-semibold">Study Abroad —</span>
                        <span className="font-bold text-blue-900">Nepal · India · UK · USA · Japan</span>
                    </div>

                    <div className="flex items-center gap-2 md:gap-6 text-xs md:text-sm whitespace-nowrap font-medium">
                        <a
                            href={`tel:${siteConfig.contact.phonePrimary.replace(/\s/g, "")}`}
                            className="flex items-center gap-1.5 hover:text-blue-900 transition-colors"
                        >
                            <Phone className="w-3.5 h-3.5" />
                            <span>{siteConfig.contact.phonePrimary}</span>
                        </a>
                        <a
                            href={`mailto:${siteConfig.contact.email}`}
                            className="flex items-center gap-1.5 hover:text-blue-900 transition-colors"
                        >
                            <Mail className="w-3.5 h-3.5" />
                            <span className="hidden md:inline">{siteConfig.contact.email}</span>
                            <span className="md:hidden">Email</span>
                        </a>
                        <div className="hidden sm:flex items-center gap-1.5 text-gray-800">
                            <Clock className="w-3.5 h-3.5" />
                            <span className="hidden lg:inline">Sun - Fri: 9:00 AM - 6:00 PM</span>
                            <span className="lg:hidden">9AM - 6PM</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
