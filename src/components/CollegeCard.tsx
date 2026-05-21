import Link from "next/link";
import Image from "next/image";
import { MapPin, Building2, CheckCircle2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { University } from "@/types";
import { countryByCode } from "@/lib/site-config";

interface CollegeCardProps {
    college: University;
}

export function CollegeCard({ college }: CollegeCardProps) {
    const country = countryByCode(college.country_code);
    return (
        <div className="group bg-white dark:bg-black rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-800 hover:border-primary/30 hover:shadow-xl transition-all duration-300 flex flex-col h-full">
            <div className="relative h-56 overflow-hidden bg-gradient-to-br from-primary/10 to-blue-500/10">
                {college.cover_image_url ? (
                    <Image
                        src={college.cover_image_url}
                        alt={college.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                        <Building2 className="w-20 h-20 text-primary/30" />
                    </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                {country && (
                    <div className="absolute top-3 left-3 inline-flex items-center gap-1.5 bg-white/95 dark:bg-black/80 backdrop-blur-md px-2.5 py-1 rounded-full text-xs font-semibold shadow-sm">
                        <span>{country.flag}</span>
                        <span className="text-gray-900 dark:text-white">{country.name}</span>
                    </div>
                )}

                {college.university_type && (
                    <div className="absolute top-3 right-3 bg-primary/90 text-primary-foreground px-2.5 py-1 rounded-full text-xs font-bold shadow">
                        {college.university_type}
                    </div>
                )}

                {college.logo_url && (
                    <div className="absolute -bottom-5 left-5 w-14 h-14 bg-white rounded-xl shadow-lg p-1 border border-gray-100 overflow-hidden">
                        <Image
                            src={college.logo_url}
                            alt="Logo"
                            width={56}
                            height={56}
                            className="object-contain w-full h-full"
                        />
                    </div>
                )}
            </div>

            <div className="pt-7 pb-5 px-5 flex flex-col flex-1">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 line-clamp-2 group-hover:text-primary transition-colors font-mont">
                    {college.name}
                </h3>

                <div className="space-y-2 mb-3 text-sm text-gray-600 dark:text-gray-400">
                    {(college.city || college.address) && (
                        <div className="flex items-start gap-2">
                            <MapPin className="w-4 h-4 mt-0.5 text-primary flex-shrink-0" />
                            <span className="line-clamp-1">{college.city || college.address}</span>
                        </div>
                    )}
                    {college.affiliation && (
                        <div className="flex items-start gap-2">
                            <Building2 className="w-4 h-4 mt-0.5 text-primary flex-shrink-0" />
                            <span className="line-clamp-1">{college.affiliation}</span>
                        </div>
                    )}
                    {college.tuition_range && (
                        <div className="text-xs font-medium text-gray-500 dark:text-gray-500">
                            <span className="text-primary font-bold">Fees:</span> {college.tuition_range}
                        </div>
                    )}
                </div>

                <div className="mt-auto pt-3 border-t border-gray-100 dark:border-gray-800">
                    {college.highlights && college.highlights.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mb-3">
                            {college.highlights.slice(0, 3).map((h, i) => (
                                <span
                                    key={i}
                                    className="text-[11px] bg-primary/10 text-primary px-2 py-0.5 rounded-full flex items-center gap-1"
                                >
                                    <CheckCircle2 className="w-3 h-3" /> {h}
                                </span>
                            ))}
                        </div>
                    )}

                    <Link href={`/universities/${college.slug || college.id}`} className="block">
                        <Button
                            size="sm"
                            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground group/btn"
                        >
                            View Details
                            <ArrowRight className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
