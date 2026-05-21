import type { Metadata } from "next";
import Link from "next/link";
import { Navigation } from "@/components/navigation";
import Footer from "@/components/sections/Footer";
import { Button } from "@/components/ui/button";
import {
    Target, FileText, BookOpen, Plane, Award, Briefcase, Sparkles, CheckCircle2, ArrowRight,
} from "lucide-react";
import { getServices } from "@/lib/data";

const ICONS: Record<string, any> = { Target, FileText, BookOpen, Plane, Award, Briefcase, PlaneTakeoff: Plane, Sparkles };

export const metadata: Metadata = {
    title: "Our Services — University Shortlisting, Visa, Test Prep, Scholarships",
    description:
        "End-to-end study abroad services: university shortlisting, application support, test preparation, visa guidance, scholarship assistance and pre-departure.",
    alternates: { canonical: "/services" },
};

export const revalidate = 60;

export default async function ServicesPage() {
    const services = await getServices();

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-black flex flex-col">
            <Navigation />
            <main className="flex-1">
                <section className="pt-32 md:pt-40 pb-14 bg-gradient-to-br from-indigo-950 via-blue-950 to-slate-950 text-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
                            <Sparkles className="w-3.5 h-3.5 text-amber-300" /> Services
                        </div>
                        <h1 className="text-4xl md:text-6xl font-black font-mont mb-4">Every step, covered</h1>
                        <p className="text-lg text-white/80 max-w-3xl">
                            From your first counselling call to your first day on campus — our team handles the heavy lifting so you can focus on getting in.
                        </p>
                    </div>
                </section>

                <section className="py-14">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                            {services.map((s) => {
                                const Icon = ICONS[s.icon || ""] || Sparkles;
                                return (
                                    <div key={s.id} className="bg-white dark:bg-gray-950 rounded-2xl p-6 border border-gray-200 dark:border-gray-800 hover:border-primary/40 hover:shadow-xl transition-all group">
                                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-amber-500 text-primary-foreground flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                            <Icon className="w-6 h-6" />
                                        </div>
                                        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2 font-mont">{s.title}</h2>
                                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">{s.short_description}</p>
                                        {s.features && s.features.length > 0 && (
                                            <ul className="space-y-1.5 mb-4">
                                                {s.features.map((f) => (
                                                    <li key={f} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
                                                        <CheckCircle2 className="w-4 h-4 mt-0.5 text-primary flex-shrink-0" /> {f}
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                        <Link href={`/contact?intent=${s.slug}`} className="text-sm text-primary font-bold flex items-center gap-1 hover:gap-2 transition-all">
                                            Get this service <ArrowRight className="w-4 h-4" />
                                        </Link>
                                    </div>
                                );
                            })}
                        </div>

                        <div className="mt-12 text-center bg-gradient-to-br from-primary/10 via-amber-50 to-primary/10 dark:from-primary/10 dark:via-gray-900 dark:to-primary/10 rounded-3xl p-8 md:p-12 border border-primary/20">
                            <h2 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white mb-3 font-mont">
                                Not sure where to start?
                            </h2>
                            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-6">
                                Book a free 30-minute consultation — we&apos;ll evaluate your profile and recommend the right combination of services for your goals.
                            </p>
                            <Link href="/contact?intent=book">
                                <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold">
                                    Book Free Consultation
                                </Button>
                            </Link>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}
