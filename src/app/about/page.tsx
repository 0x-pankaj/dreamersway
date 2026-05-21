import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Navigation } from "@/components/navigation";
import Footer from "@/components/sections/Footer";
import { Button } from "@/components/ui/button";
import { Heart, Target, Award, Users, Globe2, CheckCircle2, Sparkles } from "lucide-react";
import { getTeam } from "@/lib/data";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
    title: "About Dreamer's Way Consultancy",
    description:
        "Meet the team behind Dreamer's Way Consultancy. Honest, expert guidance to study abroad in Nepal, India, UK, USA and Japan.",
    alternates: { canonical: "/about" },
};

export const revalidate = 60;

const VALUES = [
    { icon: Heart, title: "Student first", desc: "We recommend what's best for you — not what's easiest to sell." },
    { icon: Target, title: "Outcome focused", desc: "We measure success by where our students land, not by leads." },
    { icon: Award, title: "Honest expertise", desc: "Counsellors with deep, on-ground knowledge of every destination." },
    { icon: Globe2, title: "Global, but local", desc: "Headquartered in Kathmandu, with partners on 4 continents." },
];

const STATS = [
    { value: "12+", label: "Years of guidance" },
    { value: "5,000+", label: "Students placed" },
    { value: "200+", label: "Partner universities" },
    { value: "95%", label: "Visa success rate" },
];

export default async function AboutPage() {
    const team = await getTeam();

    return (
        <div className="min-h-screen bg-white dark:bg-black flex flex-col">
            <Navigation />
            <main className="flex-1">
                <section className="pt-32 md:pt-40 pb-14 bg-gradient-to-br from-indigo-950 via-blue-950 to-slate-950 text-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-10 items-center">
                        <div>
                            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
                                <Sparkles className="w-3.5 h-3.5 text-amber-300" /> About us
                            </div>
                            <h1 className="text-4xl md:text-6xl font-black font-mont mb-4 leading-tight">
                                Helping students cross borders
                                <span className="block bg-gradient-to-r from-amber-300 to-yellow-200 bg-clip-text text-transparent">since 2012</span>
                            </h1>
                            <p className="text-lg text-white/80 leading-relaxed">
                                {siteConfig.name} began with a single mission — to bring honest, transparent, expert guidance to students dreaming of studying abroad. Today we help students travel both ways: Indian students to Nepal for medical, and Nepali students to India, UK, USA and Japan for engineering and higher education.
                            </p>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            {STATS.map((s) => (
                                <div key={s.label} className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-5">
                                    <div className="text-3xl md:text-4xl font-black text-amber-300 mb-1">{s.value}</div>
                                    <div className="text-sm text-white/80">{s.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Mission */}
                <section className="py-16 bg-gray-50 dark:bg-gray-950">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-10 items-center">
                        <div>
                            <h2 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white mb-4 font-mont">Our mission</h2>
                            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                                To make studying abroad simple, transparent and outcome-driven for every student — regardless of budget or background.
                            </p>
                            <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                                {[
                                    "Honest profile evaluation — even if it means saying no",
                                    "Transparent service fees, never hidden behind university commissions",
                                    "End-to-end support from shortlist to settling in",
                                    "Post-departure community support in every destination",
                                ].map((p) => (
                                    <li key={p} className="flex items-start gap-2">
                                        <CheckCircle2 className="w-5 h-5 mt-0.5 text-primary flex-shrink-0" /> {p}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            {VALUES.map((v) => (
                                <div key={v.title} className="bg-white dark:bg-black rounded-2xl p-5 border border-gray-200 dark:border-gray-800">
                                    <v.icon className="w-7 h-7 text-primary mb-2" />
                                    <h3 className="font-bold text-gray-900 dark:text-white mb-1 font-mont">{v.title}</h3>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">{v.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Team */}
                {team.length > 0 && (
                    <section className="py-16">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="text-center mb-10">
                                <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-3">
                                    <Users className="w-3.5 h-3.5" /> Our team
                                </div>
                                <h2 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white font-mont">
                                    People who care about your future
                                </h2>
                            </div>
                            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
                                {team.map((m) => (
                                    <div key={m.id} className="bg-white dark:bg-gray-950 rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-800 hover:shadow-xl transition-shadow">
                                        <div className="relative aspect-square bg-gradient-to-br from-primary/15 to-amber-500/15">
                                            {m.photo_url && (
                                                <Image src={m.photo_url} alt={m.name} fill className="object-cover" />
                                            )}
                                        </div>
                                        <div className="p-5">
                                            <h3 className="font-bold text-gray-900 dark:text-white font-mont">{m.name}</h3>
                                            <p className="text-sm text-primary font-semibold mb-2">{m.designation}</p>
                                            {m.bio && <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-3">{m.bio}</p>}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                {/* CTA */}
                <section className="py-16 bg-gradient-to-br from-primary/10 via-amber-50 to-primary/10 dark:from-primary/10 dark:via-gray-900 dark:to-primary/10">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <h2 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white mb-3 font-mont">
                            Let&apos;s map your future together
                        </h2>
                        <p className="text-gray-700 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
                            Book a free 30-minute consultation. No commitments. Honest advice based on your goals.
                        </p>
                        <Link href="/contact?intent=book"><Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold">Book Free Consultation</Button></Link>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}
