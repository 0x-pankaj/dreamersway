"use client";

import { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import ImageUpload from './ImageUpload';

export default function TeamForm() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        designation: '',
        photo_url: '',
        bio: '',
        display_order: 0
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const { error } = await supabase.from('team_members').insert([formData]);
            if (error) throw error;

            router.push('/admin/team');
            router.refresh();
        } catch (error) {
            alert("Error saving team member");
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
                <Button type="submit" disabled={loading}>{loading ? 'Saving...' : 'Add Member'}</Button>
            </div>
        </form>
    );
}
