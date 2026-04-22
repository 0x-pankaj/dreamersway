"use client";

import { Phone, Mail, MessageCircle } from "lucide-react";

export default function MobileContactBar() {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
      <div className="grid grid-cols-3 gap-1">
        <a
          href="tel:+9779819602000"
          className="flex flex-col items-center justify-center py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
        >
          <Phone className="w-5 h-5 text-primary mb-1" />
          <span className="text-[10px] font-medium">Call</span>
        </a>
        <a
          href="https://wa.me/9779819602000"
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
        >
          <MessageCircle className="w-5 h-5 text-green-500 mb-1" />
          <span className="text-[10px] font-medium">WhatsApp</span>
        </a>
        <a
          href="mailto:info@godreamersway.com"
          className="flex flex-col items-center justify-center py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
        >
          <Mail className="w-5 h-5 text-blue-500 mb-1" />
          <span className="text-[10px] font-medium">Email</span>
        </a>
      </div>
    </div>
  );
}
