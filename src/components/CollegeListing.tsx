"use client";

import { useState, useMemo } from 'react';
import { College } from '@/types';
import { CollegeCard } from '@/components/CollegeCard';
import { FilterBar } from '@/components/FilterBar';

interface CollegeListingProps {
    initialColleges: College[];
}

export default function CollegeListing({ initialColleges }: CollegeListingProps) {
    const [search, setSearch] = useState('');
    const [selectedAffiliations, setSelectedAffiliations] = useState<string[]>([]);
    const [selectedTypes, setSelectedTypes] = useState<string[]>([]);

    const handleAffiliationChange = (value: string, checked: boolean) => {
        if (checked) {
            setSelectedAffiliations([...selectedAffiliations, value]);
        } else {
            setSelectedAffiliations(selectedAffiliations.filter((a) => a !== value));
        }
    };

    const handleTypeChange = (value: string, checked: boolean) => {
        if (checked) {
            setSelectedTypes([...selectedTypes, value]);
        } else {
            setSelectedTypes(selectedTypes.filter((t) => t !== value));
        }
    };

    const filteredColleges = useMemo(() => {
        return initialColleges.filter(college => {
            // Search Filter
            const matchesSearch = college.name.toLowerCase().includes(search.toLowerCase()) ||
                college.address.toLowerCase().includes(search.toLowerCase());

            // Affiliation Filter
            const matchesAffiliation = selectedAffiliations.length === 0 ||
                (selectedAffiliations.includes("Other") && !["Tribhuvan University (TU)", "Kathmandu University (KU)", "Autonomous"].includes(college.affiliation)) ||
                selectedAffiliations.includes(college.affiliation);

            // Type Filter
            const matchesType = selectedTypes.length === 0 || selectedTypes.includes(college.college_type);

            return matchesSearch && matchesAffiliation && matchesType;
        });
    }, [initialColleges, search, selectedAffiliations, selectedTypes]);

    return (
        <div className="grid lg:grid-cols-4 gap-8">
            {/* Sidebar Filters */}
            <div className="lg:col-span-1">
                <div className="sticky top-24">
                    <FilterBar
                        onSearchChange={setSearch}
                        selectedAffiliations={selectedAffiliations}
                        onAffiliationChange={handleAffiliationChange}
                        selectedTypes={selectedTypes}
                        onTypeChange={handleTypeChange}
                    />
                </div>
            </div>

            {/* Results Grid */}
            <div className="lg:col-span-3">
                <div className="mb-6 flex items-center justify-between">
                    <h2 className="text-xl font-bold text-gray-900">
                        Found {filteredColleges.length} Colleges
                    </h2>
                </div>

                {filteredColleges.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {filteredColleges.map(college => (
                            <CollegeCard key={college.id} college={college} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 bg-white rounded-xl border border-gray-100">
                        <p className="text-gray-500 text-lg">No colleges match your criteria.</p>
                        <button
                            onClick={() => { setSearch(''); setSelectedAffiliations([]); setSelectedTypes([]); }}
                            className="mt-4 text-primary hover:underline font-medium"
                        >
                            Clear Filter
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
