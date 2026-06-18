import Link from "next/link";
import { ArrowRight, GraduationCap } from "lucide-react";
import type { Country } from "@/types";
import { siteConfig } from "@/lib/site-config";

interface Props {
    country: Country | { code: string; name: string; flag_emoji?: string; tagline?: string; popular_streams?: string[] };
    variant?: "default" | "compact";
}

const FALLBACK_GRADIENTS: Record<string, string> = {
    nepal: "from-rose-500 via-pink-500 to-red-500",
    india: "from-orange-500 via-amber-500 to-green-500",
    uk: "from-blue-700 via-indigo-600 to-red-600",
    usa: "from-blue-600 via-white/30 to-red-600",
    bangladesh: "from-green-600 via-emerald-500 to-red-600",
    canada: "from-red-600 via-white/30 to-red-500",
    russia: "from-blue-600 via-white/30 to-red-600",
    georgia: "from-red-600 via-white/30 to-red-500",
    uzbekistan: "from-sky-500 via-white/30 to-emerald-500",
    kyrgyzstan: "from-red-600 via-rose-500 to-amber-500",
    philippines: "from-blue-700 via-red-600 to-amber-400",
};

export function CountryCard({ country, variant = "default" }: Props) {
    const flag = country.flag_emoji || siteConfig.countries.find((c) => c.code === country.code)?.flag || "🌍";
    const gradient = FALLBACK_GRADIENTS[country.code] || "from-primary via-blue-500 to-indigo-500";

    if (variant === "compact") {
        return (
            <Link
                href={`/study-in/${country.code}`}
                className="group flex items-center gap-3 p-4 bg-white dark:bg-gray-950 rounded-2xl border border-gray-200 dark:border-gray-800 hover:border-primary hover:shadow-lg transition-all"
            >
                <span className="text-4xl">{flag}</span>
                <div className="flex-1 min-w-0">
                    <div className="font-bold text-gray-900 dark:text-white group-hover:text-primary transition-colors">
                        {country.name}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 line-clamp-1">{country.tagline || ""}</div>
                </div>
                <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-primary group-hover:translate-x-1 transition-all" />
            </Link>
        );
    }

    return (
        <Link href={`/study-in/${country.code}`} className="group block relative">
            <div className={`relative h-72 rounded-3xl overflow-hidden bg-gradient-to-br ${gradient} shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-1`}>
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors" />

                {/* huge flag emoji background */}
                <div className="absolute -right-6 -bottom-10 text-[12rem] opacity-30 select-none pointer-events-none">
                    {flag}
                </div>

                <div className="relative h-full p-6 flex flex-col justify-between text-white">
                    <div>
                        <div className="text-5xl mb-3 drop-shadow-lg">{flag}</div>
                        <h3 className="text-2xl font-black font-mont mb-1 drop-shadow">{country.name}</h3>
                        <p className="text-sm text-white/90 line-clamp-2">{country.tagline}</p>
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-xs font-semibold bg-white/15 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20">
                            <GraduationCap className="w-3.5 h-3.5" />
                            {(country.popular_streams || []).join(" · ") || "Explore programs"}
                        </div>
                        <div className="inline-flex items-center gap-1 text-sm font-bold bg-white text-gray-900 px-4 py-2 rounded-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                            Explore
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
}
