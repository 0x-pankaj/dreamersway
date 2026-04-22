
import type { Metadata } from "next";
import { supabase } from "@/lib/supabaseClient";
import CollegeListing from "@/components/CollegeListing";
import { College } from "@/types";
import { Navigation } from "@/components/navigation";
import Footer from "@/components/sections/Footer";
import { AlertCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Medical Colleges in Nepal",
  description: "Browse through our comprehensive list of medical colleges in Nepal. Find institutions affiliated with top universities with detailed information on programs and admissions.",
};

export const revalidate = 0;

export default async function CollegesPage() {
    let colleges: College[] = [];
    let errorOccurred = false;

    try {
        const { data, error } = await supabase
            .from('colleges')
            .select('*')
            .order('name');

        if (data) colleges = data;
        if (error) {
            console.error("Error fetching colleges:", error);
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
                <div className="mb-8">
                    <h1 className="text-4xl font-black text-gray-900 dark:text-white mb-4 font-mont">
                        Medical Colleges in Nepal
                    </h1>
                    <p className="text-gray-600 dark:text-gray-300 max-w-2xl">
                        Browse through our comprehensive list of medical colleges. Use the filters to find institutions affiliated with specific universities or by type.
                    </p>
                </div>

                {errorOccurred ? (
                    <div className="bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-900/30 rounded-2xl p-12 text-center">
                        <AlertCircle className="w-12 h-12 text-red-400 mx-auto mb-4" />
                        <h3 className="text-lg font-bold text-red-700 dark:text-red-300 mb-2">Unable to load colleges</h3>
                        <p className="text-red-600 dark:text-red-400">Please check your connection and try again later.</p>
                    </div>
                ) : (
                    <CollegeListing initialColleges={colleges} />
                )}
            </main>
            <Footer />
        </div>
    );
}
