"use client";

import { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Trash2, Plus } from 'lucide-react';
import ImageUpload from './ImageUpload';

import { College } from '@/types';

interface CollegeFormProps {
    initialData?: College | null;
}

export default function CollegeForm({ initialData }: CollegeFormProps) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: initialData?.name || '',
        address: initialData?.address || '',
        affiliation: initialData?.affiliation || '',
        college_type: initialData?.college_type || 'Private',
        cover_image_url: initialData?.cover_image_url || '',
        logo_url: initialData?.logo_url || '',
        website_url: initialData?.website_url || '',
        contact_email: initialData?.contact_email || '',
        contact_phone: initialData?.contact_phone || '',
        established_year: initialData?.established_year ? parseInt(initialData.established_year) : new Date().getFullYear(),
        bed_capacity: initialData?.bed_capacity ? parseInt(initialData.bed_capacity) : 0,
        hospital_address: initialData?.hospital_address || '',
        description: initialData?.description || '',
        is_featured: initialData?.is_featured || false,
        facilities: initialData?.facilities || [] as string[],
        facilityInput: '',

        // Rich Data
        recognised_by: initialData?.recognised_by || [] as string[],
        recognisedInput: '',

        highlights: initialData?.highlights || [] as string[],
        highlightInput: '',

        nearest_borders: initialData?.nearest_borders || [] as { name: string; distance: string }[],
        borderName: '',
        borderDist: '',

        access_modes: initialData?.access_modes || [] as { mode: string; description: string }[],
        accessMode: '',
        accessDesc: '',

        programs_bachelor: initialData?.programs_bachelor || [] as string[],
        programBachInput: '',

        programs_pg: initialData?.programs_pg || [] as string[],
        programPgInput: '',

        additional_info: initialData?.additional_info || ''
    });

    // Helper handling
    const addItem = (field: 'facilities' | 'recognised_by' | 'highlights' | 'programs_bachelor' | 'programs_pg', inputField: string) => {
        // @ts-ignore
        if (formData[inputField].trim()) {
            setFormData(prev => ({
                ...prev,
                // @ts-ignore
                [field]: [...prev[field], prev[inputField].trim()],
                [inputField]: ''
            }));
        }
    };

    const removeItem = (field: 'facilities' | 'recognised_by' | 'highlights' | 'programs_bachelor' | 'programs_pg', index: number) => {
        setFormData(prev => ({
            ...prev,
            // @ts-ignore
            [field]: prev[field].filter((_, i) => i !== index)
        }));
    };

    const addBorder = () => {
        if (formData.borderName && formData.borderDist) {
            setFormData(prev => ({
                ...prev,
                nearest_borders: [...prev.nearest_borders, { name: prev.borderName, distance: prev.borderDist }],
                borderName: '',
                borderDist: ''
            }));
        }
    };

    const addAccess = () => {
        if (formData.accessMode && formData.accessDesc) {
            setFormData(prev => ({
                ...prev,
                access_modes: [...prev.access_modes, { mode: prev.accessMode, description: prev.accessDesc }],
                accessMode: '',
                accessDesc: ''
            }));
        }
    };


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            // Remove inputs before sending
            const {
                facilityInput, recognisedInput, highlightInput,
                borderName, borderDist, accessMode, accessDesc,
                programBachInput, programPgInput,
                ...submitData
            } = formData;

            // Generate slug from name
            const slug = submitData.name
                .toLowerCase()
                .trim()
                .replace(/[^\w\s-]/g, '')
                .replace(/[\s_-]+/g, '-')
                .replace(/^-+|-+$/g, '');

            const finalData = {
                ...submitData,
                slug,
                established_year: submitData.established_year.toString(),
                bed_capacity: submitData.bed_capacity.toString()
            };

            if (initialData?.id) {
                // Update
                const { error } = await supabase
                    .from('colleges')
                    .update(finalData)
                    .eq('id', initialData.id);
                if (error) throw error;
            } else {
                // Insert
                const { error } = await supabase.from('colleges').insert([finalData]);
                if (error) throw error;
            }

            router.push('/admin/colleges');
            router.refresh();
        } catch (error) {
            alert("Error saving college");
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-8 max-w-5xl bg-white p-8 rounded-xl border border-gray-200 shadow-sm">

            {/* Basic Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <Label>College Name *</Label>
                    <Input required value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} />
                </div>

                <div className="space-y-2">
                    <Label>College Address *</Label>
                    <Input required value={formData.address} onChange={e => setFormData({ ...formData, address: e.target.value })} />
                </div>

                <div className="space-y-2">
                    <Label>Hospital Address</Label>
                    <Input value={formData.hospital_address} onChange={e => setFormData({ ...formData, hospital_address: e.target.value })} placeholder="If different from college" />
                </div>

                <div className="space-y-2">
                    <Label>Affiliation</Label>
                    <Select onValueChange={(v) => setFormData({ ...formData, affiliation: v })}>
                        <SelectTrigger>
                            <SelectValue placeholder="Select Affiliation" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="Tribhuvan University (TU)">Tribhuvan University (TU)</SelectItem>
                            <SelectItem value="Kathmandu University (KU)">Kathmandu University (KU)</SelectItem>
                            <SelectItem value="Purbanchal University (PU)">Purbanchal University (PU)</SelectItem>
                            <SelectItem value="Pokhara University (PoU)">Pokhara University (PoU)</SelectItem>
                            <SelectItem value="BPKIHS">BPKIHS</SelectItem>
                            <SelectItem value="P.A.H.S">P.A.H.S</SelectItem>
                            <SelectItem value="K.A.H.S">K.A.H.S</SelectItem>
                            <SelectItem value="M.I.H.S">M.I.H.S</SelectItem>
                            <SelectItem value="R.A.H.S">R.A.H.S</SelectItem>
                            <SelectItem value="N.A.M.S">N.A.M.S</SelectItem>
                            <SelectItem value="Foreign Affiliation">Foreign Affiliation</SelectItem>
                            <SelectItem value="CTEVT">CTEVT</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="space-y-2">
                    <Label>Type</Label>
                    <Select defaultValue={formData.college_type} onValueChange={(v) => setFormData({ ...formData, college_type: v })}>
                        <SelectTrigger>
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="Government">Government</SelectItem>
                            <SelectItem value="Private">Private</SelectItem>
                            <SelectItem value="Community">Community</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="space-y-2">
                    <Label>Established Year</Label>
                    <Input type="number" value={formData.established_year} onChange={e => setFormData({ ...formData, established_year: parseInt(e.target.value) })} />
                </div>

                <div className="space-y-2">
                    <Label>Bed Capacity</Label>
                    <Input type="number" value={formData.bed_capacity} onChange={e => setFormData({ ...formData, bed_capacity: parseInt(e.target.value) })} />
                </div>
            </div>

            {/* Images */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <ImageUpload
                    label="Cover Image"
                    value={formData.cover_image_url}
                    onChange={(url) => setFormData({ ...formData, cover_image_url: url })}
                />
                <ImageUpload
                    label="Logo Image"
                    value={formData.logo_url}
                    onChange={(url) => setFormData({ ...formData, logo_url: url })}
                />
            </div>

            {/* Dynamic Lists Section */}
            <div className="space-y-6 border-t pt-6">
                <h3 className="text-lg font-semibold text-gray-800">College Details</h3>

                {/* Recognised By */}
                <div className="space-y-2">
                    <Label>Recognised By</Label>
                    <div className="flex gap-2">
                        <Input value={formData.recognisedInput} onChange={e => setFormData({ ...formData, recognisedInput: e.target.value })} placeholder="e.g. Nepal Medical Council" />
                        <Button type="button" onClick={() => addItem('recognised_by', 'recognisedInput')}><Plus className="w-4 h-4" /></Button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {formData.recognised_by.map((item, i) => (
                            <span key={i} className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm flex items-center gap-2">
                                {item} <button type="button" onClick={() => removeItem('recognised_by', i)}>&times;</button>
                            </span>
                        ))}
                    </div>
                </div>

                {/* Highlights */}
                <div className="space-y-2">
                    <Label>Highlights</Label>
                    <div className="flex gap-2">
                        <Input value={formData.highlightInput} onChange={e => setFormData({ ...formData, highlightInput: e.target.value })} placeholder="e.g. Located in Medical City" />
                        <Button type="button" onClick={() => addItem('highlights', 'highlightInput')}><Plus className="w-4 h-4" /></Button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {formData.highlights.map((item, i) => (
                            <span key={i} className="bg-yellow-50 text-yellow-700 px-3 py-1 rounded-full text-sm flex items-center gap-2">
                                {item} <button type="button" onClick={() => removeItem('highlights', i)}>&times;</button>
                            </span>
                        ))}
                    </div>
                </div>

                {/* Facilities */}
                <div className="space-y-2">
                    <Label>Facilities</Label>
                    <div className="flex gap-2">
                        <Input value={formData.facilityInput} onChange={e => setFormData({ ...formData, facilityInput: e.target.value })} placeholder="e.g. Hostel, Library" />
                        <Button type="button" onClick={() => addItem('facilities', 'facilityInput')}><Plus className="w-4 h-4" /></Button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {formData.facilities.map((item, i) => (
                            <span key={i} className="bg-green-50 text-green-700 px-3 py-1 rounded-full text-sm flex items-center gap-2">
                                {item} <button type="button" onClick={() => removeItem('facilities', i)}>&times;</button>
                            </span>
                        ))}
                    </div>
                </div>
            </div>

            {/* Transportation & Location */}
            <div className="space-y-6 border-t pt-6">
                <h3 className="text-lg font-semibold text-gray-800">Location & Access</h3>

                {/* Nearest Borders */}
                <div className="space-y-2">
                    <Label>Nearest Indian Borders</Label>
                    <div className="grid grid-cols-2 gap-2">
                        <Input value={formData.borderName} onChange={e => setFormData({ ...formData, borderName: e.target.value })} placeholder="Border Name (e.g. Raxaul)" />
                        <Input value={formData.borderDist} onChange={e => setFormData({ ...formData, borderDist: e.target.value })} placeholder="Distance (e.g. 140 km)" />
                        <Button type="button" onClick={addBorder} className="col-span-2">Add Border Info</Button>
                    </div>
                    <div className="space-y-2 mt-2">
                        {formData.nearest_borders.map((item, i) => (
                            <div key={i} className="flex justify-between items-center bg-gray-50 p-2 rounded">
                                <span className="text-sm"><strong>{item.distance}</strong> from {item.name}</span>
                                <Button type="button" variant="ghost" size="sm" onClick={() => setFormData(p => ({ ...p, nearest_borders: p.nearest_borders.filter((_, idx) => idx !== i) }))}>
                                    <Trash2 className="w-4 h-4 text-red-500" />
                                </Button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Access Modes */}
                <div className="space-y-2">
                    <Label>Access From / How To Reach</Label>
                    <div className="grid grid-cols-2 gap-2">
                        <Input value={formData.accessMode} onChange={e => setFormData({ ...formData, accessMode: e.target.value })} placeholder="Mode (e.g. Bus, Flight)" />
                        <Input value={formData.accessDesc} onChange={e => setFormData({ ...formData, accessDesc: e.target.value })} placeholder="Details (e.g. Direct bus from Patna)" />
                        <Button type="button" onClick={addAccess} className="col-span-2">Add Access Info</Button>
                    </div>
                    <div className="space-y-2 mt-2">
                        {formData.access_modes.map((item, i) => (
                            <div key={i} className="flex justify-between items-center bg-gray-50 p-2 rounded">
                                <span className="text-sm"><strong>{item.mode}</strong>: {item.description}</span>
                                <Button type="button" variant="ghost" size="sm" onClick={() => setFormData(p => ({ ...p, access_modes: p.access_modes.filter((_, idx) => idx !== i) }))}>
                                    <Trash2 className="w-4 h-4 text-red-500" />
                                </Button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Programs */}
            <div className="space-y-6 border-t pt-6">
                <h3 className="text-lg font-semibold text-gray-800">Academic Programs</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Bachelors */}
                    <div className="space-y-2">
                        <Label>Bachelors Level</Label>
                        <div className="flex gap-2">
                            <Input value={formData.programBachInput} onChange={e => setFormData({ ...formData, programBachInput: e.target.value })} placeholder="e.g. MBBS, BDS" />
                            <Button type="button" onClick={() => addItem('programs_bachelor', 'programBachInput')}><Plus className="w-4 h-4" /></Button>
                        </div>
                        <ul className="list-disc list-inside text-sm text-gray-600 mt-2">
                            {formData.programs_bachelor.map((item, i) => (
                                <li key={i} className="flex justify-between hover:bg-gray-50 p-1">
                                    {item} <button type="button" onClick={() => removeItem('programs_bachelor', i)} className="text-red-500">&times;</button>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* PG */}
                    <div className="space-y-2">
                        <Label>Post Graduate Level</Label>
                        <div className="flex gap-2">
                            <Input value={formData.programPgInput} onChange={e => setFormData({ ...formData, programPgInput: e.target.value })} placeholder="e.g. MD (General Practice)" />
                            <Button type="button" onClick={() => addItem('programs_pg', 'programPgInput')}><Plus className="w-4 h-4" /></Button>
                        </div>
                        <ul className="list-disc list-inside text-sm text-gray-600 mt-2">
                            {formData.programs_pg.map((item, i) => (
                                <li key={i} className="flex justify-between hover:bg-gray-50 p-1">
                                    {item} <button type="button" onClick={() => removeItem('programs_pg', i)} className="text-red-500">&times;</button>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>

            {/* Additional Info */}
            <div className="space-y-2 border-t pt-6">
                <Label>Additional Information / Description</Label>
                <Textarea rows={5} value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} placeholder="General description..." />
                <Label className="mt-4 block">Extra Notes (Markdown supported)</Label>
                <Textarea rows={3} value={formData.additional_info} onChange={e => setFormData({ ...formData, additional_info: e.target.value })} placeholder="Any other info..." />
            </div>

            <div className="flex items-center gap-2">
                <Checkbox
                    id="featured"
                    checked={formData.is_featured}
                    onCheckedChange={(c) => setFormData({ ...formData, is_featured: c as boolean })}
                />
                <Label htmlFor="featured">Feature this college on homepage</Label>
            </div>

            <div className="flex justify-end gap-4 pb-12">
                <Button type="button" variant="outline" onClick={() => router.back()}>Cancel</Button>
                <Button type="submit" disabled={loading} size="lg">{loading ? 'Saving...' : (initialData ? 'Update College' : 'Create College')}</Button>
            </div>
        </form>
    );
}
