
import type { Metadata } from "next";
import { supabase } from "@/lib/supabaseClient";
import NoticeList from "@/components/NoticeList";
import { Notice } from "@/types";
import { Navigation } from "@/components/navigation";
import Footer from "@/components/sections/Footer";
import { AlertCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Notices & Announcements",
  description: "Stay updated with the latest news from universities, entrance exams, and admission deadlines for medical colleges in Nepal.",
};

export const revalidate = 0;

export default async function NoticesPage() {
    let notices: Notice[] = [];
    let errorOccurred = false;

    try {
        const { data, error } = await supabase
            .from('notices')
            .select('*')
            .order('publish_date', { ascending: false });

        if (data) notices = data;
        if (error) {
            console.error("Fetch error:", error);
            errorOccurred = true;
        }
    } catch (err) {
        console.error("Fetch error:", err);
        errorOccurred = true;
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-black flex flex-col">
            <Navigation />
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-24 flex-1 w-full">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-black text-gray-900 dark:text-white mb-4 font-mont">
                        Notices & Announcements
                    </h1>
                    <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                        Stay updated with the latest news from universities, entrance exams, and admission deadlines.
                    </p>
                </div>

                <div className="max-w-4xl mx-auto">
                    {errorOccurred ? (
                        <div className="bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-900/30 rounded-2xl p-12 text-center">
                            <AlertCircle className="w-12 h-12 text-red-400 mx-auto mb-4" />
                            <h3 className="text-lg font-bold text-red-700 dark:text-red-300 mb-2">Unable to load notices</h3>
                            <p className="text-red-600 dark:text-red-400">Please check your connection and try again later.</p>
                        </div>
                    ) : (
                        <NoticeList notices={notices} />
                    )}
                </div>
            </main>
            <Footer />
        </div>
    );
}
