import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import {
  GraduationCap,
  Globe2,
  Coins,
  Plane,
  Calendar,
  MapPin,
  BookOpen,
  CheckCircle2,
  FileText,
  Building2,
  Sparkles,
  ArrowRight,
  Award,
  Banknote,
  Briefcase,
  Clock,
  Heart,
  Landmark,
  Languages,
} from "lucide-react";
import { Navigation } from "@/components/navigation";
import Footer from "@/components/sections/Footer";
import { ContactForm } from "@/components/ContactForm";
import { CollegeCard } from "@/components/CollegeCard";
import { Button } from "@/components/ui/button";
import {
  getCountry,
  getCountries,
  getUniversities,
  getScholarships,
  getFaqs,
  getBlogPosts,
} from "@/lib/data";
import { siteConfig } from "@/lib/site-config";
import { countryProfiles } from "@/lib/country-profiles";

export const revalidate = 60;

export async function generateStaticParams() {
  return siteConfig.countries.map((c) => ({ country: c.code }));
}

export async function generateMetadata({ params }: { params: Promise<{ country: string }> }): Promise<Metadata> {
  const { country: code } = await params;
  const data = await getCountry(code);
  const fallback = siteConfig.countries.find((c) => c.code === code);
  if (!data && !fallback) return { title: "Destination not found" };
  const title = data?.seo_title || `Study in ${data?.name || fallback?.name}`;
  const description =
    data?.seo_description ||
    `Complete guidance to study in ${data?.name || fallback?.name}. Top universities, scholarships, fees, visa and admission process with ${siteConfig.name}.`;
  return {
    title,
    description,
    keywords: data?.seo_keywords,
    alternates: { canonical: `/study-in/${code}` },
    openGraph: { title, description, url: `${siteConfig.url}/study-in/${code}` },
  };
}

export default async function CountryPage({ params }: { params: Promise<{ country: string }> }) {
  const { country: code } = await params;
  const [country, universities, scholarships, faqs, posts] = await Promise.all([
    getCountry(code),
    getUniversities({ countryCode: code, limit: 9 }),
    getScholarships({ countryCode: code, limit: 6 }),
    getFaqs({ countryCode: code }),
    getBlogPosts({ countryCode: code, limit: 3 }),
  ]);

  // Allow page to render even if not yet seeded, using local fallback config
  // and the rich, code-based country profile. Supabase values always win.
  const fallback = siteConfig.countries.find((c) => c.code === code);
  if (!country && !fallback) notFound();

  const profile = countryProfiles[code];
  const has = (v: any) => v != null && v !== "" && !(Array.isArray(v) && v.length === 0);
  const merge = (a: any, b: any, d: any = "") => (has(a) ? a : has(b) ? b : d);

  const c: any = {
    code,
    name: country?.name || fallback?.name || code,
    flag_emoji: country?.flag_emoji || fallback?.flag,
    tagline: merge(country?.tagline, profile?.tagline, fallback?.stream),
    short_description: merge(country?.short_description, profile?.short_description),
    long_description: merge(country?.long_description, profile?.long_description),
    capital: merge(country?.capital, profile?.capital),
    currency: merge(country?.currency, profile?.currency),
    language: merge(country?.language, profile?.language),
    intake_months: merge(country?.intake_months, profile?.intake_months, [] as string[]),
    avg_tuition_range: merge(country?.avg_tuition_range, profile?.avg_tuition_range),
    avg_living_cost: merge(country?.avg_living_cost, profile?.avg_living_cost),
    visa_type: merge(country?.visa_type, profile?.visa_type),
    visa_process_summary: merge(country?.visa_process_summary, profile?.visa_process_summary),
    popular_cities: merge(country?.popular_cities, profile?.popular_cities, [] as string[]),
    popular_streams: merge(country?.popular_streams, profile?.popular_streams, [] as string[]),
    why_study: merge(country?.why_study, profile?.why_study, [] as any[]),
    process_steps: country?.process_steps?.length ? country.process_steps : [],
    required_documents: country?.required_documents?.length ? country.required_documents : [],
    // Rich, profile-only sections.
    key_facts: profile?.key_facts || [],
    cost_breakdown: profile?.cost_breakdown || [],
    study_options: profile?.study_options || [],
    work_rights: profile?.work_rights || [],
    student_life: profile?.student_life || [],
  };

  const why = c.why_study?.length
    ? c.why_study
    : DEFAULT_WHY[code as keyof typeof DEFAULT_WHY] || GENERIC_WHY;

  const steps = c.process_steps?.length
    ? c.process_steps
    : DEFAULT_STEPS;

  const documents = c.required_documents?.length
    ? c.required_documents
    : DEFAULT_DOCS;

  return (
    <div className="min-h-screen bg-white dark:bg-black flex flex-col">
      <Navigation />

      <main className="flex-1">
        {/* HERO */}
        <section className="relative pt-32 md:pt-40 pb-16 md:pb-24 overflow-hidden bg-gradient-to-br from-indigo-950 via-blue-950 to-slate-950 dark:from-black dark:via-gray-950 dark:to-black text-white">
          <div className="absolute -top-20 -right-20 w-[500px] h-[500px] bg-primary/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-500/20 rounded-full blur-3xl" />
          <div className="absolute right-10 bottom-10 text-[20rem] opacity-10 select-none pointer-events-none">
            {c.flag_emoji}
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3 mb-4 text-white/70 text-sm">
              <Link href="/" className="hover:text-white">Home</Link>
              <span>/</span>
              <Link href="/#destinations" className="hover:text-white">Destinations</Link>
              <span>/</span>
              <span className="text-white">Study in {c.name}</span>
            </div>

            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-1.5 rounded-full text-xs font-semibold mb-5">
              <span className="text-2xl">{c.flag_emoji}</span> {c.name}
            </div>

            <h1 className="text-4xl md:text-6xl font-black mb-5 font-mont leading-tight max-w-4xl">
              Study in {c.name} —{" "}
              <span className="bg-gradient-to-r from-amber-300 to-yellow-200 bg-clip-text text-transparent">
                {c.tagline}
              </span>
            </h1>
            <p className="text-lg md:text-xl text-white/80 max-w-3xl leading-relaxed mb-7">
              {c.short_description || c.long_description}
            </p>

            <div className="flex flex-wrap gap-3">
              <Link href={`/universities?country=${code}`}>
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold">
                  Browse Universities <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
              <Link href="#consult">
                <Button size="lg" variant="outline" className="border-2 border-white/40 text-white hover:bg-white hover:text-gray-900 bg-white/5 backdrop-blur-sm font-bold">
                  Free Consultation
                </Button>
              </Link>
            </div>

            {/* Quick facts */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-10">
              <FactCard icon={Coins} label="Avg. Tuition" value={c.avg_tuition_range || "—"} />
              <FactCard icon={MapPin} label="Avg. Living" value={c.avg_living_cost || "—"} />
              <FactCard icon={Calendar} label="Intake" value={(c.intake_months || []).join(", ") || "—"} />
              <FactCard icon={Plane} label="Visa" value={c.visa_type || "Student Visa"} />
            </div>
          </div>
        </section>

        {/* AT A GLANCE */}
        {(c.capital || c.currency || c.language || c.key_facts.length > 0) && (
          <section className="py-10 bg-white dark:bg-black border-b border-gray-100 dark:border-gray-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {c.capital && <GlanceCard icon={Landmark} label="Capital" value={c.capital} />}
                {c.currency && <GlanceCard icon={Banknote} label="Currency" value={c.currency} />}
                {c.language && <GlanceCard icon={Languages} label="Language" value={c.language} />}
                {(c.key_facts as { label: string; value: string }[]).map((f) => (
                  <GlanceCard key={f.label} icon={CheckCircle2} label={f.label} value={f.value} />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* OVERVIEW */}
        {c.long_description && (
          <section className="py-16 bg-white dark:bg-black">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-2xl md:text-3xl font-black text-gray-900 dark:text-white mb-4 font-mont">
                About studying in {c.name}
              </h2>
              <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300 whitespace-pre-line">
                {c.long_description}
              </p>
            </div>
          </section>
        )}

        {/* WHY THIS COUNTRY */}
        <section className="py-16 md:py-20 bg-gray-50 dark:bg-gray-950">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-3">
                <Sparkles className="w-3.5 h-3.5" /> Why {c.name}
              </div>
              <h2 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white font-mont">
                Reasons students choose {c.name}
              </h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {why.map((w: any, i: number) => (
                <div key={i} className="bg-white dark:bg-black p-6 rounded-2xl border border-gray-200 dark:border-gray-800 hover:border-primary/40 hover:shadow-lg transition-all">
                  <div className="w-11 h-11 rounded-xl bg-primary/15 text-primary flex items-center justify-center mb-3">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-gray-900 dark:text-white mb-1.5 font-mont">{w.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{w.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* STUDY OPTIONS */}
        {c.study_options.length > 0 && (
          <section className="py-16 md:py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-10">
                <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-3">
                  <GraduationCap className="w-3.5 h-3.5" /> Programs
                </div>
                <h2 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white font-mont">
                  What you can study in {c.name}
                </h2>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {(c.study_options as { title: string; duration: string; description: string }[]).map((o) => (
                  <div key={o.title} className="bg-white dark:bg-black p-6 rounded-2xl border border-gray-200 dark:border-gray-800 hover:border-primary/40 hover:shadow-lg transition-all">
                    <div className="flex items-center justify-between mb-3">
                      <div className="w-11 h-11 rounded-xl bg-primary/15 text-primary flex items-center justify-center">
                        <GraduationCap className="w-6 h-6" />
                      </div>
                      <span className="inline-flex items-center gap-1 text-xs font-bold text-primary bg-primary/10 px-2.5 py-1 rounded-full">
                        <Clock className="w-3 h-3" /> {o.duration}
                      </span>
                    </div>
                    <h3 className="font-bold text-gray-900 dark:text-white mb-1.5 font-mont">{o.title}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{o.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* UNIVERSITIES */}
        <section className="py-16 md:py-20 bg-gray-50 dark:bg-gray-950">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
              <div>
                <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-3">
                  <Building2 className="w-3.5 h-3.5" /> Top picks
                </div>
                <h2 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white font-mont">
                  Top universities in {c.name}
                </h2>
              </div>
              <Link href={`/universities?country=${code}`}>
                <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                  View all
                </Button>
              </Link>
            </div>
            {universities.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {universities.map((u) => (
                  <CollegeCard key={u.id} college={u} />
                ))}
              </div>
            ) : (
              <div className="text-center bg-gray-50 dark:bg-gray-900 rounded-2xl p-10 border border-dashed border-gray-300 dark:border-gray-800">
                <Building2 className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500">Universities for {c.name} will appear here once added.</p>
                <Link href="#consult" className="inline-block mt-4">
                  <Button>Talk to a counsellor</Button>
                </Link>
              </div>
            )}
          </div>
        </section>

        {/* COST BREAKDOWN */}
        {c.cost_breakdown.length > 0 && (
          <section className="py-16 md:py-20 bg-white dark:bg-black">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-10">
                <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-3">
                  <Banknote className="w-3.5 h-3.5" /> Transparent costs
                </div>
                <h2 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white font-mont">
                  Cost of studying in {c.name}
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mt-3 max-w-2xl mx-auto">
                  Approximate annual figures in USD. Final costs vary by university and city — we&apos;ll give you exact numbers during counselling.
                </p>
              </div>
              <div className="overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-800">
                <table className="w-full text-left">
                  <thead className="bg-gray-50 dark:bg-gray-950 text-gray-500 dark:text-gray-400 text-xs uppercase tracking-wider">
                    <tr>
                      <th className="px-5 py-3 font-bold">Expense</th>
                      <th className="px-5 py-3 font-bold">Estimated amount</th>
                      <th className="px-5 py-3 font-bold hidden sm:table-cell">Notes</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                    {(c.cost_breakdown as { category: string; amount: string; note?: string }[]).map((row) => (
                      <tr key={row.category} className="bg-white dark:bg-black">
                        <td className="px-5 py-4 font-semibold text-gray-900 dark:text-white">{row.category}</td>
                        <td className="px-5 py-4 font-bold text-primary whitespace-nowrap">{row.amount}</td>
                        <td className="px-5 py-4 text-sm text-gray-500 dark:text-gray-400 hidden sm:table-cell">{row.note || "—"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        )}

        {/* SCHOLARSHIPS */}
        {scholarships.length > 0 && (
          <section className="py-16 md:py-20 bg-amber-50/30 dark:bg-gray-950">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-10">
                <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-3">
                  <Award className="w-3.5 h-3.5" /> Funding
                </div>
                <h2 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white font-mont">
                  Scholarships you can apply to
                </h2>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {scholarships.map((s) => (
                  <div key={s.id} className="bg-white dark:bg-black rounded-2xl p-6 border border-gray-200 dark:border-gray-800 hover:shadow-xl transition-all">
                    <div className="inline-flex px-2.5 py-1 bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300 text-xs font-bold rounded-full mb-3">
                      {s.scholarship_type || "Scholarship"}
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1 font-mont">{s.name}</h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">{s.provider}</p>
                    <p className="text-sm text-gray-700 dark:text-gray-300 mb-4 line-clamp-3">{s.description}</p>
                    <div className="text-sm font-bold text-primary mb-4">{s.amount}</div>
                    {s.application_link && (
                      <Link href={s.application_link} target="_blank" className="text-sm text-primary font-semibold hover:underline">
                        Apply now →
                      </Link>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* WORK RIGHTS / AFTER YOUR DEGREE */}
        {c.work_rights.length > 0 && (
          <section className="py-16 md:py-20 bg-gray-50 dark:bg-gray-950">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-10">
                <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-3">
                  <Briefcase className="w-3.5 h-3.5" /> After your degree
                </div>
                <h2 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white font-mont">
                  Licensing &amp; career pathways
                </h2>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {(c.work_rights as { title: string; description: string }[]).map((w) => (
                  <div key={w.title} className="bg-white dark:bg-black p-6 rounded-2xl border border-gray-200 dark:border-gray-800 hover:border-primary/40 hover:shadow-lg transition-all">
                    <div className="w-11 h-11 rounded-xl bg-primary/15 text-primary flex items-center justify-center mb-3">
                      <Briefcase className="w-6 h-6" />
                    </div>
                    <h3 className="font-bold text-gray-900 dark:text-white mb-1.5 font-mont">{w.title}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{w.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* PROCESS */}
        <section className="py-16 md:py-20 bg-gradient-to-br from-gray-900 via-slate-900 to-gray-900 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-3">
                <FileText className="w-3.5 h-3.5 text-amber-300" /> Process
              </div>
              <h2 className="text-3xl md:text-4xl font-black mb-3 font-mont">
                Your roadmap to {c.name}
              </h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4">
              {steps.map((s: any) => (
                <div key={s.step} className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-5">
                  <div className="w-9 h-9 rounded-lg bg-amber-400 text-gray-900 font-black flex items-center justify-center mb-3">
                    {s.step}
                  </div>
                  <h3 className="font-bold mb-1">{s.title}</h3>
                  <p className="text-sm text-white/70">{s.description}</p>
                </div>
              ))}
            </div>

            <div className="mt-12 grid md:grid-cols-2 gap-6">
              <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6">
                <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-amber-300" /> Documents you'll need
                </h3>
                <ul className="space-y-2 text-sm text-white/80">
                  {documents.map((d: string) => (
                    <li key={d} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 mt-0.5 text-amber-300 flex-shrink-0" /> {d}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6">
                <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
                  <Globe2 className="w-5 h-5 text-amber-300" /> Popular cities
                </h3>
                <div className="flex flex-wrap gap-2">
                  {(c.popular_cities || []).map((city: string) => (
                    <span key={city} className="px-3 py-1.5 bg-white/10 rounded-full text-sm font-medium">
                      {city}
                    </span>
                  ))}
                </div>
                {c.visa_process_summary && (
                  <p className="text-sm text-white/70 mt-5 leading-relaxed">{c.visa_process_summary}</p>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* STUDENT LIFE */}
        {c.student_life.length > 0 && (
          <section className="py-16 md:py-20 bg-white dark:bg-black">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-10">
                <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-3">
                  <Heart className="w-3.5 h-3.5" /> Life in {c.name}
                </div>
                <h2 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white font-mont">
                  What student life looks like
                </h2>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {(c.student_life as { title: string; description: string }[]).map((s) => (
                  <div key={s.title} className="bg-gray-50 dark:bg-gray-950 p-6 rounded-2xl border border-gray-200 dark:border-gray-800">
                    <div className="w-11 h-11 rounded-xl bg-primary/15 text-primary flex items-center justify-center mb-3">
                      <Heart className="w-6 h-6" />
                    </div>
                    <h3 className="font-bold text-gray-900 dark:text-white mb-1.5 font-mont">{s.title}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{s.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* FAQS */}
        {faqs.length > 0 && (
          <section className="py-16 md:py-20">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-8">
                <h2 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white font-mont">
                  Frequently asked questions
                </h2>
              </div>
              <div className="space-y-3">
                {faqs.map((f) => (
                  <details key={f.id} className="bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-xl p-5 group">
                    <summary className="font-bold text-gray-900 dark:text-white cursor-pointer flex items-start justify-between gap-3">
                      <span>{f.question}</span>
                      <span className="text-primary text-xl leading-none group-open:rotate-45 transition-transform">+</span>
                    </summary>
                    <p className="mt-3 text-gray-600 dark:text-gray-300 leading-relaxed">{f.answer}</p>
                  </details>
                ))}
              </div>
            </div>
            {/* FAQ JSON-LD */}
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
          </section>
        )}

        {/* BLOG */}
        {posts.length > 0 && (
          <section className="py-16 bg-gray-50 dark:bg-gray-950">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-2xl md:text-3xl font-black text-gray-900 dark:text-white mb-6 font-mont">
                Guides for {c.name}
              </h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {posts.map((p) => (
                  <Link key={p.id} href={`/blog/${p.slug}`} className="bg-white dark:bg-black rounded-2xl p-5 border border-gray-200 dark:border-gray-800 hover:shadow-lg transition-all group">
                    <h3 className="font-bold text-gray-900 dark:text-white mb-2 group-hover:text-primary transition-colors line-clamp-2">{p.title}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">{p.excerpt}</p>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* CONSULTATION */}
        <section id="consult" className="py-16 md:py-24 bg-white dark:bg-black">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-8 items-start">
            <div>
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-3">
                Free consultation
              </div>
              <h2 className="text-3xl md:text-5xl font-black text-gray-900 dark:text-white mb-4 font-mont">
                Ready for {c.name}?
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
                Share your details and we'll build a personalised roadmap to your {c.name} dream — completely free.
              </p>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-primary" /> Honest profile evaluation</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-primary" /> Best-fit universities + backups</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-primary" /> Scholarship & funding mapping</li>
              </ul>
            </div>
            <ContactForm defaultCountry={code} />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

function FactCard({ icon: Icon, label, value }: { icon: any; label: string; value: string }) {
  return (
    <div className="bg-white/10 backdrop-blur-md border border-white/15 rounded-xl p-4">
      <Icon className="w-5 h-5 text-amber-300 mb-2" />
      <div className="text-xs text-white/70 font-medium">{label}</div>
      <div className="font-bold text-white text-sm">{value}</div>
    </div>
  );
}

function GlanceCard({ icon: Icon, label, value }: { icon: any; label: string; value: string }) {
  return (
    <div className="flex items-start gap-3 bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-2xl p-4">
      <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
        <Icon className="w-5 h-5" />
      </div>
      <div className="min-w-0">
        <div className="text-xs text-gray-500 dark:text-gray-400 font-medium">{label}</div>
        <div className="font-bold text-gray-900 dark:text-white text-sm leading-snug">{value}</div>
      </div>
    </div>
  );
}

const GENERIC_WHY = [
  { title: "Globally recognized degrees", description: "Internationally accredited universities and curricula." },
  { title: "Strong career outcomes", description: "High graduate employability and competitive salaries." },
  { title: "Diverse student community", description: "Inclusive campuses with students from around the world." },
];

const DEFAULT_WHY: Record<string, { title: string; description: string }[]> = {
  nepal: [
    { title: "NMC-recognized MBBS", description: "All partner colleges are recognized by the Nepal Medical Council and FAIMER." },
    { title: "No language barrier", description: "English-medium teaching with a curriculum closely aligned with the Indian syllabus." },
    { title: "Affordable & low living cost", description: "Total cost is a fraction of private medical colleges in India." },
    { title: "Easy travel", description: "Close to home for Indian students — short flights and open border access." },
    { title: "FMGE / NExT preparation", description: "Dedicated coaching for Indian licensing exams." },
    { title: "Modern hospital exposure", description: "Strong clinical exposure across 700–1,500 bed teaching hospitals." },
  ],
  india: [
    { title: "World-class engineering", description: "IITs, NITs, BITS, IIITs and top private universities at every budget." },
    { title: "English instruction", description: "Programs taught in English — easy switch from Nepali Plus-2." },
    { title: "Booming tech ecosystem", description: "Internships and placements at India's largest tech hubs." },
    { title: "SAARC concessions", description: "Reserved seats and reduced fees for Nepali students." },
    { title: "Cultural familiarity", description: "Close to home with shared cultural and food habits." },
    { title: "Strong global brand", description: "Indian engineering graduates are recruited globally." },
  ],
  uk: [
    { title: "Shorter degrees", description: "3-year bachelors and 1-year masters — save time and money." },
    { title: "2-year Graduate Route", description: "Stay back and work for 2 years after graduation." },
    { title: "Top-ranked universities", description: "Oxford, Cambridge, Imperial, UCL and Russell Group institutions." },
    { title: "Generous scholarships", description: "Chevening, Commonwealth and university-specific awards." },
    { title: "Diverse society", description: "Multicultural cities with strong Nepali communities." },
    { title: "Quality of life", description: "Excellent healthcare, transport and student support." },
  ],
  usa: [
    { title: "World's top universities", description: "Ivy League, MIT, Stanford and 100+ globally ranked institutions." },
    { title: "Flexible curriculum", description: "Switch majors, double major, build your own degree." },
    { title: "OPT & STEM extension", description: "Up to 3 years of post-study work for STEM graduates." },
    { title: "Research powerhouse", description: "Industry-grade labs, faculty and innovation culture." },
    { title: "Generous financial aid", description: "Need-based aid, merit scholarships and assistantships." },
    { title: "Career ecosystem", description: "Internships and full-time roles at Fortune 500 and startups." },
  ],
  japan: [
    { title: "MEXT & JASSO scholarships", description: "Generous government and private scholarships for Nepali students." },
    { title: "English-taught programs", description: "Top universities offer full degree programs in English." },
    { title: "Innovation & R&D", description: "Engineering, robotics, materials science and design at world level." },
    { title: "Safe & efficient", description: "One of the world's safest, cleanest and most efficient societies." },
    { title: "Work part-time", description: "Up to 28 hours/week of part-time work allowed." },
    { title: "Post-study work visa", description: "Designated Activities visa lets you job-hunt for 1 year+." },
  ],
  bangladesh: [
    { title: "Affordable MBBS & BDS", description: "Quality medical education at a fraction of private college fees in India." },
    { title: "BMDC & WHO recognized", description: "Colleges recognized by BMDC and listed in the WHO directory (WDOMS)." },
    { title: "English-medium teaching", description: "Curriculum closely aligned with the Indian medical syllabus." },
    { title: "No donation, transparent fees", description: "Direct, structured admission with clear, upfront cost." },
    { title: "FMGE / NExT preparation", description: "Dedicated coaching for Indian licensing exams." },
    { title: "Close to home", description: "Short travel and a familiar culture and climate for South Asian students." },
  ],
  canada: [
    { title: "Post-graduation work permit", description: "Up to 3 years of work rights after completing your program." },
    { title: "Pathway to PR", description: "One of the clearest study-to-permanent-residency routes in the world." },
    { title: "Top-ranked universities", description: "Toronto, UBC, McGill, Waterloo and globally respected colleges." },
    { title: "Affordable quality", description: "World-class education at lower tuition than the US or UK." },
    { title: "Safe & welcoming", description: "Consistently ranked among the safest, most inclusive countries." },
    { title: "Co-op & internships", description: "Paid co-op programs that build career experience while you study." },
  ],
  russia: [
    { title: "Globally recognized MBBS", description: "Government medical universities recognized by NMC, WHO and FAIMER." },
    { title: "Low cost, high quality", description: "Affordable MBBS and MD/MS with strong clinical training." },
    { title: "English-medium programs", description: "Full degree programs taught in English for international students." },
    { title: "No entrance donation", description: "Direct admission with transparent, structured fees." },
    { title: "Strong in engineering", description: "Renowned for aerospace, petroleum and core engineering disciplines." },
    { title: "Established Indian community", description: "Large international student base and support networks on campus." },
  ],
};

const DEFAULT_STEPS = [
  { step: 1, title: "Free counselling", description: "Profile evaluation and country/course shortlist." },
  { step: 2, title: "Application", description: "We file applications and track every deadline." },
  { step: 3, title: "Offer letter", description: "Receive admission offers from your shortlisted universities." },
  { step: 4, title: "Visa & funding", description: "Documentation, financial planning and visa interview." },
  { step: 5, title: "Pre-departure", description: "Forex, accommodation, travel and welcome briefing." },
];

const DEFAULT_DOCS = [
  "Passport (valid 6+ months)",
  "Academic transcripts (Plus-2 / Bachelors)",
  "English proficiency (IELTS / TOEFL / MOI)",
  "Statement of Purpose (SOP)",
  "Letters of Recommendation (2-3)",
  "CV / Resume",
  "Bank statements & financial proof",
  "Health & travel insurance",
];
