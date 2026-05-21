import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Navigation } from "@/components/navigation";
import Footer from "@/components/sections/Footer";
import { BookOpen, Clock, ArrowRight } from "lucide-react";
import { getBlogPosts } from "@/lib/data";

export const metadata: Metadata = {
    title: "Study Abroad Blog & Resources — Guides, Tips & News",
    description:
        "Guides, tips, news and university insights for studying abroad in Nepal, India, UK, USA and Japan. Updated regularly by Dreamer's Way counsellors.",
    alternates: { canonical: "/blog" },
};

export const revalidate = 60;

export default async function BlogPage() {
    const posts = await getBlogPosts();
    const featured = posts.find((p) => p.is_featured) || posts[0];
    const rest = posts.filter((p) => p.id !== featured?.id);

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-black flex flex-col">
            <Navigation />
            <main className="flex-1">
                <section className="pt-32 md:pt-40 pb-14 bg-gradient-to-br from-indigo-950 via-blue-950 to-slate-950 text-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
                            <BookOpen className="w-3.5 h-3.5 text-amber-300" /> Resources
                        </div>
                        <h1 className="text-4xl md:text-6xl font-black font-mont mb-3">Guides & Insights</h1>
                        <p className="text-lg text-white/80 max-w-3xl">
                            Honest, up-to-date guides for every step of your study-abroad journey.
                        </p>
                    </div>
                </section>

                <section className="py-14">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        {posts.length === 0 ? (
                            <div className="text-center bg-white dark:bg-gray-950 rounded-2xl p-12 border border-dashed border-gray-300 dark:border-gray-800">
                                <BookOpen className="w-12 h-12 text-primary mx-auto mb-3" />
                                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Articles coming soon</h2>
                                <p className="text-gray-500 max-w-md mx-auto">Our counsellors are writing in-depth guides on every destination. Check back shortly.</p>
                            </div>
                        ) : (
                            <>
                                {featured && (
                                    <Link href={`/blog/${featured.slug}`} className="block mb-10 group">
                                        <div className="grid md:grid-cols-2 gap-6 bg-white dark:bg-gray-950 rounded-3xl border border-gray-200 dark:border-gray-800 overflow-hidden hover:shadow-xl transition-shadow">
                                            <div className="relative aspect-[4/3] md:aspect-auto bg-gradient-to-br from-primary/20 to-blue-500/20">
                                                {featured.cover_image_url ? (
                                                    <Image src={featured.cover_image_url} alt={featured.title} fill className="object-cover" />
                                                ) : (
                                                    <div className="absolute inset-0 flex items-center justify-center"><BookOpen className="w-16 h-16 text-primary/50" /></div>
                                                )}
                                            </div>
                                            <div className="p-7 md:p-10 flex flex-col justify-center">
                                                <div className="text-xs font-bold text-primary uppercase tracking-wider mb-2">Featured</div>
                                                <h2 className="text-2xl md:text-4xl font-black text-gray-900 dark:text-white mb-3 font-mont group-hover:text-primary transition-colors">
                                                    {featured.title}
                                                </h2>
                                                <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">{featured.excerpt}</p>
                                                <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 gap-3">
                                                    {featured.author && <span>{featured.author}</span>}
                                                    {featured.reading_time_minutes && (
                                                        <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {featured.reading_time_minutes} min read</span>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                )}

                                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {rest.map((p) => (
                                        <Link key={p.id} href={`/blog/${p.slug}`} className="group block bg-white dark:bg-gray-950 rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden hover:shadow-xl transition-shadow">
                                            <div className="relative aspect-[16/10] bg-gradient-to-br from-primary/20 to-blue-500/20">
                                                {p.cover_image_url ? (
                                                    <Image src={p.cover_image_url} alt={p.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                                                ) : (
                                                    <div className="absolute inset-0 flex items-center justify-center"><BookOpen className="w-10 h-10 text-primary/50" /></div>
                                                )}
                                            </div>
                                            <div className="p-5">
                                                <h2 className="font-bold text-gray-900 dark:text-white mb-2 line-clamp-2 group-hover:text-primary transition-colors font-mont">{p.title}</h2>
                                                <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-3">{p.excerpt}</p>
                                                <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                                                    <span>{new Date(p.published_at).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}</span>
                                                    <ArrowRight className="w-4 h-4 text-primary group-hover:translate-x-1 transition-transform" />
                                                </div>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </>
                        )}
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}
