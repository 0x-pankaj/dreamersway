import Image from 'next/image'
import { supabase } from "@/lib/supabaseClient";
import { TeamMember } from "@/types";

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
    <section className="py-24 bg-white" id="about">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-24">
          <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl">
            <Image
              src="https://images.unsplash.com/photo-1551601651-2a8555f1a136?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
              alt="Medical Consultancy"
              fill
              className="object-cover"
            />
            <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-lg border border-gray-100 hidden md:block">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold text-xl">
                  3+
                </div>
                <div>
                  <p className="text-sm text-gray-500 font-medium">Years of Excellence</p>
                  <p className="text-lg font-bold text-gray-900">Trusted by Students</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
