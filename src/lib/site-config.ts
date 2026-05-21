// Central site configuration. Edit here to update everywhere.

export const siteConfig = {
    name: "Dreamer's Way Consultancy",
    shortName: "DWC",
    tagline: "Your global education partner — one platform, every dream destination.",
    description:
        "Dreamer's Way Consultancy helps Indian students pursue MBBS in Nepal, Nepali students pursue engineering in India, and higher education in the UK, USA and Japan. End-to-end guidance from shortlisting to landing.",
    url: process.env.NEXT_PUBLIC_SITE_URL || "https://dreamersway.com.np",
    ogImage: "/dwc_logo.png",
    contact: {
        phonePrimary: "+977 9851 000000",
        phoneIndia: "+91 99999 00000",
        whatsapp: "9779851000000",
        email: "info@dreamersway.com.np",
        address: "Kathmandu, Nepal",
        mapEmbedSrc:
            "https://maps.google.com/maps?q=27%C2%B041'16.0%22N+85%C2%B021'00.0%22E&t=&z=15&ie=UTF8&iwloc=&output=embed",
    },
    social: {
        facebook: "https://facebook.com/",
        instagram: "https://instagram.com/",
        linkedin: "https://linkedin.com/",
        youtube: "https://youtube.com/",
    },
    countries: [
        { code: "nepal", name: "Nepal", flag: "🇳🇵", stream: "Medical (MBBS / BDS)", forStudents: "for Indian students" },
        { code: "india", name: "India", flag: "🇮🇳", stream: "Engineering (B.Tech / BE)", forStudents: "for Nepali students" },
        { code: "uk", name: "United Kingdom", flag: "🇬🇧", stream: "Higher Education", forStudents: "for Nepali students" },
        { code: "usa", name: "United States", flag: "🇺🇸", stream: "Higher Education", forStudents: "for Nepali students" },
        { code: "japan", name: "Japan", flag: "🇯🇵", stream: "Higher Education", forStudents: "for Nepali students" },
    ] as const,
    streams: [
        { code: "medical", name: "Medical", icon: "Stethoscope" },
        { code: "engineering", name: "Engineering", icon: "Cpu" },
        { code: "higher-education", name: "Higher Education", icon: "GraduationCap" },
        { code: "mba", name: "MBA & Management", icon: "Briefcase" },
    ] as const,
};

export type SiteCountry = (typeof siteConfig.countries)[number];
export type SiteStream = (typeof siteConfig.streams)[number];

export function countryByCode(code: string) {
    return siteConfig.countries.find((c) => c.code === code);
}
