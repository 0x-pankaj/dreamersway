import Link from "next/link";
import { Navigation } from "@/components/navigation";
import Footer from "@/components/sections/Footer";
import { CollegeCard } from "@/components/CollegeCard";
import { CountryCard } from "@/components/CountryCard";
import NoticeList from "@/components/NoticeList";
import { ContactForm } from "@/components/ContactForm";
import TestimonialsSection from "@/components/TestimonialsSection";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  GraduationCap,
  Globe2,
  Award,
  Users,
  CheckCircle2,
  TrendingUp,
  Sparkles,
  Target,
  FileText,
  BookOpen,
  Plane,
  Briefcase,
  Star,
  Quote,
  Stethoscope,
  Cpu,
  HeartPulse,
  Activity,
  Sprout,
} from "lucide-react";
import {
  getCountries,
  getUniversities,
  getNotices,
  getServices,
  getSuccessStories,
  getBlogPosts,
} from "@/lib/data";
import { siteConfig } from "@/lib/site-config";
import Image from "next/image";

export const revalidate = 60;

const SERVICE_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  Target,
  FileText,
  BookOpen,
  Plane,
  Award,
  Briefcase,
  PlaneTakeoff: Plane,
};

const STREAM_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  doctor: Stethoscope,
  engineer: Cpu,
  bhs: HeartPulse,
  nursing: Activity,
  agriculture: Sprout,
};

export default async function Home() {
  const [countries, featuredUnis, notices, services, stories, blogPosts] = await Promise.all([
    getCountries(),
    getUniversities({ featuredOnly: true, limit: 6 }),
    getNotices(5),
    getServices(),
    getSuccessStories(6),
    getBlogPosts({ limit: 3 }),
  ]);

  // Start from Supabase countries, then append any configured destination that
  // isn't seeded yet so newly added countries always show up on the homepage.
  const seededCodes = new Set(countries.map((c) => c.code));
  const configFallback = siteConfig.countries.map((c, i) => ({
    id: `cfg-${c.code}`,
    created_at: "",
    code: c.code,
    name: c.name,
    flag_emoji: c.flag,
    tagline: c.stream,
    popular_streams: [c.code === "nepal" ? "medical" : c.code === "india" ? "engineering" : "higher-education"],
    is_active: true,
    display_order: countries.length + i,
  } as any));
  const displayCountries = [
    ...countries,
    ...configFallback.filter((c) => !seededCodes.has(c.code)),
  ];

  const stats = [
    { value: "11+", label: "Countries", icon: Globe2 },
    { value: "50+", label: "Partner Universities", icon: GraduationCap },
    { value: "500+", label: "Students Placed", icon: Users },
    { value: "8+", label: "Years of Experience", icon: Award },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-black flex flex-col">
      <Navigation />

      <main className="flex-1">
        {/* ============== HERO ============== */}
        <section className="relative pt-32 md:pt-40 pb-20 md:pb-28 overflow-hidden bg-gradient-to-br from-indigo-950 via-blue-950 to-slate-950 dark:from-black dark:via-gray-950 dark:to-black">
          {/* animated background blobs */}
          <div className="absolute inset-0">
            <div className="absolute top-20 -left-20 w-[500px] h-[500px] bg-primary/20 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-10 right-0 w-[500px] h-[500px] bg-blue-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1.5s" }} />
            <div className="absolute top-1/2 left-1/2 w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "3s" }} />
          </div>

          {/* subtle dot grid */}
          <div className="absolute inset-0 opacity-30" style={{
            backgroundImage:
              "radial-gradient(circle, rgba(255,255,255,0.08) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }} />

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 text-white px-5 py-2.5 rounded-full text-sm font-semibold mb-7 animate-fade-in-up">
              <Sparkles className="w-4 h-4 text-amber-300" />
              Nepal · India · UK · USA · Canada · Georgia · Philippines & more — one trusted partner
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-7xl font-black text-white mb-6 leading-[1.05] font-mont">
              Your dream university.
              <span className="block bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-300 bg-clip-text text-transparent mt-2">
                Anywhere in the world.
              </span>
            </h1>

            <p className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto leading-relaxed mb-8">
              MBBS, MD & MS for medical aspirants, plus Engineering, Nursing, Health Sciences and Agriculture — across Nepal, India, UK, USA, Bangladesh, Canada, Russia, Georgia, Uzbekistan, Kyrgyzstan & the Philippines. End-to-end guidance — shortlisting, applications, scholarships, visa and beyond.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center items-center mb-12">
              <Link href="/contact?intent=book">
                <Button
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-base px-7 py-6 rounded-xl shadow-2xl hover:shadow-primary/30 transition-all hover:scale-105"
                >
                  Get Free Consultation
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link href="/universities">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-white/40 text-white hover:bg-white hover:text-gray-900 font-bold text-base px-7 py-6 rounded-xl bg-white/5 backdrop-blur-sm"
                >
                  Browse Universities
                </Button>
              </Link>
            </div>

            {/* Destination quick chips */}
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-10">
              {siteConfig.countries.map((c) => (
                <Link
                  key={c.code}
                  href={`/study-in/${c.code}`}
                  className="group inline-flex items-center gap-2 bg-white/10 hover:bg-white text-white hover:text-gray-900 backdrop-blur-md border border-white/20 px-4 py-2 rounded-full font-semibold text-sm transition-all hover:scale-105"
                >
                  <span className="text-xl">{c.flag}</span>
                  Study in {c.name}
                </Link>
              ))}
            </div>

            {/* Stats Strip */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6 max-w-4xl mx-auto pt-6 border-t border-white/10">
              {stats.map((s) => (
                <div key={s.label} className="flex flex-col items-center text-center">
                  <s.icon className="w-6 h-6 text-amber-300 mb-2" />
                  <div className="text-2xl md:text-3xl font-black text-white">{s.value}</div>
                  <div className="text-xs md:text-sm text-white/70 font-medium">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ============== CAREERS / FIELDS ============== */}
        <section className="py-16 md:py-24 bg-white dark:bg-gray-950 border-b border-gray-100 dark:border-gray-900 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-10">
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-3">
                <Briefcase className="w-3.5 h-3.5" /> Careers we build
              </div>
              <h2 className="text-3xl md:text-5xl font-black text-gray-900 dark:text-white font-mont mb-4">
                One platform, every career path
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                From doctors and engineers to nurses, health-science and agriculture professionals — we guide students into the careers that shape their future.
              </p>
            </div>

            {/* Hero career lineup */}
            <div className="relative mx-auto max-w-5xl bg-white rounded-3xl p-4 sm:p-6 shadow-sm ring-1 ring-gray-100 dark:ring-gray-800">
              <Image
                src="/careers-fields.png"
                alt="Students across professions — engineer, doctor, business, hospitality and nursing"
                width={1400}
                height={760}
                priority
                className="w-full h-auto object-contain"
              />
            </div>

            {/* Streams */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mt-10">
              {siteConfig.streams.map((s) => {
                const Icon = STREAM_ICONS[s.code] || GraduationCap;
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

        {/* ============== DESTINATIONS ============== */}
        <section className="py-20 md:py-24 bg-gradient-to-b from-white via-amber-50/30 to-white dark:from-black dark:via-gray-950 dark:to-black">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
                <Globe2 className="w-3.5 h-3.5" /> Destinations
              </div>
              <h2 className="text-3xl md:text-5xl font-black text-gray-900 dark:text-white mb-4 font-mont">
                Pick your dream destination
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Curated programs, transparent costs, hand-picked universities — for every dream and every budget.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {displayCountries.slice(0, 6).map((c) => (
                <CountryCard key={c.code} country={c as any} />
              ))}
            </div>
          </div>
        </section>

        {/* ============== MESSAGE FROM MANAGING DIRECTOR ============== */}
        <section className="py-20 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-5 gap-10 items-center">
              {/* Portrait */}
              <div className="lg:col-span-2">
                <div className="relative max-w-sm mx-auto">
                  {/* To use a real photo, drop it at /public/anand-thakur.jpg and render
                      <Image src="/anand-thakur.jpg" alt="Mr. Anand Thakur" fill className="object-cover" /> here. */}
                  <div className="relative aspect-[4/5] rounded-3xl overflow-hidden bg-gradient-to-br from-indigo-950 via-blue-950 to-slate-950 shadow-2xl border border-white/10 flex flex-col items-center justify-center text-white/90">
                    <div className="w-28 h-28 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-5xl font-black font-mont mb-3">
                      AT
                    </div>
                    <div className="text-sm font-semibold tracking-wide">Mr. Anand Thakur</div>
                    <div className="text-xs text-white/60 mt-1">Managing Director &amp; Co-founder</div>
                  </div>
                </div>
              </div>

              {/* Message */}
              <div className="lg:col-span-3">
                <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
                  <Quote className="w-3.5 h-3.5" /> Message from our Managing Director
                </div>
                <h2 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white font-mont mb-5">
                  Welcome to Dreamer&apos;s Way Consultancy
                </h2>
                <div className="space-y-4 text-gray-700 dark:text-gray-300 leading-relaxed">
                  <p>
                    For over eight years, our mission has stayed the same — to give every student honest, transparent guidance and a clear path to the right university abroad. Whether you dream of becoming a doctor, engineer, nurse or researcher, our team walks with you from your very first question to your first day on campus.
                  </p>
                  <p>
                    We don&apos;t just guide admissions — we help you make informed, confident and future-ready academic choices. That is the promise behind everything we do.
                  </p>
                </div>
                <div className="mt-6 flex flex-col sm:flex-row sm:items-center gap-4">
                  <div>
                    <div className="font-bold text-gray-900 dark:text-white font-mont">Mr. Anand Thakur</div>
                    <div className="text-sm text-primary font-semibold">Managing Director &amp; Co-founder</div>
                  </div>
                  <Link href="/about" className="sm:ml-auto inline-flex items-center gap-1.5 text-sm font-bold text-primary hover:gap-2.5 transition-all">
                    Read more about us <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============== SERVICES ============== */}
        <section className="py-20 md:py-24 bg-gray-50 dark:bg-gray-950 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
                <Sparkles className="w-3.5 h-3.5" /> One-stop services
              </div>
              <h2 className="text-3xl md:text-5xl font-black text-gray-900 dark:text-white mb-4 font-mont">
                Everything you need, in one place
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                From your first counselling session to your first day on campus, we handle every step.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {(services.length ? services : DEFAULT_SERVICES).map((s, i) => {
                const Icon = SERVICE_ICONS[s.icon || ""] || Sparkles;
                return (
                  <div
                    key={s.slug || i}
                    className="group bg-white dark:bg-black rounded-2xl p-6 border border-gray-200 dark:border-gray-800 hover:border-primary/40 hover:shadow-xl transition-all"
                  >
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-amber-500 flex items-center justify-center text-primary-foreground mb-4 group-hover:scale-110 transition-transform">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 font-mont">{s.title}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                      {s.short_description}
                    </p>
                    {s.features && s.features.length > 0 && (
                      <ul className="space-y-1.5">
                        {s.features.slice(0, 3).map((f: string) => (
                          <li key={f} className="flex items-start gap-2 text-xs text-gray-500 dark:text-gray-400">
                            <CheckCircle2 className="w-3.5 h-3.5 text-primary mt-0.5 flex-shrink-0" />
                            {f}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ============== FEATURED UNIVERSITIES ============== */}
        {featuredUnis.length > 0 && (
          <section className="py-20 md:py-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
                <div>
                  <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-3">
                    <GraduationCap className="w-3.5 h-3.5" /> Featured universities
                  </div>
                  <h2 className="text-3xl md:text-5xl font-black text-gray-900 dark:text-white font-mont">
                    Hand-picked institutions
                  </h2>
                </div>
                <Link href="/universities">
                  <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                    View all <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {featuredUnis.map((u) => (
                  <CollegeCard key={u.id} college={u} />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ============== HOW IT WORKS ============== */}
        <section className="py-20 md:py-24 bg-gradient-to-br from-gray-900 via-slate-900 to-gray-900 dark:from-black dark:via-gray-950 dark:to-black text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-500/20 rounded-full blur-3xl" />

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
                <TrendingUp className="w-3.5 h-3.5 text-amber-300" /> Your journey, simplified
              </div>
              <h2 className="text-3xl md:text-5xl font-black mb-4 font-mont">From dream to departure in 5 steps</h2>
              <p className="text-lg text-white/70 max-w-2xl mx-auto">
                A clear roadmap — no jargon, no surprises.
              </p>
            </div>

            <div className="grid md:grid-cols-5 gap-5">
              {[
                { n: 1, t: "Free counselling", d: "Tell us your goals, budget and grades — we build your roadmap." },
                { n: 2, t: "Shortlist & apply", d: "Country/university shortlist tailored to your profile and odds." },
                { n: 3, t: "Test prep & docs", d: "IELTS/SAT/GRE prep + SOPs, LORs, transcripts, finances." },
                { n: 4, t: "Visa & funding", d: "Scholarships, loans, mock interviews, visa filing." },
                { n: 5, t: "Take off!", d: "Forex, accommodation, airport pickup — settle in like a pro." },
              ].map((step) => (
                <div key={step.n} className="relative bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-5 hover:bg-white/10 transition-colors">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-300 to-amber-500 text-gray-900 font-black flex items-center justify-center mb-3 text-lg shadow-lg">
                    {step.n}
                  </div>
                  <h3 className="font-bold mb-1.5 text-base">{step.t}</h3>
                  <p className="text-sm text-white/70 leading-relaxed">{step.d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ============== SUCCESS STORIES ============== */}
        {stories.length > 0 ? (
          <section className="py-20 md:py-24 bg-amber-50/30 dark:bg-gray-950">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
                  <Quote className="w-3.5 h-3.5" /> Real students. Real dreams.
                </div>
                <h2 className="text-3xl md:text-5xl font-black text-gray-900 dark:text-white mb-4 font-mont">
                  Success stories
                </h2>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {stories.slice(0, 6).map((s) => (
                  <div key={s.id} className="bg-white dark:bg-black rounded-2xl p-6 border border-gray-200 dark:border-gray-800 hover:shadow-xl transition-all">
                    <div className="flex items-center gap-1 mb-3 text-amber-400">
                      {Array.from({ length: s.rating || 5 }).map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-current" />
                      ))}
                    </div>
                    <Quote className="w-7 h-7 text-primary/30 mb-2" />
                    <p className="text-gray-700 dark:text-gray-300 mb-5 leading-relaxed text-sm line-clamp-5">
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
                      <div>
                        <div className="font-bold text-gray-900 dark:text-white">{s.student_name}</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          {s.program} {s.university && `· ${s.university}`}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        ) : (
          <TestimonialsSection />
        )}

        {/* ============== BLOG/RESOURCES ============== */}
        {blogPosts.length > 0 && (
          <section className="py-20 md:py-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
                <div>
                  <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-3">
                    <BookOpen className="w-3.5 h-3.5" /> Resources
                  </div>
                  <h2 className="text-3xl md:text-5xl font-black text-gray-900 dark:text-white font-mont">
                    Latest guides & insights
                  </h2>
                </div>
                <Link href="/blog">
                  <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                    All articles <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </Link>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {blogPosts.map((post) => (
                  <Link key={post.id} href={`/blog/${post.slug}`} className="group block">
                    <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-gradient-to-br from-primary/20 to-blue-500/20 mb-4">
                      {post.cover_image_url ? (
                        <Image
                          src={post.cover_image_url}
                          alt={post.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <BookOpen className="w-12 h-12 text-primary/50" />
                        </div>
                      )}
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-primary transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                      {post.excerpt}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ============== NOTICES ============== */}
        {notices.length > 0 && (
          <section className="py-16 bg-gray-50 dark:bg-gray-950 border-y border-gray-100 dark:border-gray-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <NoticeList notices={notices} compact={true} />
            </div>
          </section>
        )}

        {/* ============== CONTACT / CTA ============== */}
        <section id="contact" className="py-20 md:py-24 bg-gradient-to-br from-white via-amber-50/30 to-white dark:from-black dark:via-gray-950 dark:to-black">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-10 items-start">
              <div>
                <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
                  Free consultation
                </div>
                <h2 className="text-3xl md:text-5xl font-black text-gray-900 dark:text-white mb-4 font-mont">
                  Let&apos;s plan your future
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                  Tell us where you want to go and what you want to study — we&apos;ll get back within 24 hours with a personalised roadmap.
                </p>
                <div className="space-y-3 text-sm text-gray-600 dark:text-gray-400 mb-6">
                  {[
                    "100% free first consultation",
                    "Honest, profile-based recommendations",
                    "500+ students successfully placed",
                    "Transparent pricing, no surprises",
                  ].map((b) => (
                    <div key={b} className="flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                      <span>{b}</span>
                    </div>
                  ))}
                </div>
                <div className="rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-800 shadow-sm">
                  <iframe
                    width="100%"
                    height="280"
                    src={siteConfig.contact.mapEmbedSrc}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </div>
              <ContactForm />
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

const DEFAULT_SERVICES = [
  { slug: "shortlist", title: "University Shortlisting", icon: "Target", short_description: "Data-driven shortlists matched to your profile, budget and goals.", features: ["Profile evaluation", "Country-fit analysis", "Budget mapping"] },
  { slug: "counselling", title: "Admission Counselling", icon: "FileText", short_description: "End-to-end help with applications, SOPs, LORs and interviews.", features: ["SOP review", "LOR drafting", "Interview prep"] },
  { slug: "test", title: "Test Preparation", icon: "BookOpen", short_description: "IELTS, TOEFL, SAT, GRE, GMAT, JLPT — guided prep with experts.", features: ["Diagnostic", "Study plan", "Mock tests"] },
  { slug: "visa", title: "Visa Guidance", icon: "Plane", short_description: "Documentation, financial planning, interview prep and filing.", features: ["Doc checklist", "Mock interview", "Filing"] },
  { slug: "scholarship", title: "Scholarship Assistance", icon: "Award", short_description: "Identify and apply to scholarships you actually qualify for.", features: ["Match", "Essays", "Tracking"] },
  { slug: "predeparture", title: "Pre-departure Support", icon: "PlaneTakeoff", short_description: "Forex, accommodation, SIM, airport pickup and settling-in.", features: ["Forex", "Accommodation", "Travel"] },
];
