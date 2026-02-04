'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { PlusCircle, List, Menu, X, LogOut } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AdminLayoutProps {
  children: React.ReactNode;
}

export function AdminLayout({ children }: AdminLayoutProps) {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const pathname = usePathname();

  const sidebarItems = [
    {
      title: 'Create Listing',
      href: '/admin-Mxtxrx/create',
      icon: PlusCircle
    },
    {
      title: 'View Listings',
      href: '/admin-Mxtxrx/listings',
      icon: List,
    }
  ];

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-black">
      {/* Navbar */}
      <nav className="fixed top-0 z-50 w-full bg-white dark:bg-black border-b border-gray-200 dark:border-gray-800">
        <div className="px-3 py-3 lg:px-5 lg:pl-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <button
                onClick={() => setSidebarOpen(!isSidebarOpen)}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-900 dark:text-gray-200"
              >
                {isSidebarOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
              <span className="ml-3 text-xl font-semibold dark:text-white">Metrosquare Admin</span>
            </div>
            <button className="flex items-center p-2 text-sm text-gray-500 dark:text-gray-400 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-900">
              <LogOut className="w-5 h-5 mr-2" />
              Logout
            </button>
          </div>
        </div>
      </nav>

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform bg-white dark:bg-black border-r border-gray-200 dark:border-gray-800",
          !isSidebarOpen && "-translate-x-full"
        )}
      >
        <div className="h-full px-3 pb-4 overflow-y-auto">
          <ul className="space-y-2 font-medium">
            {sidebarItems.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={cn(
                      "flex items-center p-3 text-gray-900 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors",
                      pathname === item.href && "bg-sky-50 dark:bg-sky-900/20 text-sky-600 dark:text-sky-400"
                    )}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="ml-3">{item.title}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </aside>

      {/* Main content */}
      <div className={cn(
        "pt-20 transition-all duration-300",
        isSidebarOpen ? "pl-64" : "pl-0"
      )}>
        <div className="p-4 min-h-screen">
          {children}
        </div>
      </div>
    </div>
  );
}