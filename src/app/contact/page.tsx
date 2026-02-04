import { Navigation } from "@/components/navigation";
import Footer from "@/components/sections/Footer";
import { ContactForm } from "@/components/ContactForm";

export default function ContactPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 flex flex-col relative overflow-hidden">
            <Navigation />
            <main className="flex-1 pt-40 pb-12 md:pt-48 md:pb-24 relative z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Get in Touch</h1>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            Have questions? We'd love to hear from you. Send us a message or visit our location.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                        {/* Contact Form Side */}
                        <div className="w-full">
                            {/* We modify the ContactForm appearance slightly by wrapping it or just letting it render.
                             Since ContactForm has its own container logic, we might see double padding if we are not careful.
                             However, looking at ContactForm code, it has a section and max-w-7xl.
                             Inside a grid column, it will be constrained.
                         */}
                            <div className="[&>section]:p-0 [&>section>div]:p-0 [&>section>div]:max-w-none [&>section>div>div]:max-w-none">
                                <ContactForm />
                            </div>
                        </div>

                        {/* Google Map Side */}
                        <div className="w-full h-full min-h-[600px] rounded-2xl overflow-hidden shadow-xl border border-white/50 bg-white/50 backdrop-blur-sm p-2">
                            <div className="w-full h-full rounded-xl overflow-hidden relative">
                                <iframe
                                    width="100%"
                                    height="100%"
                                    style={{ border: 0, minHeight: "600px" }}
                                    src="https://maps.google.com/maps?q=27%C2%B041'16.0%22N+85%C2%B021'00.0%22E&t=&z=15&ie=UTF8&iwloc=&output=embed"
                                    loading="lazy"
                                    allowFullScreen
                                    referrerPolicy="no-referrer-when-downgrade"
                                ></iframe>

                                {/* Address Overlay */}
                                <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-md p-4 rounded-xl shadow-lg border border-gray-100">
                                    <h3 className="font-bold text-gray-900">Our Location</h3>
                                    <p className="text-sm text-gray-600">27°41'16.0"N 85°21'00.0"E</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    )
}
