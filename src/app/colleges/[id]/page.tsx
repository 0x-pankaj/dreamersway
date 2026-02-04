
import { supabase } from "@/lib/supabaseClient";
import { College } from "@/types";
import { Navigation } from "@/components/navigation";
import Footer from "@/components/sections/Footer";
import Image from "next/image";
import { MapPin, Globe, Mail, Phone, Building2, Bed, CheckCircle2, Calendar, Users, Award, GraduationCap, Stethoscope, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { notFound } from "next/navigation";

export const revalidate = 0;

interface PageProps {
    params: {
        id: string;
    };
}

// NOTE: In Next.js 15, params is a Promise. We must await it.
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

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-black dark:via-black dark:to-gray-900 flex flex-col">
            <Navigation />

            {/* Enhanced Hero Section */}
            <div className="relative h-[500px] w-full overflow-hidden">
                <Image
                    src={college.cover_image_url || '/placeholder-college.jpg'}
                    alt={college.name}
                    fill
                    className="object-cover"
                    priority
                />
                {/* Multi-layer gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-black/70" />
                <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent" />

                <div className="absolute bottom-0 left-0 right-0 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
                    <div className="flex flex-col md:flex-row md:items-end gap-8">
                        {college.logo_url && (
                            <div className="relative group">
                                <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-blue-500 rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-300"></div>
                                <div className="relative bg-white/95 backdrop-blur-sm p-3 rounded-2xl shadow-2xl h-36 w-36 flex-shrink-0">
                                    <Image
                                        src={college.logo_url}
                                        alt="Logo"
                                        width={144}
                                        height={144}
                                        className="object-contain w-full h-full"
                                    />
                                </div>
                            </div>
                        )}
                        <div className="flex-1">
                            <div className="flex flex-wrap items-center gap-3 mb-4">
                                <span className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md border border-white/30 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                                    <Building2 className="w-4 h-4" />
                                    {college.college_type}
                                </span>
                                <span className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md border border-white/30 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                                    <GraduationCap className="w-4 h-4" />
                                    {college.affiliation}
                                </span>
                                {college.is_featured && (
                                    <span className="inline-flex items-center gap-2 bg-amber-500/90 backdrop-blur-md text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                                        <Star className="w-4 h-4 fill-white" />
                                        Featured
                                    </span>
                                )}
                            </div>
                            <h1 className="text-4xl md:text-6xl font-black text-white mb-4 drop-shadow-2xl leading-tight">{college.name}</h1>
                            <div className="flex items-center text-white/90 text-lg backdrop-blur-sm bg-black/20 rounded-lg px-4 py-2 inline-flex gap-2 shadow-lg">
                                <MapPin className="w-5 h-5 text-primary" />
                                {college.address}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Quick Stats Bar */}
            <div className="bg-white dark:bg-black border-b border-gray-200 dark:border-gray-800 shadow-sm -mt-1">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        <div className="text-center">
                            <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-xl mb-2">
                                <Calendar className="w-6 h-6 text-primary" />
                            </div>
                            <p className="text-2xl font-bold text-gray-900 dark:text-white">{college.established_year || 'N/A'}</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">Established</p>
                        </div>
                        <div className="text-center">
                            <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-500/10 rounded-xl mb-2">
                                <Bed className="w-6 h-6 text-blue-500" />
                            </div>
                            <p className="text-2xl font-bold text-gray-900 dark:text-white">{college.bed_capacity || 'N/A'}</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">Bed Capacity</p>
                        </div>
                        <div className="text-center">
                            <div className="inline-flex items-center justify-center w-12 h-12 bg-green-500/10 rounded-xl mb-2">
                                <Users className="w-6 h-6 text-green-500" />
                            </div>
                            <p className="text-2xl font-bold text-gray-900 dark:text-white">{college.facilities?.length || 0}</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">Facilities</p>
                        </div>
                        <div className="text-center">
                            <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-500/10 rounded-xl mb-2">
                                <Award className="w-6 h-6 text-purple-500" />
                            </div>
                            <p className="text-2xl font-bold text-gray-900 dark:text-white">{(college.recognised_by?.length || 0) + 1}</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">Recognitions</p>
                        </div>
                    </div>
                </div>
            </div>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 flex-1 w-full">
                <div className="grid lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-8">
                        {/* Description */}
                        {college.description && (
                            <section className="bg-white dark:bg-gray-900 rounded-3xl p-8 shadow-lg border border-gray-100 dark:border-gray-800 hover:shadow-xl transition-shadow duration-300">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-1 h-8 bg-gradient-to-b from-primary to-blue-500 rounded-full"></div>
                                    <h2 className="text-3xl font-black text-gray-900 dark:text-white">About the College</h2>
                                </div>
                                <div className="prose prose-lg max-w-none text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
                                    {college.description}
                                </div>
                            </section>
                        )}

                        {/* Highlights */}
                        {college.highlights && college.highlights.length > 0 && (
                            <section className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-gray-900 dark:to-gray-900 rounded-3xl p-8 shadow-lg border border-amber-200 dark:border-gray-800 hover:shadow-xl transition-shadow duration-300">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-1 h-8 bg-gradient-to-b from-amber-500 to-orange-500 rounded-full"></div>
                                    <h2 className="text-3xl font-black text-gray-900 dark:text-white">Why Choose Us</h2>
                                </div>
                                <ul className="grid sm:grid-cols-2 gap-4">
                                    {college.highlights.map((highlight, index) => (
                                        <li key={index} className="flex items-start gap-3 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-5 rounded-2xl border border-amber-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-all duration-200 hover:scale-105">
                                            <CheckCircle2 className="w-6 h-6 text-amber-600 flex-shrink-0 mt-0.5" />
                                            <span className="text-gray-800 dark:text-gray-200 font-semibold leading-relaxed">{highlight}</span>
                                        </li>
                                    ))}
                                </ul>
                            </section>
                        )}

                        {/* Facilities */}
                        {college.facilities && college.facilities.length > 0 && (
                            <section className="bg-white dark:bg-gray-900 rounded-3xl p-8 shadow-lg border border-gray-100 dark:border-gray-800 hover:shadow-xl transition-shadow duration-300">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-1 h-8 bg-gradient-to-b from-green-500 to-emerald-500 rounded-full"></div>
                                    <h2 className="text-3xl font-black text-gray-900 dark:text-white">Campus Facilities</h2>
                                </div>
                                <div className="flex flex-wrap gap-3">
                                    {college.facilities.map((facility, index) => (
                                        <span key={index} className="group inline-flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-800 text-gray-800 dark:text-gray-200 rounded-xl border border-gray-200 dark:border-gray-700 font-semibold hover:from-green-50 hover:to-emerald-50 dark:hover:from-gray-700 dark:hover:to-gray-700 hover:border-green-300 hover:shadow-md transition-all duration-200 hover:scale-105">
                                            <Stethoscope className="w-5 h-5 text-gray-400 group-hover:text-green-600 transition-colors" />
                                            {facility}
                                        </span>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* Programs */}
                        {((college.programs_bachelor && college.programs_bachelor.length > 0) ||
                            (college.programs_pg && college.programs_pg.length > 0)) && (
                                <section className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-900 rounded-3xl p-8 shadow-lg border border-blue-200 dark:border-gray-800 hover:shadow-xl transition-shadow duration-300">
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="w-1 h-8 bg-gradient-to-b from-blue-500 to-indigo-500 rounded-full"></div>
                                        <h2 className="text-3xl font-black text-gray-900 dark:text-white">Academic Programs</h2>
                                    </div>
                                    <div className="grid md:grid-cols-2 gap-6">
                                        {college.programs_bachelor && college.programs_bachelor.length > 0 && (
                                            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 border border-blue-200 dark:border-gray-700">
                                                <h3 className="text-xl font-bold text-blue-900 dark:text-blue-400 mb-4 flex items-center gap-2">
                                                    <GraduationCap className="w-5 h-5" />
                                                    Bachelor's Programs
                                                </h3>
                                                <ul className="space-y-2">
                                                    {college.programs_bachelor.map((program, index) => (
                                                        <li key={index} className="flex items-center gap-2 text-gray-700 dark:text-gray-300 font-medium">
                                                            <CheckCircle2 className="w-4 h-4 text-blue-600 flex-shrink-0" />
                                                            {program}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}
                                        {college.programs_pg && college.programs_pg.length > 0 && (
                                            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 border border-indigo-200 dark:border-gray-700">
                                                <h3 className="text-xl font-bold text-indigo-900 dark:text-indigo-400 mb-4 flex items-center gap-2">
                                                    <Award className="w-5 h-5" />
                                                    Postgraduate Programs
                                                </h3>
                                                <ul className="space-y-2">
                                                    {college.programs_pg.map((program, index) => (
                                                        <li key={index} className="flex items-center gap-2 text-gray-700 dark:text-gray-300 font-medium">
                                                            <CheckCircle2 className="w-4 h-4 text-indigo-600 flex-shrink-0" />
                                                            {program}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}
                                    </div>
                                </section>
                            )}

                        {/* Additional Info */}
                        {college.additional_info && (
                            <section className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-3xl p-8 shadow-lg border border-purple-200 hover:shadow-xl transition-shadow duration-300">
                                <h3 className="text-2xl font-bold text-purple-900 mb-4 flex items-center gap-2">
                                    <Award className="w-6 h-6" />
                                    Additional Information
                                </h3>
                                <div className="text-purple-900 whitespace-pre-line prose-sm leading-relaxed">
                                    {college.additional_info}
                                </div>
                            </section>
                        )}
                    </div>

                    {/* Enhanced Sidebar */}
                    <div className="space-y-6">
                        {/* Contact Card */}
                        <div className="sticky top-24 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border border-gray-200 dark:border-gray-800 rounded-3xl p-8 shadow-2xl hover:shadow-3xl transition-shadow duration-300">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-1 h-8 bg-gradient-to-b from-primary to-blue-500 rounded-full"></div>
                                <h3 className="text-2xl font-black text-gray-900 dark:text-white">Get in Touch</h3>
                            </div>
                            <div className="space-y-6">
                                {college.contact_phone && (
                                    <div className="group">
                                        <a href={`tel:${college.contact_phone}`} className="flex items-start gap-4 p-4 rounded-2xl hover:bg-primary/5 transition-all duration-200 hover:scale-102">
                                            <div className="bg-gradient-to-br from-green-400 to-emerald-500 p-3 rounded-xl shrink-0 shadow-lg group-hover:shadow-xl transition-shadow">
                                                <Phone className="w-6 h-6 text-white" />
                                            </div>
                                            <div>
                                                <p className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">Call Us</p>
                                                <p className="text-gray-900 dark:text-white font-bold text-lg group-hover:text-primary transition-colors">
                                                    {college.contact_phone}
                                                </p>
                                            </div>
                                        </a>
                                    </div>
                                )}

                                {college.contact_email && (
                                    <div className="group">
                                        <a href={`mailto:${college.contact_email}`} className="flex items-start gap-4 p-4 rounded-2xl hover:bg-primary/5 transition-all duration-200 hover:scale-102">
                                            <div className="bg-gradient-to-br from-blue-400 to-indigo-500 p-3 rounded-xl shrink-0 shadow-lg group-hover:shadow-xl transition-shadow">
                                                <Mail className="w-6 h-6 text-white" />
                                            </div>
                                            <div className="min-w-0">
                                                <p className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">Email</p>
                                                <p className="text-gray-900 dark:text-white font-bold break-all group-hover:text-primary transition-colors">
                                                    {college.contact_email}
                                                </p>
                                            </div>
                                        </a>
                                    </div>
                                )}

                                {college.website_url && (
                                    <div className="group">
                                        <a href={college.website_url.startsWith('http') ? college.website_url : `https://${college.website_url}`} target="_blank" rel="noopener noreferrer" className="flex items-start gap-4 p-4 rounded-2xl hover:bg-primary/5 transition-all duration-200 hover:scale-102">
                                            <div className="bg-gradient-to-br from-purple-400 to-pink-500 p-3 rounded-xl shrink-0 shadow-lg group-hover:shadow-xl transition-shadow">
                                                <Globe className="w-6 h-6 text-white" />
                                            </div>
                                            <div>
                                                <p className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">Website</p>
                                                <p className="text-gray-900 dark:text-white font-bold group-hover:text-primary transition-colors">
                                                    Visit Website →
                                                </p>
                                            </div>
                                        </a>
                                    </div>
                                )}

                                <div className="pt-6 border-t-2 border-gray-100">
                                    <Button className="w-full bg-gradient-to-r from-primary to-blue-500 hover:from-primary/90 hover:to-blue-600 text-white font-bold py-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105">
                                        Apply Now
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
