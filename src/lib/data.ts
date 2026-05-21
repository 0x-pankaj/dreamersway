import { supabase } from "./supabaseClient";
import type {
    Country, Stream, University, Scholarship, SuccessStory,
    BlogPost, Faq, Service, Notice, TeamMember,
} from "@/types";

async function runList<T>(builder: any): Promise<T[]> {
    try {
        const { data, error } = await builder;
        if (error) console.error(error);
        return (data as T[]) || [];
    } catch (e) {
        console.error(e);
        return [];
    }
}

async function runOne<T>(builder: any): Promise<T | null> {
    try {
        const { data, error } = await builder;
        if (error) console.error(error);
        return (data as T) || null;
    } catch (e) {
        console.error(e);
        return null;
    }
}

export const getCountries = () =>
    runList<Country>(
        supabase.from("countries").select("*").eq("is_active", true).order("display_order", { ascending: true })
    );

export const getCountry = (code: string) =>
    runOne<Country>(
        supabase.from("countries").select("*").eq("code", code).maybeSingle()
    );

export const getStreams = () =>
    runList<Stream>(
        supabase.from("streams").select("*").eq("is_active", true).order("display_order", { ascending: true })
    );

export const getUniversities = async (params?: {
    countryCode?: string; streamCode?: string; featuredOnly?: boolean; limit?: number;
}) => {
    let q: any = supabase.from("universities").select("*").eq("is_active", true);
    if (params?.countryCode) q = q.eq("country_code", params.countryCode);
    if (params?.streamCode) q = q.contains("stream_codes", [params.streamCode]);
    if (params?.featuredOnly) q = q.eq("is_featured", true);
    if (params?.limit) q = q.limit(params.limit);
    q = q.order("display_order", { ascending: true });
    return runList<University>(q);
};

export const getUniversity = (slug: string) =>
    runOne<University>(
        supabase.from("universities").select("*").eq("slug", slug).maybeSingle()
    );

export const getScholarships = async (params?: { countryCode?: string; featuredOnly?: boolean; limit?: number }) => {
    let q: any = supabase.from("scholarships").select("*").eq("is_active", true);
    if (params?.countryCode) q = q.eq("country_code", params.countryCode);
    if (params?.featuredOnly) q = q.eq("is_featured", true);
    if (params?.limit) q = q.limit(params.limit);
    q = q.order("display_order", { ascending: true });
    return runList<Scholarship>(q);
};

export const getSuccessStories = async (limit = 12) =>
    runList<SuccessStory>(
        supabase.from("success_stories").select("*").order("display_order", { ascending: true }).limit(limit)
    );

export const getBlogPosts = async (params?: { countryCode?: string; limit?: number }) => {
    let q: any = supabase.from("blog_posts").select("*").eq("is_published", true);
    if (params?.countryCode) q = q.contains("country_codes", [params.countryCode]);
    q = q.order("published_at", { ascending: false });
    if (params?.limit) q = q.limit(params.limit);
    return runList<BlogPost>(q);
};

export const getBlogPost = (slug: string) =>
    runOne<BlogPost>(
        supabase.from("blog_posts").select("*").eq("slug", slug).eq("is_published", true).maybeSingle()
    );

export const getFaqs = async (params?: { countryCode?: string; category?: string }) => {
    let q: any = supabase.from("faqs").select("*").eq("is_active", true);
    if (params?.countryCode) q = q.eq("country_code", params.countryCode);
    if (params?.category) q = q.eq("category", params.category);
    q = q.order("display_order", { ascending: true });
    return runList<Faq>(q);
};

export const getServices = () =>
    runList<Service>(
        supabase.from("services").select("*").eq("is_active", true).order("display_order", { ascending: true })
    );

export const getNotices = async (limit = 10) =>
    runList<Notice>(
        supabase.from("notices").select("*").order("publish_date", { ascending: false }).limit(limit)
    );

export const getTeam = () =>
    runList<TeamMember>(
        supabase.from("team_members").select("*").order("display_order", { ascending: true })
    );
