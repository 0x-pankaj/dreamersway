
import { supabase } from "@/lib/supabaseClient";
import NoticeList from "@/components/NoticeList";
import { Notice } from "@/types";
import { Navigation } from "@/components/navigation";
import Footer from "@/components/sections/Footer";

export const revalidate = 0;

export default async function NoticesPage() {
    let notices: Notice[] = [];

    try {
        const { data, error } = await supabase
            .from('notices')
            .select('*')
            .order('publish_date', { ascending: false });

        if (data) notices = data;
    } catch (err) {
        console.error("Fetch error:", err);
    }

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Navigation />
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-24 flex-1 w-full">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-light text-gray-900 mb-4 font-mont">
                        Notices & Announcements
                    </h1>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Stay updated with the latest news from universities, entrance exams, and admission deadlines.
                    </p>
                </div>

                <div className="max-w-4xl mx-auto">
                    <NoticeList notices={notices} />
                </div>
            </main>
            <Footer />
        </div>
    );
}
