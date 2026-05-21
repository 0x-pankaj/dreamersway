import type { Metadata } from "next";
import { Navigation } from "@/components/navigation";
import Footer from "@/components/sections/Footer";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
    title: "Privacy Policy",
    description: "How Dreamer's Way Consultancy collects, uses and protects your information.",
    alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
    return (
        <div className="min-h-screen bg-white dark:bg-black flex flex-col">
            <Navigation />
            <main className="flex-1 pt-28 pb-16">
                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 prose dark:prose-invert">
                    <h1>Privacy Policy</h1>
                    <p>
                        At {siteConfig.name}, we respect your privacy. This policy explains how we collect, use and protect the
                        information you share when interacting with our website and counsellors.
                    </p>
                    <h2>Information we collect</h2>
                    <ul>
                        <li>Contact details you submit through enquiry forms (name, phone, email, country and stream of interest).</li>
                        <li>Information you share during counselling sessions.</li>
                        <li>Anonymous analytics (page views, device type) to improve the website.</li>
                    </ul>
                    <h2>How we use it</h2>
                    <ul>
                        <li>To contact you about your enquiry and provide guidance.</li>
                        <li>To match you to suitable universities, scholarships and services.</li>
                        <li>We never sell your information.</li>
                    </ul>
                    <h2>Contact</h2>
                    <p>
                        Questions about this policy? Email{" "}
                        <a href={`mailto:${siteConfig.contact.email}`}>{siteConfig.contact.email}</a> or call{" "}
                        <a href={`tel:${siteConfig.contact.phonePrimary.replace(/\s/g, "")}`}>{siteConfig.contact.phonePrimary}</a>.
                    </p>
                </div>
            </main>
            <Footer />
        </div>
    );
}
