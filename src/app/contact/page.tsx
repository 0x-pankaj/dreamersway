import type { Metadata } from "next";
import { Navigation } from "@/components/navigation";
import Footer from "@/components/sections/Footer";
import { ContactForm } from "@/components/ContactForm";
import { Phone, Mail, MapPin, Clock, MessageCircle } from "lucide-react";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
    title: "Contact Us — Free Consultation",
    description:
        "Get in touch with Dreamer's Way Consultancy. Free counselling for Nepal, India, UK, USA and Japan. Reply within 24 hours.",
    alternates: { canonical: "/contact" },
};

export default function ContactPage() {
    return (
        <div className="min-h-screen bg-white dark:bg-black flex flex-col">
            <Navigation />
            <main className="flex-1">
                <section className="pt-32 md:pt-40 pb-14 bg-gradient-to-br from-indigo-950 via-blue-950 to-slate-950 text-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
                            <MessageCircle className="w-3.5 h-3.5 text-amber-300" /> Contact
                        </div>
                        <h1 className="text-4xl md:text-6xl font-black font-mont mb-3">Let&apos;s talk about your future</h1>
                        <p className="text-lg text-white/80 max-w-2xl mx-auto">
                            Tell us where you want to go and we&apos;ll get back within 24 hours with a personalised plan.
                        </p>
                    </div>
                </section>

                <section className="py-14">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid lg:grid-cols-3 gap-6 mb-10">
                            <Card icon={Phone} title="Call us" lines={[siteConfig.contact.phonePrimary, siteConfig.contact.phoneIndia]} />
                            <Card icon={Mail} title="Email" lines={[siteConfig.contact.email]} />
                            <Card icon={MapPin} title="Visit" lines={[siteConfig.contact.address, "Sun – Fri, 9:00 AM – 6:00 PM"]} />
                        </div>

                        <div className="grid lg:grid-cols-2 gap-6 items-start">
                            <ContactForm />
                            <div className="rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-800 shadow-sm bg-white dark:bg-gray-950">
                                <iframe
                                    width="100%"
                                    height="600"
                                    src={siteConfig.contact.mapEmbedSrc}
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                />
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}

function Card({ icon: Icon, title, lines }: { icon: any; title: string; lines: string[] }) {
    return (
        <div className="bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 rounded-xl bg-primary/15 text-primary flex items-center justify-center mb-3">
                <Icon className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-gray-900 dark:text-white mb-1 font-mont">{title}</h3>
            <div className="text-sm text-gray-600 dark:text-gray-400 space-y-0.5">
                {lines.map((l) => <div key={l}>{l}</div>)}
            </div>
        </div>
    );
}
