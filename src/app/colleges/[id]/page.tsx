import type { Metadata } from "next";
import { supabase } from "@/lib/supabaseClient";
import { College } from "@/types";
import { Navigation } from "@/components/navigation";
import Footer from "@/components/sections/Footer";
import Image from "next/image";
import Link from "next/link";
import {
    MapPin, Globe, Mail, Phone, Building2, Bed, CheckCircle2,
    Calendar, Award, GraduationCap, Stethoscope, Star, Shield,
    Route, Landmark, Hospital, ChevronRight, Home, ArrowLeft
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { notFound } from "next/navigation";
import GalleryLightbox from "@/components/GalleryLightbox";

export const revalidate = 0;

export default async function CollegeDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    let college: College | null = null;

    try {
        const { data, error } = await supabase
            .from('colleges')
            .select('*')
            .eq('id', id)
            .single();

        if (data) college = data;
        if (error) console.error("Error fetching college:", error);
    } catch (err) {
        console.error("Fetch error:", err);
    }

    if (!college) {
        return notFound();
    }

    const totalPrograms =
        (college.programs_bachelor?.length || 0) +
        (college.programs_pg?.length || 0);
    const recognitionCount =
        (college.recognised_by?.length || 0) + (college.affiliation ? 1 : 0);

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-black flex flex-col">
            <Navigation />

            {/* Breadcrumbs */}
            <div className="bg-white dark:bg-gray-950 border-b border-gray-200 dark:border-gray-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
                    <nav className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                        <Link href="/" className="flex items-center hover:text-primary transition-colors">
                            <Home className="w-4 h-4 mr-1" />
                            Home
                        </Link>
                        <ChevronRight className="w-4 h-4 mx-2 text-gray-400" />
                        <Link href="/colleges" className="hover:text-primary transition-colors">
                            Colleges
                        </Link>
                        <ChevronRight className="w-4 h-4 mx-2 text-gray-400" />
                        <span className="text-gray-900 dark:text-white font-medium truncate max-w-[200px] md:max-w-md">
                            {college.name}
                        </span>
                    </nav>
                </div>
            </div>

            {/* Hero Section */}
            <div className="relative h-[480px] w-full overflow-hidden">
                <Image
                    src={college.cover_image_url || '/placeholder-college.jpg'}
                    alt={college.name}
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />

                <div className="absolute bottom-0 left-0 right-0 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
                    <div className="flex flex-col md:flex-row md:items-end gap-6">
                        {college.logo_url && (
                            <div className="bg-white rounded-2xl p-3 shadow-xl h-28 w-28 md:h-32 md:w-32 flex-shrink-0">
                                <Image
                                    src={college.logo_url}
                                    alt="Logo"
                                    width={128}
                                    height={128}
                                    className="object-contain w-full h-full"
                                />
                            </div>
                        )}
                        <div className="flex-1">
                            <div className="flex flex-wrap items-center gap-2 mb-3">
                                <span className="inline-flex items-center gap-1.5 bg-white/15 backdrop-blur-sm border border-white/20 text-white px-3 py-1.5 rounded-full text-sm font-semibold">
                                    <Building2 className="w-3.5 h-3.5" />
                                    {college.college_type}
                                </span>
                                <span className="inline-flex items-center gap-1.5 bg-white/15 backdrop-blur-sm border border-white/20 text-white px-3 py-1.5 rounded-full text-sm font-semibold">
                                    <Landmark className="w-3.5 h-3.5" />
                                    {college.affiliation}
                                </span>
                                {college.is_featured && (
                                    <span className="inline-flex items-center gap-1.5 bg-primary/90 text-primary-foreground px-3 py-1.5 rounded-full text-sm font-bold">
                                        <Star className="w-3.5 h-3.5 fill-current" />
                                        Featured
                                    </span>
                                )}
                            </div>
                            <h1 className="text-3xl md:text-5xl font-black text-white mb-3 drop-shadow-lg leading-tight">
                                {college.name}
                            </h1>
                            <div className="inline-flex items-center gap-2 text-white/90 bg-black/30 backdrop-blur-sm rounded-lg px-3 py-2 text-sm">
                                <MapPin className="w-4 h-4 text-primary flex-shrink-0" />
                                {college.address}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Quick Stats Bar */}
            <div className="bg-white dark:bg-gray-950 border-b border-gray-200 dark:border-gray-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-900">
                            <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-lg flex-shrink-0">
                                <Calendar className="w-5 h-5 text-primary" />
                            </div>
                            <div>
                                <p className="text-lg font-bold text-gray-900 dark:text-white leading-tight">
                                    {college.established_year || 'N/A'}
                                </p>
                                <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">Established</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-900">
                            <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-lg flex-shrink-0">
                                <Bed className="w-5 h-5 text-primary" />
                            </div>
                            <div>
                                <p className="text-lg font-bold text-gray-900 dark:text-white leading-tight">
                                    {college.bed_capacity || 'N/A'}
                                </p>
                                <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">Bed Capacity</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-900">
                            <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-lg flex-shrink-0">
                                <GraduationCap className="w-5 h-5 text-primary" />
                            </div>
                            <div>
                                <p className="text-lg font-bold text-gray-900 dark:text-white leading-tight">
                                    {totalPrograms || 'N/A'}
                                </p>
                                <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">Programs</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-900">
                            <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-lg flex-shrink-0">
                                <Award className="w-5 h-5 text-primary" />
                            </div>
                            <div>
                                <p className="text-lg font-bold text-gray-900 dark:text-white leading-tight">
                                    {recognitionCount || 'N/A'}
                                </p>
                                <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">Recognitions</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex-1 w-full">
                <div className="mb-6">
                    <Link href="/colleges">
                        <Button variant="ghost" className="text-gray-600 hover:text-primary -ml-4">
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Back to Colleges
                        </Button>
                    </Link>
                </div>
                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Main Content - Left Column */}
                    <div className="lg:col-span-2 space-y-6">

                        {/* About the College */}
                        {college.description && (
                            <section className="bg-white dark:bg-gray-900 rounded-2xl p-6 md:p-8 border border-gray-100 dark:border-gray-800">
                                <div className="flex items-center gap-3 mb-5">
                                    <div className="w-1 h-6 bg-primary rounded-full"></div>
                                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">About the College</h2>
                                </div>
                                <div className="text-gray-600 dark:text-gray-300 leading-relaxed whitespace-pre-line">
                                    {college.description}
                                </div>
                            </section>
                        )}

                        {/* Recognitions & Affiliations */}
                        {(college.affiliation || (college.recognised_by && college.recognised_by.length > 0)) && (
                            <section className="bg-white dark:bg-gray-900 rounded-2xl p-6 md:p-8 border border-gray-100 dark:border-gray-800">
                                <div className="flex items-center gap-3 mb-5">
                                    <div className="w-1 h-6 bg-primary rounded-full"></div>
                                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">Recognitions & Affiliations</h2>
                                </div>
                                <div className="space-y-3">
                                    {college.affiliation && (
                                        <div className="flex items-start gap-3 p-4 rounded-xl bg-primary/5 border border-primary/10">
                                            <div className="flex items-center justify-center w-9 h-9 bg-primary/10 rounded-lg flex-shrink-0 mt-0.5">
                                                <Landmark className="w-4.5 h-4.5 text-primary" />
                                            </div>
                                            <div>
                                                <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-0.5">Affiliated University</p>
                                                <p className="text-gray-900 dark:text-white font-semibold">{college.affiliation}</p>
                                            </div>
                                        </div>
                                    )}
                                    {college.recognised_by && college.recognised_by.length > 0 && (
                                        <div className="space-y-2">
                                            {college.recognised_by.map((item, index) => (
                                                <div key={index} className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                                                    <div className="flex items-center justify-center w-8 h-8 bg-primary/10 rounded-lg flex-shrink-0">
                                                        <Shield className="w-4 h-4 text-primary" />
                                                    </div>
                                                    <span className="text-gray-800 dark:text-gray-200 font-medium">{item}</span>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </section>
                        )}

                        {/* Why Choose Us - Highlights */}
                        {college.highlights && college.highlights.length > 0 && (
                            <section className="bg-white dark:bg-gray-900 rounded-2xl p-6 md:p-8 border border-gray-100 dark:border-gray-800">
                                <div className="flex items-center gap-3 mb-5">
                                    <div className="w-1 h-6 bg-primary rounded-full"></div>
                                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">Why Choose Us</h2>
                                </div>
                                <ul className="grid sm:grid-cols-2 gap-3">
                                    {college.highlights.map((highlight, index) => (
                                        <li key={index} className="flex items-start gap-2.5 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                                            <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                                            <span className="text-gray-700 dark:text-gray-300 font-medium leading-relaxed">{highlight}</span>
                                        </li>
                                    ))}
                                </ul>
                            </section>
                        )}

                        {/* Academic Programs */}
                        {((college.programs_bachelor && college.programs_bachelor.length > 0) ||
                            (college.programs_pg && college.programs_pg.length > 0)) && (
                                <section className="bg-white dark:bg-gray-900 rounded-2xl p-6 md:p-8 border border-gray-100 dark:border-gray-800">
                                    <div className="flex items-center gap-3 mb-5">
                                        <div className="w-1 h-6 bg-primary rounded-full"></div>
                                        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Academic Programs</h2>
                                    </div>
                                    <div className="grid md:grid-cols-2 gap-5">
                                        {college.programs_bachelor && college.programs_bachelor.length > 0 && (
                                            <div className="rounded-xl border border-gray-200 dark:border-gray-700 p-5">
                                                <h3 className="text-base font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                                                    <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                                                        <GraduationCap className="w-4 h-4 text-primary" />
                                                    </div>
                                                    Bachelor&apos;s Programs
                                                </h3>
                                                <ul className="space-y-2">
                                                    {college.programs_bachelor.map((program, index) => (
                                                        <li key={index} className="flex items-center gap-2 text-gray-700 dark:text-gray-300 text-sm">
                                                            <CheckCircle2 className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                                                            <span className="font-medium">{program}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}
                                        {college.programs_pg && college.programs_pg.length > 0 && (
                                            <div className="rounded-xl border border-gray-200 dark:border-gray-700 p-5">
                                                <h3 className="text-base font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                                                    <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                                                        <Award className="w-4 h-4 text-primary" />
                                                    </div>
                                                    Postgraduate Programs
                                                </h3>
                                                <ul className="space-y-2">
                                                    {college.programs_pg.map((program, index) => (
                                                        <li key={index} className="flex items-center gap-2 text-gray-700 dark:text-gray-300 text-sm">
                                                            <CheckCircle2 className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                                                            <span className="font-medium">{program}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}
                                    </div>
                                </section>
                            )}

                        {/* Campus Facilities */}
                        {college.facilities && college.facilities.length > 0 && (
                            <section className="bg-white dark:bg-gray-900 rounded-2xl p-6 md:p-8 border border-gray-100 dark:border-gray-800">
                                <div className="flex items-center gap-3 mb-5">
                                    <div className="w-1 h-6 bg-primary rounded-full"></div>
                                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">Campus Facilities</h2>
                                </div>
                                <div className="flex flex-wrap gap-2.5">
                                    {college.facilities.map((facility, index) => (
                                        <span
                                            key={index}
                                            className="inline-flex items-center gap-2 px-4 py-2.5 bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg border border-gray-200 dark:border-gray-700 text-sm font-medium hover:border-primary/30 hover:bg-primary/5 transition-colors"
                                        >
                                            <Stethoscope className="w-4 h-4 text-primary" />
                                            {facility}
                                        </span>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* Gallery */}
                        {college.gallery_images && college.gallery_images.length > 0 && (
                            <GalleryLightbox images={college.gallery_images} collegeName={college.name} />
                        )}

                        {/* Additional Information */}
                        {college.additional_info && (
                            <section className="bg-white dark:bg-gray-900 rounded-2xl p-6 md:p-8 border border-gray-100 dark:border-gray-800">
                                <div className="flex items-center gap-3 mb-5">
                                    <div className="w-1 h-6 bg-primary rounded-full"></div>
                                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">Additional Information</h2>
                                </div>
                                <div className="text-gray-600 dark:text-gray-300 whitespace-pre-line leading-relaxed">
                                    {college.additional_info}
                                </div>
                            </section>
                        )}
                    </div>

                    {/* Sidebar - Right Column */}
                    <div className="space-y-6">
                        {/* Contact Card */}
                        <div className="sticky top-24 space-y-6">
                            <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-100 dark:border-gray-800">
                                <div className="flex items-center gap-3 mb-5">
                                    <div className="w-1 h-6 bg-primary rounded-full"></div>
                                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">Get in Touch</h3>
                                </div>
                                <div className="space-y-1">
                                    {college.contact_phone && (
                                        <a
                                            href={`tel:${college.contact_phone}`}
                                            className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors group"
                                        >
                                            <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-lg flex-shrink-0">
                                                <Phone className="w-4.5 h-4.5 text-primary" />
                                            </div>
                                            <div>
                                                <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">Phone</p>
                                                <p className="text-gray-900 dark:text-white font-semibold text-sm group-hover:text-primary transition-colors">
                                                    {college.contact_phone}
                                                </p>
                                            </div>
                                        </a>
                                    )}

                                    {college.contact_email && (
                                        <a
                                            href={`mailto:${college.contact_email}`}
                                            className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors group"
                                        >
                                            <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-lg flex-shrink-0">
                                                <Mail className="w-4.5 h-4.5 text-primary" />
                                            </div>
                                            <div className="min-w-0">
                                                <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">Email</p>
                                                <p className="text-gray-900 dark:text-white font-semibold text-sm break-all group-hover:text-primary transition-colors">
                                                    {college.contact_email}
                                                </p>
                                            </div>
                                        </a>
                                    )}

                                    {college.website_url && (
                                        <a
                                            href={college.website_url.startsWith('http') ? college.website_url : `https://${college.website_url}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors group"
                                        >
                                            <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-lg flex-shrink-0">
                                                <Globe className="w-4.5 h-4.5 text-primary" />
                                            </div>
                                            <div>
                                                <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">Website</p>
                                                <p className="text-gray-900 dark:text-white font-semibold text-sm group-hover:text-primary transition-colors">
                                                    Visit Website
                                                </p>
                                            </div>
                                        </a>
                                    )}
                                </div>

                                <div className="mt-5 pt-5 border-t border-gray-100 dark:border-gray-800">
                                    <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-5 rounded-xl transition-colors">
                                        Apply Now
                                    </Button>
                                </div>
                            </div>

                            {/* Location & Access */}
                            {(college.hospital_address ||
                                (college.nearest_borders && college.nearest_borders.length > 0) ||
                                (college.access_modes && college.access_modes.length > 0)) && (
                                    <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-100 dark:border-gray-800">
                                        <div className="flex items-center gap-3 mb-5">
                                            <div className="w-1 h-6 bg-primary rounded-full"></div>
                                            <h3 className="text-lg font-bold text-gray-900 dark:text-white">Location & Access</h3>
                                        </div>
                                        <div className="space-y-4">
                                            {college.hospital_address && (
                                                <div className="flex items-start gap-3 p-3 rounded-xl bg-gray-50 dark:bg-gray-800">
                                                    <div className="flex items-center justify-center w-9 h-9 bg-primary/10 rounded-lg flex-shrink-0 mt-0.5">
                                                        <Hospital className="w-4 h-4 text-primary" />
                                                    </div>
                                                    <div>
                                                        <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-0.5">Hospital Address</p>
                                                        <p className="text-gray-800 dark:text-gray-200 text-sm font-medium">{college.hospital_address}</p>
                                                    </div>
                                                </div>
                                            )}

                                            {college.nearest_borders && college.nearest_borders.length > 0 && (
                                                <div>
                                                    <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2">Nearest Borders</p>
                                                    <div className="space-y-2">
                                                        {college.nearest_borders.map((border, index) => (
                                                            <div key={index} className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                                                                <div className="flex items-center justify-center w-8 h-8 bg-primary/10 rounded-lg flex-shrink-0">
                                                                    <MapPin className="w-3.5 h-3.5 text-primary" />
                                                                </div>
                                                                <div className="flex-1">
                                                                    <p className="text-gray-800 dark:text-gray-200 text-sm font-medium">{border.name}</p>
                                                                </div>
                                                                <span className="text-xs font-semibold text-primary bg-primary/10 px-2 py-1 rounded-md">
                                                                    {border.distance}
                                                                </span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}

                                            {college.access_modes && college.access_modes.length > 0 && (
                                                <div>
                                                    <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2">How to Reach</p>
                                                    <div className="space-y-2">
                                                        {college.access_modes.map((mode, index) => (
                                                            <div key={index} className="flex items-start gap-3 p-2.5 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                                                                <div className="flex items-center justify-center w-8 h-8 bg-primary/10 rounded-lg flex-shrink-0 mt-0.5">
                                                                    <Route className="w-3.5 h-3.5 text-primary" />
                                                                </div>
                                                                <div>
                                                                    <p className="text-gray-800 dark:text-gray-200 text-sm font-semibold">{mode.mode}</p>
                                                                    <p className="text-gray-500 dark:text-gray-400 text-xs mt-0.5">{mode.description}</p>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )}
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
