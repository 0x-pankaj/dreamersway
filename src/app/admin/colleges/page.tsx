"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Button } from "@/components/ui/button";
import { University } from "@/types";
import { Edit, Trash2, Plus, Star } from "lucide-react";
import Link from "next/link";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { countryByCode } from "@/lib/site-config";

export default function AdminUniversitiesPage() {
    const [universities, setUniversities] = useState<University[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchUniversities();
    }, []);

    const fetchUniversities = async () => {
        const { data } = await supabase
            .from("universities")
            .select("*")
            .order("created_at", { ascending: false });
        if (data) setUniversities(data as University[]);
        setLoading(false);
    };

    const deleteUniversity = async (id: string) => {
        if (!confirm("Are you sure you want to delete this university?")) return;
        const { error } = await supabase.from("universities").delete().eq("id", id);
        if (!error) fetchUniversities();
    };

    const toggleFeatured = async (id: string, current: boolean) => {
        const { error } = await supabase.from("universities").update({ is_featured: !current }).eq("id", id);
        if (!error) fetchUniversities();
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-900">Manage Universities</h1>
                <Link href="/admin/colleges/new">
                    <Button className="bg-primary hover:bg-primary/90 text-white">
                        <Plus className="w-4 h-4 mr-2" /> Add University
                    </Button>
                </Link>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Country</TableHead>
                            <TableHead>Streams</TableHead>
                            <TableHead>Type</TableHead>
                            <TableHead className="text-center">Featured</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {loading ? (
                            <TableRow><TableCell colSpan={6} className="text-center py-8">Loading...</TableCell></TableRow>
                        ) : universities.length === 0 ? (
                            <TableRow><TableCell colSpan={6} className="text-center py-8 text-gray-500">No universities yet. Add one to get started.</TableCell></TableRow>
                        ) : (
                            universities.map((u) => {
                                const c = countryByCode(u.country_code);
                                return (
                                    <TableRow key={u.id}>
                                        <TableCell className="font-medium">{u.name}</TableCell>
                                        <TableCell>{c ? `${c.flag} ${c.name}` : u.country_code}</TableCell>
                                        <TableCell>{(u.stream_codes || []).join(", ")}</TableCell>
                                        <TableCell>{u.university_type}</TableCell>
                                        <TableCell className="text-center">
                                            <button onClick={() => toggleFeatured(u.id, u.is_featured)}>
                                                <Star className={`w-5 h-5 mx-auto ${u.is_featured ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`} />
                                            </button>
                                        </TableCell>
                                        <TableCell className="text-right gap-2">
                                            <div className="flex justify-end gap-2">
                                                <Link href={`/admin/colleges/${u.id}`}>
                                                    <Button variant="ghost" size="icon" className="h-8 w-8 text-blue-600">
                                                        <Edit className="w-4 h-4" />
                                                    </Button>
                                                </Link>
                                                <Button variant="ghost" size="icon" className="h-8 w-8 text-red-600" onClick={() => deleteUniversity(u.id)}>
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
        </div>
    );
}
