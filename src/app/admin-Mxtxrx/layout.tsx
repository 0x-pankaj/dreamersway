'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { PlusCircle, List, Menu, X, LogOut } from 'lucide-react';
import { cn } from '@/lib/utils';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [loading, setLoading] = useState(true);
  const [isSidebarOpen, setSidebarOpen] = useState(true);

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

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        router.push('/admin-login');
      } else {
        setLoading(false);
      }
    };

    checkAuth();
  }, [router]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/admin-login');
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200">
        <div className="px-3 py-3 lg:px-5 lg:pl-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <button
                onClick={() => setSidebarOpen(!isSidebarOpen)}
                className="p-2 rounded-lg hover:bg-gray-100"
              >
                {isSidebarOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
              <span className="ml-3 text-xl font-semibold">Metrosquare Admin</span>
            </div>
            <button 
              onClick={handleLogout}
              className="flex items-center p-2 text-sm text-gray-500 rounded-lg hover:bg-gray-100"
            >
              <LogOut className="w-5 h-5 mr-2" />
              Logout
            </button>
          </div>
        </div>
      </nav>

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform bg-white border-r border-gray-200",
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
                      "flex items-center p-3 text-gray-900 rounded-lg hover:bg-gray-100",
                      pathname === item.href && "bg-sky-50 text-sky-600"
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