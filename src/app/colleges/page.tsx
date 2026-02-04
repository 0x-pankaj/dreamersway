
import { supabase } from "@/lib/supabaseClient";
import CollegeListing from "@/components/CollegeListing";
import { College } from "@/types";
import { Navigation } from "@/components/navigation";
import Footer from "@/components/sections/Footer";

export const revalidate = 0;

export default async function CollegesPage() {
    let colleges: College[] = [];

    try {
        const { data, error } = await supabase
            .from('colleges')
            .select('*')
            .order('name');

        if (data) colleges = data;
        if (error) console.error("Error fetching colleges:", error);
    } catch (err) {
        console.error("Fetch error:", err);
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-black flex flex-col">
            <Navigation />
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-24 flex-1 w-full">
                <div className="mb-8">
                    <h1 className="text-4xl font-light text-gray-900 dark:text-white mb-4 font-mont">
                        Medical Colleges in Nepal
                    </h1>
                    <p className="text-gray-600 dark:text-gray-300 max-w-2xl">
                        Browse through our comprehensive list of medical colleges. Use the filters to find institutions affiliated with specific universities or by type.
                    </p>
                </div>

                <CollegeListing initialColleges={colleges} />
            </main>
            <Footer />
        </div>
    );
}
