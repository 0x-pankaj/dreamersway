import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Navigation } from "@/components/navigation";
import Footer from "@/components/sections/Footer";
import { Clock, ArrowLeft, BookOpen } from "lucide-react";
import { ContactForm } from "@/components/ContactForm";
import { getBlogPost, getBlogPosts } from "@/lib/data";
import { siteConfig } from "@/lib/site-config";

export const revalidate = 60;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const post = await getBlogPost(slug);
    if (!post) return { title: "Article not found" };
    return {
        title: post.seo_title || post.title,
        description: post.seo_description || post.excerpt,
        alternates: { canonical: `/blog/${slug}` },
        openGraph: {
            title: post.title,
            description: post.excerpt,
            images: post.cover_image_url ? [{ url: post.cover_image_url }] : undefined,
            type: "article",
            publishedTime: post.published_at,
            authors: post.author ? [post.author] : undefined,
        },
    };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const post = await getBlogPost(slug);
    if (!post) notFound();

    const related = (await getBlogPosts({ limit: 3 })).filter((p) => p.id !== post.id).slice(0, 3);

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: post.title,
        description: post.excerpt,
        image: post.cover_image_url,
        datePublished: post.published_at,
        author: post.author ? { "@type": "Person", name: post.author } : undefined,
        publisher: {
            "@type": "Organization",
            name: siteConfig.name,
            logo: { "@type": "ImageObject", url: `${siteConfig.url}/dwc_logo.png` },
        },
        mainEntityOfPage: `${siteConfig.url}/blog/${slug}`,
    };

    return (
        <div className="min-h-screen bg-white dark:bg-black flex flex-col">
            <Navigation />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

            <main className="flex-1">
                <article className="pt-28 md:pt-36 pb-16">
                    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                        <Link href="/blog" className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-primary mb-6">
                            <ArrowLeft className="w-4 h-4" /> Back to all articles
                        </Link>
                        <h1 className="text-3xl md:text-5xl font-black text-gray-900 dark:text-white mb-4 font-mont leading-tight">{post.title}</h1>
                        <div className="flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400 mb-6">
                            {post.author && <span className="font-medium">{post.author}</span>}
                            <span>·</span>
                            <span>{new Date(post.published_at).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}</span>
                            {post.reading_time_minutes && (
                                <>
                                    <span>·</span>
                                    <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {post.reading_time_minutes} min</span>
                                </>
                            )}
                        </div>
                        {post.cover_image_url && (
                            <div className="relative aspect-[16/9] rounded-2xl overflow-hidden mb-8">
                                <Image src={post.cover_image_url} alt={post.title} fill priority className="object-cover" />
                            </div>
                        )}
                        {post.excerpt && (
                            <p className="text-xl text-gray-700 dark:text-gray-300 leading-relaxed mb-8 font-medium">{post.excerpt}</p>
                        )}
                        <div
                            className="prose dark:prose-invert max-w-none prose-lg prose-headings:font-mont prose-headings:font-black prose-a:text-primary"
                            dangerouslySetInnerHTML={{ __html: post.content || "" }}
                        />
                    </div>
                </article>

                {related.length > 0 && (
                    <section className="py-14 bg-gray-50 dark:bg-gray-950">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <h2 className="text-2xl md:text-3xl font-black text-gray-900 dark:text-white mb-6 font-mont">Continue reading</h2>
                            <div className="grid sm:grid-cols-3 gap-5">
                                {related.map((p) => (
                                    <Link key={p.id} href={`/blog/${p.slug}`} className="bg-white dark:bg-black rounded-2xl p-5 border border-gray-200 dark:border-gray-800 hover:border-primary/40 hover:shadow-lg transition-all">
                                        <BookOpen className="w-5 h-5 text-primary mb-2" />
                                        <h3 className="font-bold text-gray-900 dark:text-white mb-2 line-clamp-2 font-mont">{p.title}</h3>
                                        <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">{p.excerpt}</p>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                <section className="py-14">
                    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                        <ContactForm defaultCountry={post.country_codes?.[0]} defaultStream={post.stream_codes?.[0]} />
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}
