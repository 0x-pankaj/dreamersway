"use client";

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useParams } from 'next/navigation';
import TeamForm from '@/components/admin/TeamForm';
import { TeamMember } from '@/types';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function EditTeamMemberPage() {
    const params = useParams();
    const [member, setMember] = useState<TeamMember | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchMember = async () => {
            try {
                const { data, error } = await supabase
                    .from('team_members')
                    .select('*')
                    .eq('id', params.id)
                    .single();

                if (error) throw error;
                if (!data) throw new Error('Team member not found');

                setMember(data);
            } catch (err) {
                console.error('Error fetching team member:', err);
                setError('Team member not found');
            } finally {
                setLoading(false);
            }
        };

        if (params.id) {
            fetchMember();
        }
    }, [params.id]);

    if (loading) {
        return (
            <div className="flex items-center justify-center py-20">
                <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
            </div>
        );
    }

    if (error || !member) {
        return (
            <div className="text-center py-20">
                <h2 className="text-xl font-semibold text-gray-900 mb-2">Team Member Not Found</h2>
                <p className="text-gray-600 mb-6">The team member you&apos;re looking for doesn&apos;t exist or has been deleted.</p>
                <Link href="/admin/team">
                    <Button variant="outline">
                        <ArrowLeft className="w-4 h-4 mr-2" /> Back to Team
                    </Button>
                </Link>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-4">
                <Link href="/admin/team">
                    <Button variant="ghost" size="icon">
                        <ArrowLeft className="w-5 h-5" />
                    </Button>
                </Link>
                <h1 className="text-2xl font-bold text-gray-900">Edit Team Member</h1>
            </div>

            <TeamForm member={member} />
        </div>
    );
}
