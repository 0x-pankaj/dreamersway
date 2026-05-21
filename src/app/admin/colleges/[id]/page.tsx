"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import CollegeForm from "@/components/admin/CollegeForm";
import { useParams } from "next/navigation";
import { University } from "@/types";

export default function EditUniversityPage() {
    const params = useParams();
    const [u, setU] = useState<University | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const run = async () => {
            if (!params.id) return;
            const { data } = await supabase.from("universities").select("*").eq("id", params.id).single();
            if (data) setU(data as University);
            setLoading(false);
        };
        run();
    }, [params.id]);

    if (loading) return <div>Loading...</div>;
    if (!u) return <div>University not found</div>;

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-gray-900">Edit University</h1>
            <CollegeForm initialData={u} />
        </div>
    );
}
