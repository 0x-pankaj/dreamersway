import type { Metadata } from "next";
import Link from "next/link";
import { Navigation } from "@/components/navigation";
import Footer from "@/components/sections/Footer";
import { Button } from "@/components/ui/button";
import { Award, ExternalLink, Calendar, Coins, Sparkles } from "lucide-react";
import { getScholarships } from "@/lib/data";
import { countryByCode, siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
    title: "Scholarships for Study Abroad — Funding for Nepal, India, UK, USA & Japan",
    description:
        "Browse scholarships for studying in Nepal, India, UK, USA and Japan. Government, university and merit scholarships matched to your profile.",
    alternates: { canonical: "/scholarships" },
};

export const revalidate = 60;

export default async function ScholarshipsPage() {
    const scholarships = await getScholarships();

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-black flex flex-col">
            <Navigation />
            <main className="flex-1">
                <section className="pt-32 md:pt-40 pb-14 bg-gradient-to-br from-indigo-950 via-blue-950 to-slate-950 text-white relative overflow-hidden">
                    <div className="absolute top-20 right-0 w-96 h-96 bg-amber-400/20 rounded-full blur-3xl" />
                    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
                            <Award className="w-3.5 h-3.5 text-amber-300" /> Scholarships
                        </div>
                        <h1 className="text-4xl md:text-6xl font-black font-mont mb-4">
                            Funding for your dream education
                        </h1>
                        <p className="text-lg text-white/80 max-w-3xl">
                            Browse hand-picked scholarships from governments, universities and private foundations — and let us help you apply to the right ones.
                        </p>
                    </div>
                </section>

                <section className="py-14">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        {scholarships.length === 0 ? (
                            <div className="text-center bg-white dark:bg-gray-950 rounded-2xl p-12 border border-dashed border-gray-300 dark:border-gray-800">
                                <Sparkles className="w-12 h-12 text-primary mx-auto mb-3" />
                                <h2 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">Curated scholarships coming soon</h2>
                                <p className="text-gray-500 mb-5 max-w-md mx-auto">Our team is compiling the most relevant scholarships for our destinations. Until then, talk to a counsellor and we&apos;ll personally match you to opportunities.</p>
                                <Link href="/contact?intent=scholarship">
                                    <Button>Get scholarship advice</Button>
                                </Link>
                            </div>
                        ) : (
                            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                                {scholarships.map((s) => {
                                    const c = s.country_code ? countryByCode(s.country_code) : undefined;
                                    return (
                                        <div key={s.id} className="bg-white dark:bg-gray-950 rounded-2xl p-6 border border-gray-200 dark:border-gray-800 hover:border-primary/40 hover:shadow-xl transition-all">
                                            <div className="flex items-center justify-between mb-3">
                                                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 text-xs font-bold rounded-full">
                                                    {s.scholarship_type || "Scholarship"}
                                                </span>
                                                {c && <span className="text-2xl">{c.flag}</span>}
                                            </div>
                                            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1 font-mont line-clamp-2">{s.name}</h3>
                                            <p className="text-xs text-gray-500 mb-3">{s.provider}</p>
                                            <p className="text-sm text-gray-700 dark:text-gray-300 mb-4 line-clamp-3 leading-relaxed">{s.description}</p>
                                            <div className="space-y-1.5 text-sm mb-4">
                                                {s.amount && <div className="flex items-center gap-1.5 text-gray-700 dark:text-gray-300"><Coins className="w-4 h-4 text-primary" /> {s.amount}</div>}
                                                {s.deadline_text && <div className="flex items-center gap-1.5 text-gray-700 dark:text-gray-300"><Calendar className="w-4 h-4 text-primary" /> {s.deadline_text}</div>}
                                            </div>
                                            <div className="flex items-center gap-2">
                                                {s.application_link && (
                                                    <Link href={s.application_link} target="_blank" className="flex-1">
                                                        <Button variant="outline" size="sm" className="w-full border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                                                            Apply <ExternalLink className="ml-1 w-3.5 h-3.5" />
                                                        </Button>
                                                    </Link>
                                                )}
                                                <Link href={`/contact?intent=scholarship&scholarship=${s.slug}`} className="flex-1">
                                                    <Button size="sm" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                                                        Get help
                                                    </Button>
                                                </Link>
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
