import Image from 'next/image'
import { supabase } from "@/lib/supabaseClient";
import { TeamMember } from "@/types";
import { Award, Users, GraduationCap, HeartHandshake } from "lucide-react";

export const revalidate = 0;

export default async function About() {
  let team: TeamMember[] = [];
  try {
    const { data } = await supabase.from('team_members').select('*').order('display_order', { ascending: true });
    if (data) team = data;
  } catch (err) {
    console.error(err);
  }

  return (
    <section className="py-24 bg-white dark:bg-gray-900" id="about">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* About Company */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-24">
          <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl">
            <Image
              src="https://images.unsplash.com/photo-1551601651-2a8555f1a136?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
              alt="Medical Consultancy"
              fill
              className="object-cover"
            />
            <div className="absolute -bottom-6 -left-6 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 hidden md:block">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold text-xl">
                  3+
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">Years of Excellence</p>
                  <p className="text-lg font-bold text-gray-900 dark:text-white">Trusted by Students</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <span className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-bold mb-4">
              <HeartHandshake className="w-4 h-4" />
              ABOUT US
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white mb-6 font-mont">
              Guiding Your Medical Journey
            </h2>
            <div className="space-y-4 text-gray-600 dark:text-gray-300 leading-relaxed">
              <p>
                Dreamers Way Consultancy is dedicated to helping students achieve their dreams of pursuing
                medical education in Nepal. With years of experience, we provide comprehensive guidance
                to aspiring medical professionals.
              </p>
              <p>
                We understand that choosing the right medical college is one of the most important
                decisions in a student&apos;s life. That&apos;s why we offer personalized counseling, complete
                admission assistance, and ongoing support throughout your educational journey.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-8">
              <div className="flex items-center gap-3 p-4 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <GraduationCap className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-lg font-bold text-gray-900 dark:text-white">Expert</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Counseling</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Award className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-lg font-bold text-gray-900 dark:text-white">Top</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Institutions</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Team Section */}
        {team.length > 0 && (
          <div>
            <div className="text-center mb-12">
              <span className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-bold mb-4">
                <Users className="w-4 h-4" />
                OUR TEAM
              </span>
              <h2 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white font-mont">
                Meet Our Experts
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mt-4 max-w-2xl mx-auto">
                Dedicated professionals committed to guiding you toward your medical career goals.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {team.map((member) => (
                <div key={member.id} className="group bg-white dark:bg-gray-800 rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-700 hover:border-primary/20 hover:shadow-xl transition-all duration-300">
                    <div className="relative h-72 overflow-hidden">
                    <Image
                      src={member.photo_url || '/placeholder-avatar.jpg'}
                      alt={member.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">{member.name}</h3>
                    <p className="text-primary font-semibold text-sm mb-3">{member.designation}</p>
                    {member.bio && (
                      <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">{member.bio}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
