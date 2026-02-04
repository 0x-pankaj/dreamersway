export type CollegeType = 'Government' | 'Private' | 'Community' | 'Other';
export type Affiliation = 'Tribhuvan University (TU)' | 'Kathmandu University (KU)' | 'Autonomous' | 'Other';

export interface College {
    id: string;
    created_at: string;
    name: string;
    slug: string;
    address: string;
    established_year: string;
    bed_capacity?: string;
    college_type: CollegeType;
    affiliation: Affiliation;
    programs: Record<string, string[]> | any; // structured as { 'Bachelors': ['MBBS', 'BDS'], 'Masters': ['MD'] }
    description?: string;
    logo_url?: string;
    cover_image_url?: string;
    gallery_images: string[];
    is_featured: boolean;
    website_url?: string;
    contact_email?: string;
    contact_phone?: string;
    facilities?: string[];

    // New Rich Data Fields
    recognised_by?: string[];
    hospital_address?: string; // Some might not have hospital
    highlights?: string[];
    nearest_borders?: { name: string; distance: string }[];
    access_modes?: { mode: string; description: string }[];
    programs_bachelor?: string[];
    programs_pg?: string[];
    additional_info?: string;
}

export interface Notice {
    id: string;
    created_at: string;
    title: string;
    content: string;
    publish_date: string;
    attachment_url?: string;
    is_important: boolean;
}

export interface TeamMember {
    id: string;
    created_at: string;
    name: string;
    designation: string;
    photo_url?: string;
    bio?: string;
    display_order: number;
}

// Filter Options Interface
export interface CollegeFilterState {
    affiliation: string[];
    type: string[];
    search: string;
}
