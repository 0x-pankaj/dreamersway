import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";
import { getUniversities, getBlogPosts, getScholarships } from "@/lib/data";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const base = siteConfig.url;
    const now = new Date();

    const staticPaths = [
        "",
        "/universities",
        "/scholarships",
        "/services",
        "/blog",
        "/success-stories",
        "/notices",
        "/faqs",
        "/about",
        "/contact",
        "/privacy",
    ].map((p) => ({
        url: `${base}${p}`,
        lastModified: now,
        changeFrequency: "weekly" as const,
        priority: p === "" ? 1.0 : 0.8,
    }));

    const countries = siteConfig.countries.map((c) => ({
        url: `${base}/study-in/${c.code}`,
        lastModified: now,
        changeFrequency: "weekly" as const,
        priority: 0.95,
    }));

    const [unis, posts, scholarships] = await Promise.all([
        getUniversities(),
        getBlogPosts(),
        getScholarships(),
    ]);

    const uniPaths = unis.map((u) => ({
        url: `${base}/universities/${u.slug}`,
        lastModified: u.created_at ? new Date(u.created_at) : now,
        changeFrequency: "monthly" as const,
        priority: 0.7,
    }));

    const blogPaths = posts.map((p) => ({
        url: `${base}/blog/${p.slug}`,
        lastModified: p.published_at ? new Date(p.published_at) : now,
        changeFrequency: "monthly" as const,
        priority: 0.6,
    }));

    return [...staticPaths, ...countries, ...uniPaths, ...blogPaths];
}
