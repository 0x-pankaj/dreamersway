"use client";

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { Button } from '@/components/ui/button';
import { College } from '@/types';
import { Edit, Trash2, Plus, Star } from 'lucide-react';
import Link from 'next/link';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

export default function AdminCollegesPage() {
    const [colleges, setColleges] = useState<College[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchColleges();
    }, []);

    const fetchColleges = async () => {
        const { data, error } = await supabase
            .from('colleges')
            .select('*')
            .order('created_at', { ascending: false });

        if (data) setColleges(data);
        setLoading(false);
    };

    const deleteCollege = async (id: string) => {
        if (!confirm("Are you sure you want to delete this college?")) return;

        const { error } = await supabase.from('colleges').delete().eq('id', id);
        if (!error) fetchColleges();
    };

    const toggleFeatured = async (id: string, current: boolean) => {
        const { error } = await supabase.from('colleges').update({ is_featured: !current }).eq('id', id);
        if (!error) fetchColleges();
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-900">Manage Colleges</h1>
                <Link href="/admin/colleges/new">
                    <Button className="bg-primary hover:bg-primary/90 text-white">
                        <Plus className="w-4 h-4 mr-2" /> Add College
                    </Button>
                </Link>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Location</TableHead>
                            <TableHead>Affiliation</TableHead>
                            <TableHead>Type</TableHead>
                            <TableHead className="text-center">Featured</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {loading ? (
                            <TableRow>
                                <TableCell colSpan={6} className="text-center py-8">Loading...</TableCell>
                            </TableRow>
                        ) : colleges.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={6} className="text-center py-8 text-gray-500">No colleges found. Add one to get started.</TableCell>
                            </TableRow>
                        ) : (
                            colleges.map((college) => (
                                <TableRow key={college.id}>
                                    <TableCell className="font-medium">{college.name}</TableCell>
                                    <TableCell>{college.address}</TableCell>
                                    <TableCell>{college.affiliation}</TableCell>
                                    <TableCell>{college.college_type}</TableCell>
                                    <TableCell className="text-center">
                                        <button onClick={() => toggleFeatured(college.id, college.is_featured)}>
                                            <Star className={`w-5 h-5 mx-auto ${college.is_featured ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} />
                                        </button>
                                    </TableCell>
                                    <TableCell className="text-right gap-2">
                                        <div className="flex justify-end gap-2">
                                            <Button variant="ghost" size="icon" className="h-8 w-8 text-blue-600">
                                                <Edit className="w-4 h-4" />
                                            </Button>
                                            <Button variant="ghost" size="icon" className="h-8 w-8 text-red-600" onClick={() => deleteCollege(college.id)}>
                                                <Trash2 className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
