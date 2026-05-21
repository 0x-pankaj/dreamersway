import type { Metadata } from "next";
import { Navigation } from "@/components/navigation";
import Footer from "@/components/sections/Footer";
import { getFaqs } from "@/lib/data";
import { HelpCircle } from "lucide-react";

export const metadata: Metadata = {
    title: "FAQs — Common Questions About Studying Abroad",
    description: "Answers to common questions about studying abroad, scholarships, visas, fees and admissions for Nepal, India, UK, USA and Japan.",
    alternates: { canonical: "/faqs" },
};

export const revalidate = 60;

export default async function FaqsPage() {
    const faqs = await getFaqs();
    const grouped = faqs.reduce<Record<string, typeof faqs>>((acc, f) => {
        const key = f.category || "general";
        if (!acc[key]) acc[key] = [];
        acc[key].push(f);
        return acc;
    }, {});

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-black flex flex-col">
            <Navigation />
            <main className="flex-1">
                <section className="pt-32 md:pt-40 pb-14 bg-gradient-to-br from-indigo-950 via-blue-950 to-slate-950 text-white">
                    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
                            <HelpCircle className="w-3.5 h-3.5 text-amber-300" /> FAQs
                        </div>
                        <h1 className="text-4xl md:text-6xl font-black font-mont mb-3">Got questions? We have answers.</h1>
                        <p className="text-lg text-white/80">Everything you might want to ask before starting your journey.</p>
                    </div>
                </section>

                <section className="py-14">
                    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                        {Object.keys(grouped).length === 0 ? (
                            <div className="text-center bg-white dark:bg-gray-950 rounded-2xl p-12 border border-dashed border-gray-300 dark:border-gray-800">
                                <HelpCircle className="w-12 h-12 text-primary mx-auto mb-3" />
                                <p className="text-gray-500">FAQs will be added here soon.</p>
                            </div>
                        ) : (
                            Object.entries(grouped).map(([cat, list]) => (
                                <div key={cat} className="mb-10">
                                    <h2 className="text-xl font-black text-gray-900 dark:text-white mb-4 font-mont capitalize">
                                        {cat === "general" ? "General questions" : cat}
                                    </h2>
                                    <div className="space-y-3">
                                        {list.map((f) => (
                                            <details key={f.id} className="bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-xl p-5 group">
                                                <summary className="font-bold text-gray-900 dark:text-white cursor-pointer flex items-start justify-between gap-3">
                                                    <span>{f.question}</span>
                                                    <span className="text-primary text-xl leading-none group-open:rotate-45 transition-transform">+</span>
                                                </summary>
                                                <p className="mt-3 text-gray-600 dark:text-gray-300 leading-relaxed">{f.answer}</p>
                                            </details>
                                        ))}
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </section>
            </main>
            <Footer />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "FAQPage",
                        mainEntity: faqs.map((f) => ({
                            "@type": "Question",
                            name: f.question,
                            acceptedAnswer: { "@type": "Answer", text: f.answer },
                        })),
                    }),
                }}
            />
        </div>
    );
}
