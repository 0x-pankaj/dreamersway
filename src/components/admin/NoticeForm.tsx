"use client";

import { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { CheckCircle } from 'lucide-react';
import FileUpload from './FileUpload';
import { Notice } from '@/types';

interface NoticeFormProps {
    notice?: Notice; // If provided, we're editing
}

export default function NoticeForm({ notice }: NoticeFormProps) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [formData, setFormData] = useState({
        title: notice?.title || '',
        content: notice?.content || '',
        publish_date: notice?.publish_date?.split('T')[0] || new Date().toISOString().split('T')[0],
        is_important: notice?.is_important || false,
        attachment_url: notice?.attachment_url || ''
    });

    const isEditing = !!notice;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setSuccess(false);

        try {
            if (isEditing) {
                const { error } = await supabase
                    .from('notices')
                    .update(formData)
                    .eq('id', notice.id);
                if (error) throw error;
            } else {
                const { error } = await supabase.from('notices').insert([formData]);
                if (error) throw error;
            }

            setSuccess(true);
            setTimeout(() => {
                router.push('/admin/notices');
                router.refresh();
            }, 1000);
        } catch (error) {
            alert("Error saving notice");
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl bg-white p-8 rounded-xl border border-gray-200">
            {success && (
                <div className="flex items-center gap-2 text-green-600 bg-green-50 px-4 py-3 rounded-lg">
                    <CheckCircle className="w-5 h-5" />
                    <span className="font-medium">
                        Notice {isEditing ? 'updated' : 'created'} successfully! Redirecting...
                    </span>
                </div>
            )}

            <div className="space-y-2">
                <Label>Notice Title *</Label>
                <Input
                    required
                    value={formData.title}
                    onChange={e => setFormData({ ...formData, title: e.target.value })}
                />
            </div>

            <div className="space-y-2">
                <Label>Content / Description</Label>
                <textarea
                    className="flex min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    value={formData.content}
                    onChange={e => setFormData({ ...formData, content: e.target.value })}
                    placeholder="Optional description for the notice..."
                />
            </div>

            <div className="space-y-2">
                <Label>Publish Date</Label>
                <Input
                    type="date"
                    required
                    value={formData.publish_date}
                    onChange={e => setFormData({ ...formData, publish_date: e.target.value })}
                />
            </div>

            <div className="space-y-2">
                <FileUpload
                    label="Attachment (Image or PDF)"
                    value={formData.attachment_url}
                    onChange={(url) => setFormData({ ...formData, attachment_url: url })}
                    bucket="images"
                    accept="image/*,application/pdf"
                />
            </div>

            <div className="flex items-center gap-2">
                <Checkbox
                    id="important"
                    checked={formData.is_important}
                    onCheckedChange={(c) => setFormData({ ...formData, is_important: c as boolean })}
                />
                <Label htmlFor="important">Mark as Important</Label>
            </div>

            <div className="flex justify-end gap-4">
                <Button type="button" variant="outline" onClick={() => router.back()}>Cancel</Button>
                <Button type="submit" disabled={loading}>
                    {loading ? 'Saving...' : isEditing ? 'Update Notice' : 'Create Notice'}
                </Button>
            </div>
        </form>
    );
}
