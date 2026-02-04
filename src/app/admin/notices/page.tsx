"use client";

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { Button } from '@/components/ui/button';
import { Notice } from '@/types';
import { Edit, Trash2, Plus, FileText, ImageIcon } from 'lucide-react';
import Link from 'next/link';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";

function getFileType(url: string): 'image' | 'pdf' | 'other' | null {
    if (!url) return null;
    const ext = url.split('.').pop()?.toLowerCase();
    if (['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg'].includes(ext || '')) {
        return 'image';
    }
    if (ext === 'pdf') {
        return 'pdf';
    }
    return 'other';
}

export default function AdminNoticesPage() {
    const [notices, setNotices] = useState<Notice[]>([]);
    const [loading, setLoading] = useState(true);
    const [deleteId, setDeleteId] = useState<string | null>(null);
    const [deleting, setDeleting] = useState(false);

    useEffect(() => {
        fetchNotices();
    }, []);

    const fetchNotices = async () => {
        const { data } = await supabase.from('notices').select('*').order('publish_date', { ascending: false });
        if (data) setNotices(data);
        setLoading(false);
    };

    const handleDelete = async () => {
        if (!deleteId) return;

        setDeleting(true);
        try {
            const { error } = await supabase.from('notices').delete().eq('id', deleteId);
            if (error) throw error;

            setNotices(notices.filter(n => n.id !== deleteId));
        } catch (error) {
            console.error('Error deleting notice:', error);
            alert('Error deleting notice');
        } finally {
            setDeleting(false);
            setDeleteId(null);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-900">Manage Notices</h1>
                <Link href="/admin/notices/new">
                    <Button className="bg-primary hover:bg-primary/90 text-white">
                        <Plus className="w-4 h-4 mr-2" /> Add Notice
                    </Button>
                </Link>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Title</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead className="text-center">Attachment</TableHead>
                            <TableHead className="text-center">Important</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {loading ? (
                            <TableRow>
                                <TableCell colSpan={5} className="text-center py-8">Loading...</TableCell>
                            </TableRow>
                        ) : notices.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={5} className="text-center py-8 text-gray-500">No notices found.</TableCell>
                            </TableRow>
                        ) : (
                            notices.map((notice) => {
                                const fileType = getFileType(notice.attachment_url || '');
                                return (
                                    <TableRow key={notice.id}>
                                        <TableCell className="font-medium">{notice.title}</TableCell>
                                        <TableCell>{new Date(notice.publish_date).toLocaleDateString()}</TableCell>
                                        <TableCell className="text-center">
                                            {fileType === 'image' && (
                                                <span className="inline-flex items-center gap-1 text-blue-600 text-sm">
                                                    <ImageIcon className="w-4 h-4" /> Image
                                                </span>
                                            )}
                                            {fileType === 'pdf' && (
                                                <span className="inline-flex items-center gap-1 text-red-600 text-sm">
                                                    <FileText className="w-4 h-4" /> PDF
                                                </span>
                                            )}
                                            {!fileType && <span className="text-gray-400 text-sm">None</span>}
                                        </TableCell>
                                        <TableCell className="text-center">
                                            {notice.is_important ? (
                                                <span className="inline-block px-2 py-1 text-xs font-semibold rounded bg-red-100 text-red-700">Yes</span>
                                            ) : (
                                                <span className="text-gray-400">No</span>
                                            )}
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <div className="flex justify-end gap-2">
                                                <Link href={`/admin/notices/${notice.id}/edit`}>
                                                    <Button variant="ghost" size="icon" className="h-8 w-8">
                                                        <Edit className="w-4 h-4" />
                                                    </Button>
                                                </Link>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50"
                                                    onClick={() => setDeleteId(notice.id)}
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                );
                            })
                        )}
                    </TableBody>
                </Table>
            </div>

            {/* Delete Confirmation Dialog */}
            <AlertDialog open={!!deleteId} onOpenChange={(open) => !open && setDeleteId(null)}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Delete Notice</AlertDialogTitle>
                        <AlertDialogDescription>
                            Are you sure you want to delete this notice? This action cannot be undone.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel disabled={deleting}>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={handleDelete}
                            disabled={deleting}
                            className="bg-red-600 hover:bg-red-700"
                        >
                            {deleting ? 'Deleting...' : 'Delete'}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
}
