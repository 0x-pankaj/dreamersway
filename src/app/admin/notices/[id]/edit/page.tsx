"use client";

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useParams, useRouter } from 'next/navigation';
import NoticeForm from '@/components/admin/NoticeForm';
import { Notice } from '@/types';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function EditNoticePage() {
    const params = useParams();
    const router = useRouter();
    const [notice, setNotice] = useState<Notice | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchNotice = async () => {
            try {
                const { data, error } = await supabase
                    .from('notices')
                    .select('*')
                    .eq('id', params.id)
                    .single();

                if (error) throw error;
                if (!data) throw new Error('Notice not found');

                setNotice(data);
            } catch (err) {
                console.error('Error fetching notice:', err);
                setError('Notice not found');
            } finally {
                setLoading(false);
            }
        };

        if (params.id) {
            fetchNotice();
        }
    }, [params.id]);

    if (loading) {
        return (
            <div className="flex items-center justify-center py-20">
                <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
            </div>
        );
    }

    if (error || !notice) {
        return (
            <div className="text-center py-20">
                <h2 className="text-xl font-semibold text-gray-900 mb-2">Notice Not Found</h2>
                <p className="text-gray-600 mb-6">The notice you're looking for doesn't exist or has been deleted.</p>
                <Link href="/admin/notices">
                    <Button variant="outline">
                        <ArrowLeft className="w-4 h-4 mr-2" /> Back to Notices
                    </Button>
                </Link>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-4">
                <Link href="/admin/notices">
                    <Button variant="ghost" size="icon">
                        <ArrowLeft className="w-5 h-5" />
                    </Button>
                </Link>
                <h1 className="text-2xl font-bold text-gray-900">Edit Notice</h1>
            </div>

            <NoticeForm notice={notice} />
        </div>
    );
}
