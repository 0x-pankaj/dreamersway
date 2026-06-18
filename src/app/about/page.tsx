import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Navigation } from "@/components/navigation";
import Footer from "@/components/sections/Footer";
import { Button } from "@/components/ui/button";
import {
    Heart, Target, Award, Users, Globe2, CheckCircle2, Sparkles, Quote,
    GraduationCap, Briefcase, Stethoscope, Cpu, HeartPulse, Activity, Sprout,
    Linkedin, Mail, Phone,
} from "lucide-react";
import { getTeam } from "@/lib/data";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
    title: "About Dreamer's Way Consultancy",
    description:
        "Meet Mr. Anand Thakur and the team behind Dreamer's Way Consultancy — honest, expert guidance for MBBS, MD/MS, Engineering, Nursing, Health Sciences and Agriculture across Nepal, India, UK, USA, Bangladesh, Canada, Russia, Georgia, Uzbekistan, Kyrgyzstan and the Philippines.",
    alternates: { canonical: "/about" },
};

const DEPT_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
    doctor: Stethoscope,
    engineer: Cpu,
    bhs: HeartPulse,
    nursing: Activity,
    agriculture: Sprout,
};

export const revalidate = 60;

const VALUES = [
    { icon: Heart, title: "Student first", desc: "We recommend what's best for you — not what's easiest to sell." },
    { icon: Target, title: "Outcome focused", desc: "We measure success by where our students land, not by leads." },
    { icon: Award, title: "Honest expertise", desc: "Counsellors with deep, on-ground knowledge of every destination." },
    { icon: Globe2, title: "Global, but local", desc: "Headquartered in Kathmandu, with partners on 4 continents." },
];

const STATS = [
    { value: "8+", label: "Years of guidance" },
    { value: "500+", label: "Students placed" },
    { value: "50+", label: "Partner institutions" },
    { value: "90%+", label: "Visa success rate" },
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
                                <span className="block bg-gradient-to-r from-amber-300 to-yellow-200 bg-clip-text text-transparent">since 2018</span>
                            </h1>
                            <p className="text-lg text-white/80 leading-relaxed">
                                {siteConfig.name} began with a single mission — to bring honest, transparent, expert guidance to students dreaming of studying abroad. With a dedicated Center of Excellence for medical aspirants and structured advisory across Engineering, Nursing, Health Sciences and Agriculture, we place students in trusted institutions across Nepal, India, UK, USA, Bangladesh, Canada, Russia, Georgia, Uzbekistan, Kyrgyzstan and the Philippines.
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

                {/* Director's message */}
                <section className="py-16 md:py-20">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid lg:grid-cols-5 gap-10 items-center">
                            {/* Portrait */}
                            <div className="lg:col-span-2">
                                <div className="relative max-w-sm mx-auto">
                                    {/* To use a real photo, drop it at /public/anand-thakur.jpg and render
                                        <Image src="/anand-thakur.jpg" alt="Mr. Anand Thakur" fill className="object-cover" /> here. */}
                                    <div className="relative aspect-[4/5] rounded-3xl overflow-hidden bg-gradient-to-br from-indigo-900 via-blue-900 to-slate-900 shadow-2xl border border-white/10 flex flex-col items-center justify-center text-white/90">
                                        <div className="w-28 h-28 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-5xl font-black font-mont mb-3">
                                            AT
                                        </div>
                                        <div className="text-sm font-semibold tracking-wide">Mr. Anand Thakur</div>
                                        <div className="text-xs text-white/60 mt-1">Managing Director &amp; Co-founder</div>
                                    </div>
                                    <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 w-[90%] bg-white dark:bg-gray-950 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-800 px-5 py-3 flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                                            <Briefcase className="w-5 h-5 text-primary" />
                                        </div>
                                        <div>
                                            <div className="text-xs text-gray-500 dark:text-gray-400">MBA · Symbiosis Intl. University</div>
                                            <div className="text-sm font-bold text-gray-900 dark:text-white">8+ years in education consulting</div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Message */}
                            <div className="lg:col-span-3 pt-8 lg:pt-0">
                                <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
                                    <Quote className="w-3.5 h-3.5" /> Message from leadership
                                </div>
                                <h2 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white font-mont mb-1">
                                    Mr. Anand Thakur
                                </h2>
                                <p className="text-primary font-semibold mb-5">
                                    Managing Director &amp; Co-founder, Dreamer&apos;s Way Consultancy
                                </p>

                                <div className="space-y-4 text-gray-700 dark:text-gray-300 leading-relaxed text-[15px]">
                                    <p>
                                        Mr. Anand Thakur is the Managing Director and Co-founder of Dreamer&apos;s Way Consultancy, a premier student advisory organization specializing in end-to-end international education pathways. With a robust focus on medical education, he provides strategic guidance for students pursuing MBBS, as well as postgraduate medical specializations like MD and MS abroad.
                                    </p>
                                    <p>
                                        He holds an MBA from Symbiosis International University, India, which complements his expertise in strategic management and student advisory services. With over eight years of experience in international education consulting, Mr. Thakur has developed deep expertise in navigating complex medical education pathways — supporting a significant number of international students, particularly from India, in securing placements in competitive MBBS, MD, and MS programs while navigating foreign medical licensing, clinical rotations, and institutional selection.
                                    </p>
                                    <p>
                                        Under his leadership, Dreamer&apos;s Way Consultancy has established strong collaborations with globally reputed medical and academic institutions. While the organization maintains a specialized Center of Excellence for medical aspirants, it also provides structured, high-standard advisory services for students pursuing Bachelors, Masters, and Doctoral programs across diverse fields in the UK, USA, Australia, Canada, and beyond. His approach is defined by transparency, structured counseling, and ethical advisory practices, building a student-first ecosystem that emphasizes clarity in decision-making and reliability in admission support.
                                    </p>
                                </div>

                                <blockquote className="mt-6 border-l-4 border-primary pl-5 italic text-gray-800 dark:text-gray-200">
                                    &ldquo;Our responsibility is not just to guide admissions, but to ensure our students — whether entering their undergraduate journey or specializing through MD/MS — make informed, confident, and future-ready academic choices.&rdquo;
                                </blockquote>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Departments / fields we specialize in */}
                <section className="py-16 bg-gray-50 dark:bg-gray-950 border-y border-gray-100 dark:border-gray-900">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-10">
                            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-3">
                                <GraduationCap className="w-3.5 h-3.5" /> Departments
                            </div>
                            <h2 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white font-mont">
                                Fields we specialize in
                            </h2>
                            <p className="text-gray-600 dark:text-gray-400 mt-3 max-w-2xl mx-auto">
                                From medical and health sciences to engineering and agriculture — structured guidance for every academic path.
                            </p>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
                            {siteConfig.streams.map((s) => {
                                const Icon = DEPT_ICONS[s.code] || GraduationCap;
                                return (
                                    <div key={s.code} className="bg-white dark:bg-black rounded-2xl p-5 border border-gray-200 dark:border-gray-800 text-center hover:border-primary/40 hover:shadow-lg transition-all">
                                        <div className="w-12 h-12 mx-auto rounded-xl bg-gradient-to-br from-primary to-amber-500 flex items-center justify-center text-primary-foreground mb-3">
                                            <Icon className="w-6 h-6" />
                                        </div>
                                        <div className="font-bold text-gray-900 dark:text-white font-mont text-sm">{s.name}</div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </section>

                {/* Mission */}
                <section className="py-16 bg-white dark:bg-black">
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
                            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                                {team.map((m) => {
                                    const initials = m.name
                                        .split(" ")
                                        .map((w) => w[0])
                                        .filter(Boolean)
                                        .slice(0, 2)
                                        .join("")
                                        .toUpperCase();
                                    return (
                                        <div
                                            key={m.id}
                                            className="group relative bg-white dark:bg-gray-950 rounded-3xl overflow-hidden border border-gray-200 dark:border-gray-800 hover:border-primary/40 hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300"
                                        >
                                            {/* Photo / initials */}
                                            <div className="relative aspect-[4/5] bg-gradient-to-br from-indigo-900 via-blue-900 to-slate-900 overflow-hidden">
                                                {m.photo_url ? (
                                                    <Image
                                                        src={m.photo_url}
                                                        alt={m.name}
                                                        fill
                                                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                                                    />
                                                ) : (
                                                    <div className="absolute inset-0 flex items-center justify-center">
                                                        <span className="text-5xl font-black font-mont text-white/90">{initials}</span>
                                                    </div>
                                                )}
                                                {/* gradient scrim so name is readable over photos */}
                                                <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                                                <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                                                    <h3 className="font-black text-lg font-mont leading-tight drop-shadow">{m.name}</h3>
                                                    <p className="text-sm font-semibold text-amber-300 drop-shadow">{m.designation}</p>
                                                </div>
                                            </div>

                                            {/* Body */}
                                            <div className="p-5">
                                                {m.bio && (
                                                    <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed line-clamp-4">{m.bio}</p>
                                                )}
                                                {(m.linkedin_url || m.email || m.phone) && (
                                                    <div className="flex items-center gap-2 mt-4">
                                                        {m.linkedin_url && (
                                                            <a
                                                                href={m.linkedin_url}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                aria-label={`${m.name} on LinkedIn`}
                                                                className="w-9 h-9 rounded-full bg-gray-100 dark:bg-gray-900 text-gray-600 dark:text-gray-300 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
                                                            >
                                                                <Linkedin className="w-4 h-4" />
                                                            </a>
                                                        )}
                                                        {m.email && (
                                                            <a
                                                                href={`mailto:${m.email}`}
                                                                aria-label={`Email ${m.name}`}
                                                                className="w-9 h-9 rounded-full bg-gray-100 dark:bg-gray-900 text-gray-600 dark:text-gray-300 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
                                                            >
                                                                <Mail className="w-4 h-4" />
                                                            </a>
                                                        )}
                                                        {m.phone && (
                                                            <a
                                                                href={`tel:${m.phone}`}
                                                                aria-label={`Call ${m.name}`}
                                                                className="w-9 h-9 rounded-full bg-gray-100 dark:bg-gray-900 text-gray-600 dark:text-gray-300 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
                                                            >
                                                                <Phone className="w-4 h-4" />
                                                            </a>
                                                        )}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    );
                                })}
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
