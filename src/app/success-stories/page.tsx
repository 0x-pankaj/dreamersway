import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Navigation } from "@/components/navigation";
import Footer from "@/components/sections/Footer";
import { Button } from "@/components/ui/button";
import { Quote, Star, Sparkles } from "lucide-react";
import { getSuccessStories } from "@/lib/data";
import { countryByCode } from "@/lib/site-config";

export const metadata: Metadata = {
    title: "Success Stories — Real Students. Real Dreams. Real Outcomes.",
    description:
        "Meet students who realized their dream of studying abroad with Dreamer's Way Consultancy. Real stories from Nepal, India, UK, USA and Japan.",
    alternates: { canonical: "/success-stories" },
};

export const revalidate = 60;

export default async function StoriesPage() {
    const stories = await getSuccessStories(60);

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-black flex flex-col">
            <Navigation />
            <main className="flex-1">
                <section className="pt-32 md:pt-40 pb-14 bg-gradient-to-br from-indigo-950 via-blue-950 to-slate-950 text-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
                            <Sparkles className="w-3.5 h-3.5 text-amber-300" /> Success stories
                        </div>
                        <h1 className="text-4xl md:text-6xl font-black font-mont mb-3">Real dreams. Real outcomes.</h1>
                        <p className="text-lg text-white/80 max-w-3xl">
                            500+ students have started their global journey with us. Here are some of their stories.
                        </p>
                    </div>
                </section>

                <section className="py-14">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        {stories.length === 0 ? (
                            <div className="text-center bg-white dark:bg-gray-950 rounded-2xl p-12 border border-dashed border-gray-300 dark:border-gray-800">
                                <Quote className="w-12 h-12 text-primary mx-auto mb-3" />
                                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Stories coming soon</h2>
                                <p className="text-gray-500 max-w-md mx-auto mb-5">We&apos;re collecting recent placements from our students. Want to be featured? Email us your story.</p>
                                <Link href="/contact"><Button>Get in touch</Button></Link>
                            </div>
                        ) : (
                            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                                {stories.map((s) => {
                                    const c = s.to_country_code ? countryByCode(s.to_country_code) : null;
                                    return (
                                        <div key={s.id} className="bg-white dark:bg-gray-950 rounded-2xl p-6 border border-gray-200 dark:border-gray-800 hover:shadow-xl transition-all">
                                            <div className="flex items-center gap-1 mb-3 text-amber-400">
                                                {Array.from({ length: s.rating || 5 }).map((_, i) => (
                                                    <Star key={i} className="w-4 h-4 fill-current" />
                                                ))}
                                            </div>
                                            <Quote className="w-7 h-7 text-primary/30 mb-2" />
                                            <p className="text-gray-700 dark:text-gray-300 mb-5 leading-relaxed line-clamp-6">
                                                &ldquo;{s.short_quote || s.story}&rdquo;
                                            </p>
                                            <div className="flex items-center gap-3 pt-4 border-t border-gray-100 dark:border-gray-800">
                                                {s.photo_url ? (
                                                    <Image src={s.photo_url} alt={s.student_name} width={48} height={48} className="rounded-full object-cover w-12 h-12" />
                                                ) : (
                                                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-amber-500 flex items-center justify-center text-white font-bold">
                                                        {s.student_name?.[0]}
                                                    </div>
                                                )}
                                                <div className="flex-1">
                                                    <div className="font-bold text-gray-900 dark:text-white">{s.student_name}</div>
                                                    <div className="text-xs text-gray-500 dark:text-gray-400">
                                                        {s.program} {s.university ? `· ${s.university}` : ""}
                                                    </div>
                                                </div>
                                                {c && <span className="text-2xl" title={c.name}>{c.flag}</span>}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}
