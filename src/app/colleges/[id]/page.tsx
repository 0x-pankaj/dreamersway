import { redirect } from "next/navigation";
import { getUniversity } from "@/lib/data";
import { supabase } from "@/lib/supabaseClient";

export default async function CollegeDetailRedirect({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    let u = await getUniversity(id);
    if (!u) {
        const { data } = await supabase.from("universities").select("slug").eq("id", id).maybeSingle();
        if (data?.slug) u = { slug: data.slug } as any;
    }
    redirect(u?.slug ? `/universities/${u.slug}` : "/universities");
}
