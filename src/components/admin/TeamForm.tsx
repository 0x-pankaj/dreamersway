"use client";

import { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import ImageUpload from './ImageUpload';
import { TeamMember } from '@/types';

interface TeamFormProps {
    member?: TeamMember; // If provided, we're editing
}

export default function TeamForm({ member }: TeamFormProps) {
    const router = useRouter();
    const isEditing = !!member;
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: member?.name || '',
        designation: member?.designation || '',
        photo_url: member?.photo_url || '',
        bio: member?.bio || '',
        display_order: member?.display_order ?? 0
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            if (isEditing) {
                const { error } = await supabase.from('team_members').update(formData).eq('id', member!.id);
                if (error) throw error;
            } else {
                const { error } = await supabase.from('team_members').insert([formData]);
                if (error) throw error;
            }

            router.push('/admin/team');
            router.refresh();
        } catch (error: any) {
            alert("Error saving team member: " + (error?.message || ''));
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl bg-white p-8 rounded-xl border border-gray-200">
            <div className="space-y-2">
                <Label>Full Name *</Label>
                <Input required value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} />
            </div>

            <div className="space-y-2">
                <Label>Designation *</Label>
                <Input required value={formData.designation} onChange={e => setFormData({ ...formData, designation: e.target.value })} />
            </div>

            <div className="space-y-2">
                <ImageUpload
                    label="Profile Photo"
                    value={formData.photo_url}
                    onChange={(url) => setFormData({ ...formData, photo_url: url })}
                />
            </div>

            <div className="space-y-2">
                <Label>Bio</Label>
                <Textarea value={formData.bio} onChange={e => setFormData({ ...formData, bio: e.target.value })} />
            </div>

            <div className="space-y-2">
                <Label>Display Order</Label>
                <Input type="number" value={formData.display_order} onChange={e => setFormData({ ...formData, display_order: parseInt(e.target.value) })} />
            </div>

            <div className="flex justify-end gap-4">
                <Button type="button" variant="outline" onClick={() => router.back()}>Cancel</Button>
                <Button type="submit" disabled={loading}>{loading ? 'Saving...' : isEditing ? 'Update Member' : 'Add Member'}</Button>
            </div>
        </form>
    );
}
