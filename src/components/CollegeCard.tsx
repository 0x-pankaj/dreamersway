import Link from 'next/link';
import Image from 'next/image';
import { MapPin, Building2, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { College } from '@/types';

interface CollegeCardProps {
    college: College;
}

export function CollegeCard({ college }: CollegeCardProps) {
    return (
        <div className="group bg-white dark:bg-black rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-800 hover:border-primary/20 hover:shadow-xl transition-all duration-300">
            <div className="relative h-64 overflow-hidden">
                <Image
                    src={college.cover_image_url || '/placeholder-college.jpg'}
                    alt={college.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60" />

                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-primary shadow-sm border border-primary/10">
                    {college.college_type}
                </div>

                {college.logo_url && (
                    <div className="absolute -bottom-6 left-6 w-16 h-16 bg-white rounded-lg shadow-lg p-1 border border-gray-100 overflow-hidden">
                        <Image
                            src={college.logo_url}
                            alt="Logo"
                            width={64}
                            height={64}
                            className="object-contain w-full h-full"
                        />
                    </div>
                )}
            </div>

            <div className="pt-8 pb-6 px-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 line-clamp-1 group-hover:text-primary transition-colors">
                    {college.name}
                </h3>

                <div className="space-y-3 mb-6">
                    <div className="flex items-center text-gray-600 dark:text-gray-400 text-sm">
                        <MapPin className="w-4 h-4 mr-2 text-primary" />
                        <span className="line-clamp-1">{college.address}</span>
                    </div>
                    <div className="flex items-center text-gray-600 dark:text-gray-400 text-sm">
                        <Building2 className="w-4 h-4 mr-2 text-primary" />
                        <span className="line-clamp-1">{college.affiliation}</span>
                    </div>
                    {college.bed_capacity && (
                        <div className="flex items-center text-gray-600 dark:text-gray-400 text-sm">
                            <span className="font-medium mr-2">Beds:</span> {college.bed_capacity}
                        </div>
                    )}
                </div>

                <div className="flex items-center justify-between mt-auto">
                    <div className="flex flex-wrap gap-2 mb-4">
                        {college.facilities && college.facilities.length > 0 && (
                            <>
                                {college.facilities.slice(0, 3).map((facility, index) => (
                                    <span key={index} className="text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded-full flex items-center">
                                        <CheckCircle2 className="w-3 h-3 mr-1" /> {facility}
                                    </span>
                                ))}
                                {college.facilities.length > 3 && (
                                    <span className="text-xs text-gray-400 px-2 py-1">+{college.facilities.length - 3} more</span>
                                )}
                            </>
                        )}
                    </div>

                    <Link href={`/colleges/${college.id}`}>
                        <Button variant="outline" size="sm" className="border-primary/30 text-primary hover:bg-primary hover:text-white">
                            View Details
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
