"use client";

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { Button } from '@/components/ui/button';
import { Trash2, Mail, Phone, Calendar } from 'lucide-react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

interface Contact {
    id: string;
    created_at: string;
    name: string;
    email: string;
    phone: string;
    subject: string;
    message: string;
    status: string;
}

export default function AdminContactsPage() {
    const [contacts, setContacts] = useState<Contact[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchContacts();
    }, []);

    const fetchContacts = async () => {
        const { data } = await supabase.from('contacts').select('*').order('created_at', { ascending: false });
        if (data) setContacts(data);
        setLoading(false);
    };

    const deleteContact = async (id: string, e: React.MouseEvent) => {
        e.stopPropagation();
        if (!confirm("Delete this inquiry?")) return;
        const { error } = await supabase.from('contacts').delete().eq('id', id);
        if (!error) fetchContacts();
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-900">Inquiries</h1>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Date</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Subject</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {loading ? (
                            <TableRow>
                                <TableCell colSpan={5} className="text-center py-8">Loading...</TableCell>
                            </TableRow>
                        ) : contacts.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={5} className="text-center py-8 text-gray-500">No inquiries yet.</TableCell>
                            </TableRow>
                        ) : (
                            contacts.map((contact) => (
                                <Dialog key={contact.id}>
                                    <DialogTrigger asChild>
                                        <TableRow className="cursor-pointer hover:bg-gray-50">
                                            <TableCell className="whitespace-nowrap tabular-nums text-gray-500">
                                                {new Date(contact.created_at).toLocaleDateString()}
                                            </TableCell>
                                            <TableCell className="font-medium">{contact.name}</TableCell>
                                            <TableCell className="max-w-[200px] truncate">{contact.subject || 'No Subject'}</TableCell>
                                            <TableCell>
                                                <span className="px-2 py-1 bg-blue-50 text-blue-700 rounded text-xs font-semibold uppercase">
                                                    {contact.status}
                                                </span>
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="h-8 w-8 text-red-600 z-10 relative"
                                                    onClick={(e) => deleteContact(contact.id, e)}
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    </DialogTrigger>
                                    <DialogContent className="max-w-md">
                                        <DialogHeader>
                                            <DialogTitle>Inquiry Details</DialogTitle>
                                        </DialogHeader>
                                        <div className="space-y-4 mt-4">
                                            <div className="flex items-center justify-between text-sm text-gray-500">
                                                <span className="flex items-center"><Calendar className="w-4 h-4 mr-2" /> {new Date(contact.created_at).toLocaleString()}</span>
                                            </div>

                                            <div className="space-y-2">
                                                <h3 className="font-bold text-lg">{contact.name}</h3>
                                                <div className="flex flex-col space-y-1 text-sm text-gray-600">
                                                    <a href={`mailto:${contact.email}`} className="flex items-center hover:text-primary"><Mail className="w-4 h-4 mr-2" /> {contact.email}</a>
                                                    <a href={`tel:${contact.phone}`} className="flex items-center hover:text-primary"><Phone className="w-4 h-4 mr-2" /> {contact.phone}</a>
                                                </div>
                                            </div>

                                            <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                                                <h4 className="font-semibold text-sm text-gray-700 mb-2">Subject: {contact.subject}</h4>
                                                <p className="text-gray-600 text-sm whitespace-pre-wrap">{contact.message}</p>
                                            </div>
                                        </div>
                                    </DialogContent>
                                </Dialog>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
