// ============================================================
// Dreamer's Way Consultancy — Multi-country platform types
// ============================================================

export type CountryCode = 'nepal' | 'india' | 'uk' | 'usa' | 'bangladesh' | 'canada' | 'russia' | 'georgia' | 'uzbekistan' | 'kyrgyzstan' | 'philippines' | string;
export type StreamCode = 'doctor' | 'engineer' | 'bhs' | 'nursing' | 'agriculture' | string;

export interface Country {
    id: string;
    created_at: string;
    code: CountryCode;
    name: string;
    flag_emoji?: string;
    hero_image_url?: string;
    tagline?: string;
    short_description?: string;
    long_description?: string;
    is_active: boolean;
    display_order: number;
    capital?: string;
    currency?: string;
    language?: string;
    intake_months?: string[];
    avg_tuition_range?: string;
    avg_living_cost?: string;
    visa_type?: string;
    visa_process_summary?: string;
    why_study?: { title: string; description: string; icon?: string }[];
    popular_cities?: string[];
    popular_streams?: StreamCode[];
    process_steps?: { step: number; title: string; description: string }[];
    required_documents?: string[];
    scholarships_available_summary?: string;
    seo_title?: string;
    seo_description?: string;
    seo_keywords?: string[];
}

export interface Stream {
    id: string;
    created_at: string;
    code: StreamCode;
    name: string;
    icon?: string;
    short_description?: string;
    long_description?: string;
    display_order: number;
    is_active: boolean;
}

export interface University {
    id: string;
    created_at: string;
    slug: string;
    name: string;
    short_name?: string;
    country_code: CountryCode;
    stream_codes: StreamCode[];

    city?: string;
    address?: string;
    hospital_address?: string;
    established_year?: string;
    university_type?: string;
    affiliation?: string;
    ranking_text?: string;
    bed_capacity?: string;

    description?: string;
    short_description?: string;
    highlights?: string[];
    facilities?: string[];
    recognised_by?: string[];

    programs?: Record<string, string[]>;
    programs_bachelor?: string[];
    programs_pg?: string[];

    tuition_range?: string;
    scholarship_available?: boolean;
    scholarship_info?: string;
    eligibility?: string;
    application_deadline?: string;
    language_requirements?: string;
    intake_info?: string;

    nearest_borders?: { name: string; distance: string }[];
    access_modes?: { mode: string; description: string }[];
    additional_info?: string;

    logo_url?: string;
    cover_image_url?: string;
    gallery_images?: string[];

    website_url?: string;
    contact_email?: string;
    contact_phone?: string;

    is_featured: boolean;
    is_active: boolean;
    display_order: number;

    seo_title?: string;
    seo_description?: string;
    seo_keywords?: string[];
}

// Backwards-compatible alias — many old components still import `College`.
export type College = University;

export type CollegeType = string;
export type Affiliation = string;

export interface Scholarship {
    id: string;
    created_at: string;
    name: string;
    slug: string;
    country_code?: CountryCode;
    stream_codes?: StreamCode[];
    provider?: string;
    scholarship_type?: string;
    amount?: string;
    eligibility?: string;
    benefits?: string;
    deadline_text?: string;
    application_link?: string;
    description?: string;
    cover_image_url?: string;
    is_featured: boolean;
    is_active: boolean;
    display_order: number;
}

export interface SuccessStory {
    id: string;
    created_at: string;
    student_name: string;
    photo_url?: string;
    from_country?: string;
    to_country_code?: CountryCode;
    stream_code?: StreamCode;
    university?: string;
    program?: string;
    batch_year?: string;
    rating: number;
    short_quote?: string;
    story?: string;
    video_url?: string;
    is_featured: boolean;
    display_order: number;
}

export interface BlogPost {
    id: string;
    created_at: string;
    title: string;
    slug: string;
    excerpt?: string;
    content?: string;
    cover_image_url?: string;
    country_codes?: CountryCode[];
    stream_codes?: StreamCode[];
    tags?: string[];
    author?: string;
    author_photo_url?: string;
    reading_time_minutes?: number;
    published_at: string;
    is_published: boolean;
    is_featured: boolean;
    seo_title?: string;
    seo_description?: string;
}

export interface Faq {
    id: string;
    created_at: string;
    question: string;
    answer: string;
    category: string;
    country_code?: CountryCode;
    stream_code?: StreamCode;
    display_order: number;
    is_active: boolean;
}

export interface Service {
    id: string;
    created_at: string;
    title: string;
    slug: string;
    short_description?: string;
    long_description?: string;
    icon?: string;
    image_url?: string;
    features?: string[];
    display_order: number;
    is_active: boolean;
}

export interface Notice {
    id: string;
    created_at: string;
    title: string;
    content?: string;
    publish_date: string;
    attachment_url?: string;
    country_codes?: CountryCode[];
    is_important: boolean;
}

export interface TeamMember {
    id: string;
    created_at: string;
    name: string;
    designation: string;
    photo_url?: string;
    bio?: string;
    email?: string;
    phone?: string;
    linkedin_url?: string;
    display_order: number;
}

export interface CollegeFilterState {
    country: string[];
    stream: string[];
    type: string[];
    affiliation: string[];
    search: string;
}
