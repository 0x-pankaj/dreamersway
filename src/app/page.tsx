
import { Navigation } from "@/components/navigation";
import Footer from "@/components/sections/Footer";
import About from "@/components/sections/About";
import { supabase } from "@/lib/supabaseClient";
import NoticeList from "@/components/NoticeList";
import { CollegeCard } from "@/components/CollegeCard";
import { College, Notice } from "@/types";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, GraduationCap, Building2, Users, Award, TrendingUp, CheckCircle2 } from "lucide-react";
import { ContactForm } from "@/components/ContactForm";
import Image from "next/image";
import { HeroHighlight } from "@/components/ui/hero-highlight";

export const revalidate = 0; // Disable static caching for now to show updates

export default async function Home() {

  // Fetch Colleges
  let colleges: College[] = [];
  try {
    const { data, error } = await supabase
      .from('colleges')
      .select('*')
      .eq('is_featured', true)
      .limit(3);

    if (data) colleges = data;
    if (error) console.error("Error fetching colleges:", error);
  } catch (err) {
    console.error("Supabase fetch error:", err);
  }

  // Fetch Notices
  let notices: Notice[] = [];
  try {
    const { data, error } = await supabase
      .from('notices')
      .select('*')
      .order('publish_date', { ascending: false })
      .limit(5);

    if (data) notices = data;
  } catch (err) {
    console.error("Supabase fetch notices error:", err);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 dark:from-black dark:via-black dark:to-gray-900 flex flex-col relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-[0.015] dark:opacity-[0.03] pointer-events-none" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
      }}></div>
      <Navigation />
      <main className="flex-1 relative z-10">
        {/* Enhanced Hero Section */}
        <HeroHighlight className="relative h-screen flex items-center justify-center overflow-hidden">
          {/* Content */}
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-48 pb-32 text-center z-10">
            <div className="space-y-8">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md border border-white/30 text-white px-6 py-3 rounded-full text-sm font-bold shadow-2xl mb-6">
                <GraduationCap className="w-5 h-5" />
                Nepal's Premier Medical College Platform
              </div>

              {/* Heading */}
              <h1 className="text-5xl md:text-7xl font-black text-white mb-6 leading-tight drop-shadow-2xl">
                Your Journey to
                <span className="block bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-300 bg-clip-text text-transparent mt-2">
                  Medical Excellence
                </span>
                Starts Here
              </h1>

              {/* Description */}
              <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto font-medium leading-relaxed drop-shadow-lg">
                Discover Nepal's top medical colleges with comprehensive details on programs, facilities, and admissions - all in one place.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
                <Link href="/colleges">
                  <Button size="lg" className="bg-white text-primary hover:bg-gray-100 font-bold text-lg px-8 py-6 rounded-xl shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105 group">
                    Explore Colleges
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link href="/notices">
                  <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-primary font-bold text-lg px-8 py-6 rounded-xl backdrop-blur-sm bg-white/10 shadow-xl transition-all duration-300 hover:scale-105">
                    Latest Notices
                  </Button>
                </Link>
              </div>

              {/* Stats */}
              {/* <div className="grid grid-cols-3 gap-8 max-w-3xl mx-auto pt-16">
                <div className="text-center">
                  <div className="text-4xl md:text-5xl font-black text-white mb-2">{colleges.length}+</div>
                  <div className="text-white/80 font-semibold">Featured Colleges</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl md:text-5xl font-black text-white mb-2">50K+</div>
                  <div className="text-white/80 font-semibold">Students Helped</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl md:text-5xl font-black text-white mb-2">99%</div>
                  <div className="text-white/80 font-semibold">Success Rate</div>
                </div>
              </div> */}
            </div>
          </div>

          {/* Wave Separator */}
          {/* <div className="absolute bottom-0 left-0 right-0">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full">
              <path fill="#ffffff" fillOpacity="1" d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,112C672,96,768,96,864,112C960,128,1056,160,1152,160C1248,160,1344,128,1392,112L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
            </svg>
          </div> */}
        </HeroHighlight>

        {/* Notices Section */}
        <section className="relative -mt-16 z-20 px-4 md:px-0">
          <div className="max-w-7xl mx-auto">
            <NoticeList notices={notices} compact={true} />
          </div>
        </section>

        {/* Featured Colleges Section */}
        <section className="py-24 relative overflow-hidden bg-gradient-to-br from-white via-blue-50/30 to-purple-50/30 dark:from-black dark:via-gray-900/40 dark:to-black">
          {/* Decorative circles */}
          <div className="absolute top-20 right-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-10 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <div className="text-center mb-16">
              {/* Section Badge */}
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-6 py-2 rounded-full text-sm font-bold mb-6">
                <Building2 className="w-4 h-4" />
                Top Institutions
              </div>

              <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-6">
                Featured Medical Colleges
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
                Handpicked institutions renowned for their excellence in medical education, state-of-the-art facilities, and outstanding clinical exposure.
              </p>
            </div>

            {colleges.length > 0 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                  {colleges.map((college) => (
                    <CollegeCard key={college.id} college={college} />
                  ))}
                </div>

                <div className="text-center">
                  <Link href="/colleges">
                    <Button
                      size="lg"
                      className="bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-700 text-white font-bold text-lg px-10 py-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group"
                    >
                      View All Colleges
                      <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </div>
              </>
            ) : (
              <div className="text-center py-20 bg-white dark:bg-gray-900 rounded-3xl border border-dashed border-gray-300 dark:border-gray-800 shadow-inner">
                <Building2 className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 text-lg mb-6">No colleges featured yet.</p>
                <Button variant="outline" disabled className="font-semibold">Check back soon</Button>
              </div>
            )}
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="py-24 bg-gradient-to-br from-gray-900 via-slate-900 to-gray-900 dark:from-black dark:via-gray-900 dark:to-black text-white relative overflow-hidden">
          {/* Animated glow effects */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary rounded-full filter blur-[120px] animate-pulse"></div>
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500 rounded-full filter blur-[120px] animate-pulse" style={{ animationDelay: '1s' }}></div>
            <div className="absolute top-1/2 left-1/2 w-[400px] h-[400px] bg-purple-500 rounded-full filter blur-[100px] animate-pulse" style={{ animationDelay: '2s' }}></div>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-black mb-6">
                Why Students Choose
                <span className="block bg-gradient-to-r from-primary to-blue-400 bg-clip-text text-transparent mt-2">
                  MetroSquare
                </span>
              </h2>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                Your trusted platform for making informed decisions about your medical education journey.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  icon: <Building2 className="w-8 h-8" />,
                  title: "Verified Colleges",
                  description: "Only authentic, verified medical institutions with complete details"
                },
                {
                  icon: <Users className="w-8 h-8" />,
                  title: "Expert Guidance",
                  description: "Professional support throughout your college selection process"
                },
                {
                  icon: <Award className="w-8 h-8" />,
                  title: "Latest Updates",
                  description: "Real-time notifications about admissions, exams, and notices"
                },
                {
                  icon: <TrendingUp className="w-8 h-8" />,
                  title: "Success Stories",
                  description: "Join thousands of students who found their dream college"
                }
              ].map((feature, index) => (
                <div key={index} className="group relative">
                  {/* Gradient border effect */}
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-primary via-blue-500 to-purple-500 rounded-3xl opacity-0 group-hover:opacity-100 blur transition duration-500"></div>
                  <div className="relative bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-8 hover:bg-white/15 transition-all duration-300 hover:scale-105 hover:shadow-2xl h-full">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary/20 to-blue-500/20 backdrop-blur-sm rounded-2xl mb-6 shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300">
                      <div className="w-16 h-16 bg-gradient-to-br from-primary to-blue-500 rounded-2xl flex items-center justify-center">
                        {feature.icon}
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold mb-3 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">{feature.title}</h3>
                    <p className="text-gray-300 leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <About />

        {/* Contact Section */}
        <div className="py-24 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-black dark:to-gray-900 relative overflow-hidden" id="contact" style={{ scrollMarginTop: "180px" }}>
          {/* Decorative background elements */}
          <div className="absolute top-10 left-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"></div>
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-5xl font-black text-gray-900 dark:text-white mb-6">Get in Touch</h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                Have questions? We'd love to hear from you. Send us a message or visit our location.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
              {/* Contact Form Side */}
              <div className="w-full">
                <div className="[&>section]:p-0 [&>section>div]:p-0 [&>section>div]:max-w-none [&>section>div>div]:max-w-none">
                  <ContactForm />
                </div>
              </div>

              {/* Google Map Side */}
              <div className="w-full h-full min-h-[600px] rounded-2xl overflow-hidden shadow-xl border border-white/50 dark:border-gray-800 bg-white/50 dark:bg-black/50 backdrop-blur-sm p-2">
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
                  <div className="absolute bottom-4 left-4 right-4 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md p-4 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700">
                    <h3 className="font-bold text-gray-900 dark:text-white">Our Location</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">27°41'16.0"N 85°21'00.0"E</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
