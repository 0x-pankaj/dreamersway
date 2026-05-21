"use client";

import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { University } from "@/types";
import { CollegeCard } from "@/components/CollegeCard";
import { siteConfig } from "@/lib/site-config";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface Props {
    initialUniversities: University[];
}

export default function CollegeListing({ initialUniversities }: Props) {
    const search = useSearchParams();
    const [query, setQuery] = useState("");
    const [country, setCountry] = useState<string>("");
    const [stream, setStream] = useState<string>("");
    const [type, setType] = useState<string>("");
    const [showMobileFilters, setShowMobileFilters] = useState(false);

    useEffect(() => {
        setCountry(search.get("country") || "");
        setStream(search.get("stream") || "");
    }, [search]);

    const allTypes = useMemo(() => {
        const set = new Set<string>();
        initialUniversities.forEach((u) => u.university_type && set.add(u.university_type));
        return Array.from(set);
    }, [initialUniversities]);

    const filtered = useMemo(() => {
        return initialUniversities.filter((u) => {
            const q = query.toLowerCase();
            const matchesQ = !q ||
                u.name.toLowerCase().includes(q) ||
                (u.city || "").toLowerCase().includes(q) ||
                (u.address || "").toLowerCase().includes(q);
            const matchesCountry = !country || u.country_code === country;
            const matchesStream = !stream || (u.stream_codes || []).includes(stream);
            const matchesType = !type || u.university_type === type;
            return matchesQ && matchesCountry && matchesStream && matchesType;
        });
    }, [initialUniversities, query, country, stream, type]);

    const clearAll = () => {
        setQuery(""); setCountry(""); setStream(""); setType("");
    };

    const activeFilterCount = [country, stream, type].filter(Boolean).length;

    return (
        <div className="grid lg:grid-cols-[280px_1fr] gap-6">
            {/* Sidebar filters */}
            <aside className={`${showMobileFilters ? "block" : "hidden"} lg:block`}>
                <div className="bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-2xl p-5 sticky top-32">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="font-bold text-gray-900 dark:text-white">Filters</h2>
                        {activeFilterCount > 0 && (
                            <button onClick={clearAll} className="text-xs text-primary font-semibold hover:underline">Clear</button>
                        )}
                    </div>

                    <FilterGroup title="Destination">
                        {siteConfig.countries.map((c) => (
                            <Radio key={c.code} name="country" value={c.code} checked={country === c.code} onChange={setCountry} label={`${c.flag} ${c.name}`} />
                        ))}
                        <Radio name="country" value="" checked={country === ""} onChange={setCountry} label="All countries" />
                    </FilterGroup>

                    <FilterGroup title="Stream">
                        {siteConfig.streams.map((s) => (
                            <Radio key={s.code} name="stream" value={s.code} checked={stream === s.code} onChange={setStream} label={s.name} />
                        ))}
                        <Radio name="stream" value="" checked={stream === ""} onChange={setStream} label="All streams" />
                    </FilterGroup>

                    {allTypes.length > 0 && (
                        <FilterGroup title="University type">
                            {allTypes.map((t) => (
                                <Radio key={t} name="type" value={t} checked={type === t} onChange={setType} label={t} />
                            ))}
                            <Radio name="type" value="" checked={type === ""} onChange={setType} label="All types" />
                        </FilterGroup>
                    )}
                </div>
            </aside>

            <div>
                {/* Search bar */}
                <div className="bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-2xl p-4 mb-5 flex items-center gap-3">
                    <Search className="w-5 h-5 text-gray-400 flex-shrink-0 ml-1" />
                    <Input
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search by name, city or address…"
                        className="border-0 shadow-none focus-visible:ring-0 px-0 text-base"
                    />
                    <Button
                        variant="outline"
                        size="sm"
                        className="lg:hidden flex-shrink-0"
                        onClick={() => setShowMobileFilters((v) => !v)}
                    >
                        <SlidersHorizontal className="w-4 h-4 mr-1" /> Filters
                        {activeFilterCount > 0 && (
                            <span className="ml-1 bg-primary text-primary-foreground rounded-full px-1.5 text-xs">{activeFilterCount}</span>
                        )}
                    </Button>
                </div>

                {/* Active filters chips */}
                {(country || stream || type) && (
                    <div className="flex flex-wrap gap-2 mb-5">
                        {country && <Chip label={`Country: ${siteConfig.countries.find(c => c.code === country)?.name}`} onClear={() => setCountry("")} />}
                        {stream && <Chip label={`Stream: ${siteConfig.streams.find(s => s.code === stream)?.name}`} onClear={() => setStream("")} />}
                        {type && <Chip label={`Type: ${type}`} onClear={() => setType("")} />}
                    </div>
                )}

                <div className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                    {filtered.length} universit{filtered.length === 1 ? "y" : "ies"} found
                </div>

                {filtered.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                        {filtered.map((u) => (
                            <CollegeCard key={u.id} college={u} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-16 bg-gray-50 dark:bg-gray-900 rounded-2xl border border-dashed border-gray-300 dark:border-gray-800">
                        <p className="text-gray-500 mb-3">No matches. Try clearing some filters.</p>
                        <Button onClick={clearAll} variant="outline">Clear filters</Button>
                    </div>
                )}
            </div>
        </div>
    );
}

function FilterGroup({ title, children }: { title: string; children: React.ReactNode }) {
    return (
        <div className="border-t border-gray-100 dark:border-gray-800 pt-4 mt-4 first:border-0 first:mt-0 first:pt-0">
            <div className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2">{title}</div>
            <div className="space-y-1.5">{children}</div>
        </div>
    );
}

function Radio({ name, value, checked, onChange, label }: { name: string; value: string; checked: boolean; onChange: (v: string) => void; label: string }) {
    return (
        <label className={`flex items-center gap-2 text-sm py-1.5 px-2 rounded-md cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors ${checked ? "text-primary font-bold" : "text-gray-700 dark:text-gray-300"}`}>
            <input
                type="radio"
                name={name}
                checked={checked}
                onChange={() => onChange(value)}
                className="accent-primary"
            />
            {label}
        </label>
    );
}

function Chip({ label, onClear }: { label: string; onClear: () => void }) {
    return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-semibold">
            {label}
            <button onClick={onClear} className="hover:bg-primary/20 rounded-full">
                <X className="w-3 h-3" />
            </button>
        </span>
    );
}
