import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
    MapPin,
    Globe,
    Mail,
    Phone,
    Building2,
    Bed,
    CheckCircle2,
    Calendar,
    Award,
    GraduationCap,
    Stethoscope,
    Shield,
    Hospital,
    ChevronRight,
    Home,
} from "lucide-react";
import { Navigation } from "@/components/navigation";
import Footer from "@/components/sections/Footer";
import { Button } from "@/components/ui/button";
import GalleryLightbox from "@/components/GalleryLightbox";
import { ContactForm } from "@/components/ContactForm";
import { getUniversity, getUniversities } from "@/lib/data";
import { siteConfig, countryByCode } from "@/lib/site-config";

export const revalidate = 60;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const u = await getUniversity(slug);
    if (!u) return { title: "University not found" };
    const country = countryByCode(u.country_code);
    const title = u.seo_title || `${u.name} — Programs, Fees & Admission ${country ? `(${country.name})` : ""}`;
    const description =
        u.seo_description ||
        u.short_description ||
        `${u.name}: programs, eligibility, fees, scholarships and admission process. Apply with ${siteConfig.name}.`;
    return {
        title,
        description,
        alternates: { canonical: `/universities/${slug}` },
        openGraph: {
            title,
            description,
            images: u.cover_image_url ? [{ url: u.cover_image_url }] : undefined,
        },
    };
}

export default async function UniversityDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const u = await getUniversity(slug);
    if (!u) notFound();

    const country = countryByCode(u.country_code);
    const totalPrograms = (u.programs_bachelor?.length || 0) + (u.programs_pg?.length || 0);

    // related universities — same country + first matching stream
    const related = await getUniversities({ countryCode: u.country_code, limit: 4 });
    const relatedFiltered = related.filter((x) => x.id !== u.id).slice(0, 3);

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "CollegeOrUniversity",
        name: u.name,
        url: `${siteConfig.url}/universities/${u.slug}`,
        description: u.description || u.short_description,
        address: u.address
            ? {
                "@type": "PostalAddress",
                streetAddress: u.address,
                addressCountry: u.country_code,
            }
            : undefined,
        image: u.cover_image_url,
        sameAs: u.website_url,
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-black flex flex-col">
            <Navigation />

            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

            <div className="bg-white dark:bg-gray-950 border-b border-gray-200 dark:border-gray-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 pt-24">
                    <nav className="flex items-center text-sm text-gray-500 dark:text-gray-400 flex-wrap gap-1">
                        <Link href="/" className="flex items-center hover:text-primary"><Home className="w-4 h-4 mr-1" />Home</Link>
                        <ChevronRight className="w-4 h-4 mx-1" />
                        <Link href="/universities" className="hover:text-primary">Universities</Link>
                        <ChevronRight className="w-4 h-4 mx-1" />
                        {country && (
                            <>
                                <Link href={`/study-in/${country.code}`} className="hover:text-primary">{country.name}</Link>
                                <ChevronRight className="w-4 h-4 mx-1" />
                            </>
                        )}
                        <span className="text-gray-900 dark:text-white font-medium truncate max-w-[260px]">{u.name}</span>
                    </nav>
                </div>
            </div>

            {/* HERO */}
            <div className="relative h-[420px] w-full overflow-hidden bg-gradient-to-br from-primary/20 to-blue-500/20">
                {u.cover_image_url && (
                    <Image src={u.cover_image_url} alt={u.name} fill priority className="object-cover" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />

                <div className="absolute inset-x-0 bottom-0 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10 text-white">
                    <div className="flex items-center gap-3 mb-3 flex-wrap">
                        {country && (
                            <span className="inline-flex items-center gap-1.5 bg-white/15 backdrop-blur-md border border-white/20 px-3 py-1 rounded-full text-xs font-semibold">
                                <span>{country.flag}</span> {country.name}
                            </span>
                        )}
                        {u.university_type && (
                            <span className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-bold">
                                {u.university_type}
                            </span>
                        )}
                        {(u.stream_codes || []).map((s) => (
                            <span key={s} className="bg-white/15 backdrop-blur-md border border-white/20 px-3 py-1 rounded-full text-xs font-semibold capitalize">
                                {s.replace("-", " ")}
                            </span>
                        ))}
                    </div>

                    <h1 className="text-3xl md:text-5xl font-black mb-3 font-mont leading-tight">{u.name}</h1>
                    <div className="flex items-center gap-4 text-sm text-white/90 flex-wrap">
                        {(u.city || u.address) && (
                            <span className="inline-flex items-center gap-1"><MapPin className="w-4 h-4" /> {u.city || u.address}</span>
                        )}
                        {u.established_year && (
                            <span className="inline-flex items-center gap-1"><Calendar className="w-4 h-4" /> Est. {u.established_year}</span>
                        )}
                        {u.ranking_text && (
                            <span className="inline-flex items-center gap-1"><Award className="w-4 h-4" /> {u.ranking_text}</span>
                        )}
                    </div>
                </div>
            </div>

            <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
                <div className="grid lg:grid-cols-[1fr_360px] gap-8">
                    <div className="space-y-8">
                        {/* Quick stat cards */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                            <Stat icon={Building2} label="Type" value={u.university_type || "—"} />
                            <Stat icon={Shield} label="Affiliation" value={u.affiliation || "—"} />
                            <Stat icon={GraduationCap} label="Programs" value={totalPrograms ? `${totalPrograms}+` : "Multiple"} />
                            <Stat icon={Bed} label={u.bed_capacity ? "Bed capacity" : "Tuition"} value={u.bed_capacity || u.tuition_range || "—"} />
                        </div>

                        {u.description && (
                            <Section title="About">
                                <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">{u.description}</p>
                            </Section>
                        )}

                        {u.highlights && u.highlights.length > 0 && (
                            <Section title="Highlights">
                                <div className="grid sm:grid-cols-2 gap-2">
                                    {u.highlights.map((h, i) => (
                                        <div key={i} className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
                                            <CheckCircle2 className="w-4 h-4 mt-0.5 text-primary flex-shrink-0" />
                                            <span>{h}</span>
                                        </div>
                                    ))}
                                </div>
                            </Section>
                        )}

                        {(u.programs_bachelor?.length || u.programs_pg?.length || u.programs) && (
                            <Section title="Programs offered">
                                {u.programs_bachelor && u.programs_bachelor.length > 0 && (
                                    <ProgramList title="Bachelors / UG" items={u.programs_bachelor} />
                                )}
                                {u.programs_pg && u.programs_pg.length > 0 && (
                                    <ProgramList title="Postgraduate / PG" items={u.programs_pg} />
                                )}
                                {u.programs && Object.entries(u.programs as Record<string, string[]>).map(([level, list]) => (
                                    <ProgramList key={level} title={level} items={list} />
                                ))}
                            </Section>
                        )}

                        {u.facilities && u.facilities.length > 0 && (
                            <Section title="Facilities">
                                <div className="flex flex-wrap gap-2">
                                    {u.facilities.map((f) => (
                                        <span key={f} className="px-3 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium">
                                            {f}
                                        </span>
                                    ))}
                                </div>
                            </Section>
                        )}

                        {u.recognised_by && u.recognised_by.length > 0 && (
                            <Section title="Recognized by">
                                <div className="flex flex-wrap gap-2">
                                    {u.recognised_by.map((r) => (
                                        <span key={r} className="px-3 py-1.5 bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300 rounded-full text-sm font-medium flex items-center gap-1.5">
                                            <Shield className="w-3.5 h-3.5 text-primary" /> {r}
                                        </span>
                                    ))}
                                </div>
                            </Section>
                        )}

                        {u.hospital_address && (
                            <Section title="Hospital affiliation">
                                <p className="flex items-start gap-2 text-gray-700 dark:text-gray-300">
                                    <Hospital className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                                    {u.hospital_address}
                                </p>
                            </Section>
                        )}

                        {(u.eligibility || u.application_deadline || u.language_requirements || u.intake_info) && (
                            <Section title="Admission details">
                                <dl className="grid sm:grid-cols-2 gap-4">
                                    {u.eligibility && <DD label="Eligibility" value={u.eligibility} />}
                                    {u.intake_info && <DD label="Intake" value={u.intake_info} />}
                                    {u.application_deadline && <DD label="Deadline" value={u.application_deadline} />}
                                    {u.language_requirements && <DD label="Language requirements" value={u.language_requirements} />}
                                    {u.tuition_range && <DD label="Tuition fees" value={u.tuition_range} />}
                                    {u.scholarship_info && <DD label="Scholarships" value={u.scholarship_info} />}
                                </dl>
                            </Section>
                        )}

                        {u.gallery_images && u.gallery_images.length > 0 && (
                            <Section title="Gallery">
                                <GalleryLightbox images={u.gallery_images} />
                            </Section>
                        )}

                        {u.additional_info && (
                            <Section title="Additional info">
                                <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">{u.additional_info}</p>
                            </Section>
                        )}
                    </div>

                    <aside className="space-y-6">
                        <div className="bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 sticky top-32">
                            <h3 className="font-bold text-gray-900 dark:text-white mb-4 font-mont">Apply through Dreamer&apos;s Way</h3>
                            <Link href={`/contact?intent=apply&university=${u.slug}`}>
                                <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold">
                                    Get Application Help
                                </Button>
                            </Link>
                            {u.website_url && (
                                <a href={u.website_url} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 mt-3 text-sm text-gray-600 dark:text-gray-400 hover:text-primary">
                                    <Globe className="w-4 h-4" /> Visit official website
                                </a>
                            )}

                            <div className="mt-6 pt-6 border-t border-gray-100 dark:border-gray-800 space-y-2 text-sm">
                                {u.contact_phone && (
                                    <a href={`tel:${u.contact_phone}`} className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-primary">
                                        <Phone className="w-4 h-4 text-primary" /> {u.contact_phone}
                                    </a>
                                )}
                                {u.contact_email && (
                                    <a href={`mailto:${u.contact_email}`} className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-primary">
                                        <Mail className="w-4 h-4 text-primary" /> {u.contact_email}
                                    </a>
                                )}
                                {u.address && (
                                    <p className="flex items-start gap-2 text-gray-600 dark:text-gray-400">
                                        <MapPin className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" /> {u.address}
                                    </p>
                                )}
                            </div>
                        </div>

                        {relatedFiltered.length > 0 && (
                            <div>
                                <h3 className="font-bold text-gray-900 dark:text-white mb-3 font-mont">Similar universities</h3>
                                <div className="space-y-3">
                                    {relatedFiltered.map((r) => (
                                        <Link key={r.id} href={`/universities/${r.slug}`} className="block bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-xl p-3 hover:border-primary hover:shadow-md transition-all">
                                            <div className="font-semibold text-sm text-gray-900 dark:text-white line-clamp-1">{r.name}</div>
                                            <div className="text-xs text-gray-500 dark:text-gray-400 line-clamp-1">{r.city || r.address}</div>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        )}
                    </aside>
                </div>

                <div className="mt-16">
                    <ContactForm defaultCountry={u.country_code} defaultStream={u.stream_codes?.[0]} />
                </div>
            </main>

            <Footer />
        </div>
    );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
    return (
        <section className="bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 md:p-7">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-4 font-mont">{title}</h2>
            {children}
        </section>
    );
}

function Stat({ icon: Icon, label, value }: { icon: any; label: string; value: string }) {
    return (
        <div className="bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-xl p-4">
            <Icon className="w-5 h-5 text-primary mb-1.5" />
            <div className="text-xs text-gray-500 dark:text-gray-400 font-medium">{label}</div>
            <div className="font-bold text-gray-900 dark:text-white text-sm line-clamp-1" title={value}>{value}</div>
        </div>
    );
}

function ProgramList({ title, items }: { title: string; items: string[] }) {
    return (
        <div className="mb-4 last:mb-0">
            <div className="text-sm font-bold text-primary mb-2 flex items-center gap-1.5">
                <Stethoscope className="w-4 h-4" /> {title}
            </div>
            <div className="flex flex-wrap gap-2">
                {items.map((it) => (
                    <span key={it} className="px-3 py-1 bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300 rounded-full text-sm">
                        {it}
                    </span>
                ))}
            </div>
        </div>
    );
}

function DD({ label, value }: { label: string; value: string }) {
    return (
        <div>
            <dt className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">{label}</dt>
            <dd className="text-sm text-gray-700 dark:text-gray-300 mt-1">{value}</dd>
        </div>
    );
}
