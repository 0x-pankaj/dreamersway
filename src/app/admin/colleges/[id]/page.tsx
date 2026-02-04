'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import CollegeForm from "@/components/admin/CollegeForm";
import { useParams, useRouter } from 'next/navigation';
import { College } from '@/types';

export default function EditCollegePage() {
    const params = useParams();
    const [college, setCollege] = useState<College | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCollege = async () => {
            if (!params.id) return;

            const { data, error } = await supabase
                .from('colleges')
                .select('*')
                .eq('id', params.id)
                .single();

            if (data) setCollege(data);
            if (error) console.error("Error fetching college:", error);
            setLoading(false);
        };

        fetchCollege();
    }, [params.id]);

    if (loading) return <div>Loading...</div>;
    if (!college) return <div>College not found</div>;

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-gray-900">Edit College</h1>
            <CollegeForm initialData={college} />
        </div>
    );
}
