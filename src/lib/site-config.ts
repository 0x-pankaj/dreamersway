// Central site configuration. Edit here to update everywhere.

export const siteConfig = {
    name: "Dreamer's Way Consultancy",
    shortName: "DWC",
    tagline: "Your global education partner — one platform, every dream destination.",
    description:
        "Dreamer's Way Consultancy provides end-to-end international education guidance — with a Center of Excellence for medical aspirants (MBBS, MD, MS) and structured advisory for Engineering, Nursing, Health Sciences and Agriculture across Nepal, India, UK, USA, Bangladesh, Canada and Russia.",
    url: process.env.NEXT_PUBLIC_SITE_URL || "https://dreamersway.com.np",
    ogImage: "/dwc_logo.png",
    contact: {
        phonePrimary: "+977 9851 000000",
        phoneIndia: "+91 99999 00000",
        whatsapp: "9779851000000",
        email: "info@dreamersway.com.np",
        address: "Kathmandu, Nepal",
        mapEmbedSrc:
            "https://maps.google.com/maps?q=27.68455812317496,85.34821674069123&t=&z=16&ie=UTF8&iwloc=&output=embed",
    },
    social: {
        facebook: "https://facebook.com/",
        instagram: "https://instagram.com/",
        linkedin: "https://linkedin.com/",
        youtube: "https://youtube.com/",
    },
    countries: [
        { code: "nepal", name: "Nepal", flag: "🇳🇵", stream: "Medical (MBBS / BDS)", forStudents: "MBBS, BDS & Health Sciences" },
        { code: "india", name: "India", flag: "🇮🇳", stream: "MBBS, Engineering & Nursing", forStudents: "MBBS, Engineering & Nursing" },
        { code: "uk", name: "United Kingdom", flag: "🇬🇧", stream: "Higher Education", forStudents: "Bachelors, Masters & PhD" },
        { code: "usa", name: "United States", flag: "🇺🇸", stream: "Higher Education", forStudents: "Bachelors, Masters & PhD" },
        { code: "bangladesh", name: "Bangladesh", flag: "🇧🇩", stream: "Medical (MBBS / BDS)", forStudents: "MBBS, BDS & Nursing" },
        { code: "canada", name: "Canada", flag: "🇨🇦", stream: "Higher Education", forStudents: "Bachelors, Masters & PG Diploma" },
        { code: "russia", name: "Russia", flag: "🇷🇺", stream: "Medical & Engineering", forStudents: "MBBS, MD/MS & Engineering" },
    ] as const,
    // Departments / fields of study we specialize in.
    streams: [
        { code: "doctor", name: "Doctor", icon: "Stethoscope" },
        { code: "engineer", name: "Engineer", icon: "Cpu" },
        { code: "bhs", name: "BHS (Health Sciences)", icon: "HeartPulse" },
        { code: "nursing", name: "Nursing", icon: "Activity" },
        { code: "agriculture", name: "Agriculture", icon: "Sprout" },
    ] as const,
};

export type SiteCountry = (typeof siteConfig.countries)[number];
export type SiteStream = (typeof siteConfig.streams)[number];

export function countryByCode(code: string) {
    return siteConfig.countries.find((c) => c.code === code);
}
