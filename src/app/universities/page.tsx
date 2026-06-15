import type { Metadata } from "next";
import { Suspense } from "react";
import { Navigation } from "@/components/navigation";
import Footer from "@/components/sections/Footer";
import CollegeListing from "@/components/CollegeListing";
import { getUniversities } from "@/lib/data";
import { Building2 } from "lucide-react";

export const metadata: Metadata = {
    title: "Universities & Colleges — Compare Top Institutions Worldwide",
    description:
        "Explore universities across Nepal, India, UK, USA, Bangladesh, Canada and Russia. Filter by country, stream and type. Tuition, programs, scholarships and admissions in one place.",
    alternates: { canonical: "/universities" },
};

export const revalidate = 60;

export default async function UniversitiesPage() {
    const universities = await getUniversities();

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-black flex flex-col">
            <Navigation />
            <main className="flex-1 pt-32 pb-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="mb-10 max-w-3xl">
                        <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
                            <Building2 className="w-3.5 h-3.5" /> Find your university
                        </div>
                        <h1 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-3 font-mont">
                            Universities & Colleges
                        </h1>
                        <p className="text-lg text-gray-600 dark:text-gray-400">
                            Browse universities across our 5 partner destinations. Filter by country and stream to find your perfect match.
                        </p>
                    </div>

                    <Suspense fallback={<div>Loading…</div>}>
                        <CollegeListing initialUniversities={universities} />
                    </Suspense>
                </div>
            </main>
            <Footer />
        </div>
    );
}
