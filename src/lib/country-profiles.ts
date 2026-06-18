// Rich, code-based country content. Used to populate the /study-in/[country]
// pages so destinations render full, detailed content even before (or without)
// a curated Supabase row. Supabase data, when present, always takes priority —
// see the merge in src/app/study-in/[country]/page.tsx.

export interface CountryProfile {
    tagline: string;
    short_description: string;
    long_description: string;
    capital: string;
    currency: string;
    language: string;
    intake_months: string[];
    avg_tuition_range: string;
    avg_living_cost: string;
    visa_type: string;
    visa_process_summary?: string;
    popular_cities: string[];
    popular_streams?: string[];
    why_study: { title: string; description: string }[];
    /** Quick at-a-glance facts shown as a key-facts strip. */
    key_facts?: { label: string; value: string }[];
    /** Yearly cost breakdown table (approximate, USD). */
    cost_breakdown?: { category: string; amount: string; note?: string }[];
    /** Programs / degree pathways available to students. */
    study_options?: { title: string; duration: string; description: string }[];
    /** Work rights, licensing exams and post-study / PR pathways. */
    work_rights?: { title: string; description: string }[];
    /** Living, culture, climate and student community. */
    student_life?: { title: string; description: string }[];
}

// Shared building blocks for South-Asia–focused MBBS destinations.
const FMGE_NEXT = {
    title: "FMGE / NExT preparation",
    description:
        "Dedicated coaching and mentorship to clear the Indian licensing exam (FMGE / upcoming NExT) so you can practise back home.",
};

export const countryProfiles: Record<string, CountryProfile> = {
    // ------------------------------------------------------------------
    // NEW DESTINATIONS
    // ------------------------------------------------------------------
    georgia: {
        tagline: "European MBBS, taught fully in English",
        short_description:
            "A fast-growing European destination for affordable, English-medium MBBS/MD — globally recognised degrees with a clear pathway to USMLE, PLAB and FMGE/NExT.",
        long_description:
            "Georgia, at the crossroads of Europe and Asia, has become one of the most popular destinations for international medical students. Its state and private medical universities offer six-year MD (MBBS) programmes taught entirely in English, recognised by NMC (India), WHO/WDOMS, FAIMER, ECFMG and the GMC. Tuition and living costs are a fraction of Western Europe, the country is consistently ranked among the safest in the region, and students get strong clinical exposure in modern teaching hospitals. With no entrance donation and a transparent admission process, Georgia offers a genuine European study experience at a South-Asian budget.",
        capital: "Tbilisi",
        currency: "Georgian Lari (GEL)",
        language: "Georgian (programmes in English)",
        intake_months: ["September", "February"],
        avg_tuition_range: "$4,000 – $8,000 / year",
        avg_living_cost: "$200 – $350 / month",
        visa_type: "D3 Student Visa + Residence Permit",
        visa_process_summary:
            "After the university offer, you apply for a D3 long-stay visa, then convert to a temporary residence permit on arrival. Processing is straightforward with a clean documentation trail.",
        popular_cities: ["Tbilisi", "Batumi", "Kutaisi", "Telavi"],
        popular_streams: ["MBBS / MD", "Dentistry", "Pharmacy", "Nursing"],
        why_study: [
            { title: "Globally recognised degree", description: "Universities listed with NMC, WHO/WDOMS, FAIMER, ECFMG and the UK GMC." },
            { title: "100% English-medium", description: "The full six-year MD programme is delivered in English — no local-language barrier." },
            { title: "European standard, low cost", description: "EU-aligned curriculum and infrastructure at a fraction of Western tuition." },
            { title: "USMLE & PLAB friendly", description: "Curriculum and electives that support licensing in the US, UK and beyond." },
            { title: "Safe & welcoming", description: "Among the safest countries in the region with a large, growing Indian/Nepali community." },
            FMGE_NEXT,
        ],
        key_facts: [
            { label: "Course", value: "MD (MBBS) – 6 years" },
            { label: "Medium", value: "English" },
            { label: "Recognition", value: "NMC · WHO · FAIMER · GMC" },
            { label: "Entrance donation", value: "None" },
        ],
        cost_breakdown: [
            { category: "Tuition", amount: "$4,000 – $8,000", note: "per year, varies by university" },
            { category: "Hostel & food", amount: "$2,000 – $3,500", note: "per year" },
            { category: "Visa & residence permit", amount: "$200 – $400", note: "one-time + renewal" },
            { category: "Personal / misc.", amount: "$1,000 – $1,500", note: "per year" },
        ],
        study_options: [
            { title: "MD (MBBS)", duration: "6 years", description: "Six-year English-medium medical degree including clinical rotations." },
            { title: "Dentistry (DDS)", duration: "5 years", description: "English-medium dental surgery programme with hands-on clinical training." },
            { title: "Pharmacy / Nursing", duration: "3 – 4 years", description: "Allied health degrees with strong practical and lab components." },
        ],
        work_rights: [
            { title: "Practise back home", description: "Clear after qualifying FMGE/NExT (India) or the licensing exam of your home country." },
            { title: "USMLE / PLAB pathway", description: "Sit US and UK licensing exams to practise internationally after graduation." },
            { title: "Internship", description: "A rotating clinical internship is built into the final year of the programme." },
        ],
        student_life: [
            { title: "Climate", description: "Four distinct seasons — warm summers and snowy winters in the highlands." },
            { title: "Food & community", description: "Affordable food, halal/vegetarian options and an established South-Asian student community." },
            { title: "Safety", description: "Low crime and friendly locals make day-to-day student life relaxed and secure." },
        ],
    },

    uzbekistan: {
        tagline: "Affordable MBBS in the heart of Central Asia",
        short_description:
            "Government and private medical universities offering low-cost, English-medium MBBS with WHO and NMC recognition — a budget-friendly, reform-driven destination.",
        long_description:
            "Uzbekistan has rapidly modernised its higher-education sector and is now a strong, budget-friendly option for international medical students. Its state medical universities offer English-medium MBBS programmes recognised by WHO/WDOMS, NMC and FAIMER, with tuition among the lowest of any recognised destination. The country combines a rich Silk-Road heritage with new university infrastructure, modern teaching hospitals and a low cost of living. Cities like Tashkent, Samarkand and Bukhara give students a safe, affordable and culturally rich place to study medicine.",
        capital: "Tashkent",
        currency: "Uzbekistani Som (UZS)",
        language: "Uzbek / Russian (MBBS in English)",
        intake_months: ["September", "November"],
        avg_tuition_range: "$3,000 – $5,500 / year",
        avg_living_cost: "$150 – $300 / month",
        visa_type: "Student Visa (E-type)",
        visa_process_summary:
            "The university issues an invitation/admission letter, which you use to apply for a student visa at the Uzbek embassy. Documentation is minimal and processing is quick.",
        popular_cities: ["Tashkent", "Samarkand", "Bukhara", "Andijan"],
        popular_streams: ["MBBS", "Dentistry", "Pharmacy", "Nursing"],
        why_study: [
            { title: "Lowest-cost recognised MBBS", description: "Tuition starts low and total cost is among the most affordable anywhere." },
            { title: "WHO & NMC recognised", description: "Universities listed in WHO/WDOMS and recognised by NMC and FAIMER." },
            { title: "English-medium teaching", description: "MBBS delivered in English for international students." },
            { title: "Modern, reformed system", description: "Major government investment in new campuses and teaching hospitals." },
            { title: "Low living expenses", description: "Affordable housing, food and transport keep total budgets low." },
            FMGE_NEXT,
        ],
        key_facts: [
            { label: "Course", value: "MBBS – 5–6 years" },
            { label: "Medium", value: "English" },
            { label: "Recognition", value: "WHO · NMC · FAIMER" },
            { label: "Entrance donation", value: "None" },
        ],
        cost_breakdown: [
            { category: "Tuition", amount: "$3,000 – $5,500", note: "per year" },
            { category: "Hostel & food", amount: "$1,500 – $2,500", note: "per year" },
            { category: "Visa & registration", amount: "$150 – $300", note: "one-time + renewal" },
            { category: "Personal / misc.", amount: "$800 – $1,200", note: "per year" },
        ],
        study_options: [
            { title: "MBBS", duration: "5–6 years", description: "English-medium medical degree with clinical training in teaching hospitals." },
            { title: "Dentistry (BDS)", duration: "5 years", description: "Dental surgery programme with practical clinical exposure." },
            { title: "Pharmacy / Nursing", duration: "3–4 years", description: "Allied health programmes with strong lab and practical work." },
        ],
        work_rights: [
            { title: "Practise back home", description: "Eligible after clearing FMGE/NExT (India) or your home licensing exam." },
            { title: "Internship", description: "Clinical internship is included within the programme duration." },
            { title: "Global pathways", description: "Curriculum supports preparation for USMLE and other international exams." },
        ],
        student_life: [
            { title: "Climate", description: "Continental — hot summers and cold winters; dry and sunny for much of the year." },
            { title: "Food & community", description: "Halal-friendly Central-Asian cuisine and a growing South-Asian student base." },
            { title: "Heritage & safety", description: "Safe cities steeped in Silk-Road history, with low day-to-day costs." },
        ],
    },

    kyrgyzstan: {
        tagline: "Low-cost, globally recognised MBBS",
        short_description:
            "One of the most affordable English-medium MBBS destinations — WHO, NMC and FAIMER recognised universities with simple, transparent admission.",
        long_description:
            "Kyrgyzstan is one of the most budget-friendly destinations for an internationally recognised MBBS. Its medical universities offer English-medium programmes recognised by WHO/WDOMS, NMC, FAIMER and the General Medical Councils of several countries. With very low tuition and living costs, no entrance exam donation, and a straightforward admission process, it has become a popular choice for South-Asian medical aspirants. The capital, Bishkek, offers a calm, green and affordable student environment with modern medical campuses and teaching hospitals.",
        capital: "Bishkek",
        currency: "Kyrgyzstani Som (KGS)",
        language: "Kyrgyz / Russian (MBBS in English)",
        intake_months: ["September", "February"],
        avg_tuition_range: "$3,000 – $4,500 / year",
        avg_living_cost: "$150 – $250 / month",
        visa_type: "Student Visa + Residence Registration",
        visa_process_summary:
            "After admission, the university issues an invitation letter for the student visa. On arrival you complete residence registration — a simple, well-trodden process.",
        popular_cities: ["Bishkek", "Osh", "Jalal-Abad", "Karakol"],
        popular_streams: ["MBBS", "Dentistry", "Pharmacy", "Nursing"],
        why_study: [
            { title: "Among the most affordable", description: "Low tuition and very low living costs make total budgets the smallest of any recognised MBBS." },
            { title: "WHO, NMC & FAIMER recognised", description: "Degrees accepted for licensing exams worldwide." },
            { title: "English-medium MBBS", description: "Entire programme taught in English for international students." },
            { title: "No donation, transparent fees", description: "Direct admission with clear, upfront costs and no capitation." },
            { title: "Simple admission", description: "No entrance exam beyond eligibility — quick offer letters." },
            FMGE_NEXT,
        ],
        key_facts: [
            { label: "Course", value: "MBBS – 5–6 years" },
            { label: "Medium", value: "English" },
            { label: "Recognition", value: "WHO · NMC · FAIMER" },
            { label: "Entrance donation", value: "None" },
        ],
        cost_breakdown: [
            { category: "Tuition", amount: "$3,000 – $4,500", note: "per year" },
            { category: "Hostel & food", amount: "$1,200 – $2,200", note: "per year" },
            { category: "Visa & registration", amount: "$150 – $250", note: "one-time + renewal" },
            { category: "Personal / misc.", amount: "$700 – $1,200", note: "per year" },
        ],
        study_options: [
            { title: "MBBS", duration: "5–6 years", description: "English-medium medical degree with hospital-based clinical training." },
            { title: "Dentistry (BDS)", duration: "5 years", description: "Dental surgery programme with clinical practice." },
            { title: "Pharmacy / Nursing", duration: "3–4 years", description: "Allied health degrees with practical training." },
        ],
        work_rights: [
            { title: "Practise back home", description: "Eligible after FMGE/NExT (India) or your home country's licensing exam." },
            { title: "Internship", description: "Rotating clinical internship is part of the final year." },
            { title: "International exams", description: "Prepare for USMLE / PLAB to practise abroad after qualifying." },
        ],
        student_life: [
            { title: "Climate", description: "Continental with warm summers and snowy, scenic winters in the mountains." },
            { title: "Food & community", description: "Halal and vegetarian options widely available, with an active South-Asian community." },
            { title: "Calm & green", description: "Bishkek is a relaxed, tree-lined capital that's easy and cheap to live in." },
        ],
    },

    philippines: {
        tagline: "US-style MD & world-class nursing",
        short_description:
            "An American-model medical education in English — the four-year MD (after a pre-med BS) is a proven route, alongside globally respected nursing and allied-health degrees.",
        long_description:
            "The Philippines offers a US-patterned medical education delivered entirely in English, the country's official medium of instruction. The standard route is a pre-medical bachelor's (BS) followed by a four-year Doctor of Medicine (MD), with universities recognised by WHO/WDOMS, NMC, FAIMER and the Commission on Higher Education (CHED). The Philippines is also one of the world's leading sources of nurses, with internationally regarded nursing and allied-health programmes. English fluency, a warm climate, affordable living and a strong clinical training culture make it a popular destination for South-Asian students aiming at medicine or nursing careers, including those targeting the USMLE or NCLEX.",
        capital: "Manila",
        currency: "Philippine Peso (PHP)",
        language: "English (official medium of instruction)",
        intake_months: ["June", "August", "November"],
        avg_tuition_range: "$3,000 – $6,000 / year",
        avg_living_cost: "$200 – $400 / month",
        visa_type: "Student Visa (9F) / SSP",
        visa_process_summary:
            "You begin on a Special Study Permit (SSP) and convert to a 9F student visa after enrolment. The English-language process is well established for international students.",
        popular_cities: ["Manila", "Cebu", "Davao", "Iloilo"],
        popular_streams: ["MD (Medicine)", "Nursing", "Pharmacy", "Physiotherapy"],
        why_study: [
            { title: "US-model MD", description: "American-style curriculum (BS pre-med + 4-year MD) that aligns well with the USMLE." },
            { title: "English everywhere", description: "English is the official medium of instruction and daily life — no language barrier." },
            { title: "Globally recognised", description: "Universities listed with WHO/WDOMS, NMC, FAIMER and CHED." },
            { title: "Nursing powerhouse", description: "One of the world's top sources of nurses, with NCLEX-aligned training." },
            { title: "Affordable & warm", description: "Low living costs and a friendly tropical environment." },
            FMGE_NEXT,
        ],
        key_facts: [
            { label: "Medicine route", value: "BS pre-med + MD (4 yrs)" },
            { label: "Medium", value: "English" },
            { label: "Recognition", value: "WHO · NMC · FAIMER · CHED" },
            { label: "Also strong in", value: "Nursing & allied health" },
        ],
        cost_breakdown: [
            { category: "Tuition", amount: "$3,000 – $6,000", note: "per year, MD; nursing is lower" },
            { category: "Hostel & food", amount: "$2,000 – $3,500", note: "per year" },
            { category: "Visa / SSP", amount: "$300 – $500", note: "one-time + conversion" },
            { category: "Personal / misc.", amount: "$1,000 – $1,800", note: "per year" },
        ],
        study_options: [
            { title: "Doctor of Medicine (MD)", duration: "4 years + pre-med BS", description: "US-style MD entered after a pre-medical bachelor's, with clinical clerkships." },
            { title: "BS Nursing", duration: "4 years", description: "Internationally respected nursing degree aligned with NCLEX licensing." },
            { title: "Allied health", duration: "3–4 years", description: "Pharmacy, physiotherapy and medical technology programmes." },
        ],
        work_rights: [
            { title: "Practise back home", description: "Eligible after FMGE/NExT (India) or your home licensing exam." },
            { title: "USMLE / NCLEX pathway", description: "Curriculum supports US medical (USMLE) and nursing (NCLEX) licensing." },
            { title: "Clinical clerkship", description: "Hands-on hospital clerkships are built into the MD programme." },
        ],
        student_life: [
            { title: "Climate", description: "Tropical and warm year-round — no harsh winters." },
            { title: "Language & community", description: "English-speaking society with a large international student presence." },
            { title: "Island life", description: "Affordable living with beaches, friendly locals and a relaxed pace." },
        ],
    },
};
