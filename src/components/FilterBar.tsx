"use client";
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

interface FilterBarProps {
    onSearchChange: (value: string) => void;
    selectedAffiliations: string[];
    onAffiliationChange: (value: string, checked: boolean) => void;
    selectedTypes: string[];
    onTypeChange: (value: string, checked: boolean) => void;
}

const AFFILIATIONS = [
    'Tribhuvan University (TU)',
    'Kathmandu University (KU)',
    'Autonomous',
    'Other'
];

const COLLEGE_TYPES = [
    'Government',
    'Private',
    'Community'
];

export function FilterBar({
    onSearchChange,
    selectedAffiliations,
    onAffiliationChange,
    selectedTypes,
    onTypeChange
}: FilterBarProps) {
    return (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 space-y-8">
            {/* Search */}
            <div className="space-y-3">
                <h3 className="font-semibold text-gray-900">Search Colleges</h3>
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                        placeholder="Search by name..."
                        className="pl-9 bg-gray-50 border-gray-200 focus:bg-white transition-colors"
                        onChange={(e: { target: { value: string; }; }) => onSearchChange(e.target.value)}
                    />
                </div>
            </div>

            {/* Affiliation Filter */}
            <div className="space-y-3">
                <h3 className="font-semibold text-gray-900">Affiliation</h3>
                <div className="space-y-2">
                    {AFFILIATIONS.map((aff) => (
                        <div key={aff} className="flex items-center space-x-2">
                            <Checkbox
                                id={`aff-${aff}`}
                                checked={selectedAffiliations.includes(aff)}
                                onCheckedChange={(checked: any) => onAffiliationChange(aff, checked as boolean)}
                            />
                            <Label htmlFor={`aff-${aff}`} className="text-sm text-gray-600 font-normal cursor-pointer">
                                {aff}
                            </Label>
                        </div>
                    ))}
                </div>
            </div>

            {/* Type Filter */}
            <div className="space-y-3">
                <h3 className="font-semibold text-gray-900">College Type</h3>
                <div className="space-y-2">
                    {COLLEGE_TYPES.map((type) => (
                        <div key={type} className="flex items-center space-x-2">
                            <Checkbox
                                id={`type-${type}`}
                                checked={selectedTypes.includes(type)}
                                onCheckedChange={(checked: any) => onTypeChange(type, checked as boolean)}
                            />
                            <Label htmlFor={`type-${type}`} className="text-sm text-gray-600 font-normal cursor-pointer">
                                {type}
                            </Label>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
