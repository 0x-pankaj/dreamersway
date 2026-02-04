"use client";

import { Phone, Mail, Clock } from 'lucide-react';
// import { ThemeToggle } from './ThemeToggle';

export default function TopBar() {
    return (
        <div className="bg-amber-400 text-gray-900 py-2 text-sm border-b border-amber-500">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-wrap items-center justify-between gap-2">
                    {/* Left side - Query text */}
                    <div className="hidden sm:flex items-center gap-2">
                        <span className="text-gray-800 dark:text-gray-200 font-medium">Any Query?</span>
                        <span className="text-blue-700 dark:text-blue-300 font-bold">We're here to help!</span>
                    </div>

                    {/* Right side - Contact info */}
                    <div className="flex items-center gap-2 md:gap-6 text-xs md:text-sm whitespace-nowrap font-medium">
                        <a
                            href="tel:+9779817820096"
                            className="flex items-center gap-1.5 hover:text-blue-800 dark:hover:text-amber-200 transition-colors"
                        >
                            <Phone className="w-3.5 h-3.5" />
                            <span>+977 9819602000</span>
                        </a>

                        <a
                            href="mailto:info@metrosquare.com"
                            className="flex items-center gap-1.5 hover:text-blue-800 dark:hover:text-amber-200 transition-colors"
                        >
                            <Mail className="w-3.5 h-3.5" />
                            <span className="hidden md:inline">info@godreamersway.com</span>
                            <span className="md:hidden">Email</span>
                        </a>

                        <div className="hidden sm:flex items-center gap-1.5 text-gray-800 dark:text-gray-200">
                            <Clock className="w-3.5 h-3.5" />
                            <span className="hidden lg:inline">Sun - Fri: 9:00 AM - 6:00 PM</span>
                            <span className="lg:hidden">9AM - 6PM</span>
                        </div>

                        {/* <ThemeToggle > */}
                    </div>
                </div>
            </div>
        </div>
    );
}
