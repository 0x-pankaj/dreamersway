"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Trash2, Plus } from "lucide-react";
import ImageUpload from "./ImageUpload";
import type { University } from "@/types";
import { siteConfig } from "@/lib/site-config";

interface Props {
    initialData?: University | null;
}

const slugify = (s: string) =>
    s.toLowerCase().trim().replace(/[^\w\s-]/g, "").replace(/[\s_-]+/g, "-").replace(/^-+|-+$/g, "");

export default function CollegeForm({ initialData }: Props) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: initialData?.name || "",
        slug: initialData?.slug || "",
        country_code: initialData?.country_code || "nepal",
        stream_codes: initialData?.stream_codes || ["doctor"],
        city: initialData?.city || "",
        address: initialData?.address || "",
        hospital_address: initialData?.hospital_address || "",
        affiliation: initialData?.affiliation || "",
        university_type: initialData?.university_type || "Private",
        ranking_text: initialData?.ranking_text || "",
        cover_image_url: initialData?.cover_image_url || "",
        logo_url: initialData?.logo_url || "",
        website_url: initialData?.website_url || "",
        contact_email: initialData?.contact_email || "",
        contact_phone: initialData?.contact_phone || "",
        established_year: initialData?.established_year || "",
        bed_capacity: initialData?.bed_capacity || "",
        tuition_range: initialData?.tuition_range || "",
        eligibility: initialData?.eligibility || "",
        intake_info: initialData?.intake_info || "",
        application_deadline: initialData?.application_deadline || "",
        language_requirements: initialData?.language_requirements || "",
        scholarship_info: initialData?.scholarship_info || "",
        description: initialData?.description || "",
        short_description: initialData?.short_description || "",
        additional_info: initialData?.additional_info || "",
        is_featured: initialData?.is_featured ?? false,
        is_active: initialData?.is_active ?? true,
        facilities: initialData?.facilities || ([] as string[]),
        recognised_by: initialData?.recognised_by || ([] as string[]),
        highlights: initialData?.highlights || ([] as string[]),
        programs_bachelor: initialData?.programs_bachelor || ([] as string[]),
        programs_pg: initialData?.programs_pg || ([] as string[]),
        // helpers
        facilityInput: "",
        recognisedInput: "",
        highlightInput: "",
        programBachInput: "",
        programPgInput: "",
    });

    type ListField = "facilities" | "recognised_by" | "highlights" | "programs_bachelor" | "programs_pg";
    type InputField = "facilityInput" | "recognisedInput" | "highlightInput" | "programBachInput" | "programPgInput";

    const addItem = (field: ListField, inputField: InputField) => {
        const v = (formData[inputField] as string).trim();
        if (!v) return;
        setFormData((p) => ({ ...p, [field]: [...(p[field] as string[]), v], [inputField]: "" } as typeof p));
    };
    const removeItem = (field: ListField, index: number) =>
        setFormData((p) => ({ ...p, [field]: (p[field] as string[]).filter((_, i) => i !== index) } as typeof p));

    const toggleStream = (code: string) => {
        setFormData((p) => ({
            ...p,
            stream_codes: p.stream_codes.includes(code)
                ? p.stream_codes.filter((c) => c !== code)
                : [...p.stream_codes, code],
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const { facilityInput, recognisedInput, highlightInput, programBachInput, programPgInput, ...submit } = formData;
            const payload = {
                ...submit,
                slug: submit.slug || slugify(submit.name),
            };
            if (initialData?.id) {
                const { error } = await supabase.from("universities").update(payload).eq("id", initialData.id);
                if (error) throw error;
            } else {
                const { error } = await supabase.from("universities").insert([payload]);
                if (error) throw error;
            }
            router.push("/admin/colleges");
            router.refresh();
        } catch (err: any) {
            alert("Error saving university: " + (err.message || ""));
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-8 max-w-5xl bg-white p-8 rounded-xl border border-gray-200 shadow-sm">
            {/* Basic */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <Label>University Name *</Label>
                    <Input required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value, slug: formData.slug || slugify(e.target.value) })} />
                </div>
                <div className="space-y-2">
                    <Label>Slug (URL)</Label>
                    <Input value={formData.slug} onChange={(e) => setFormData({ ...formData, slug: slugify(e.target.value) })} placeholder="auto from name" />
                </div>

                <div className="space-y-2">
                    <Label>Destination Country *</Label>
                    <Select value={formData.country_code} onValueChange={(v) => setFormData({ ...formData, country_code: v })}>
                        <SelectTrigger><SelectValue /></SelectTrigger>
                        <SelectContent>
                            {siteConfig.countries.map((c) => (
                                <SelectItem key={c.code} value={c.code}>{c.flag} {c.name}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                <div className="space-y-2">
                    <Label>Streams (pick one or more) *</Label>
                    <div className="flex flex-wrap gap-2">
                        {siteConfig.streams.map((s) => (
                            <button
                                key={s.code}
                                type="button"
                                onClick={() => toggleStream(s.code)}
                                className={`px-3 py-1.5 rounded-full text-sm border transition-colors ${formData.stream_codes.includes(s.code) ? "bg-primary text-primary-foreground border-primary" : "bg-white text-gray-700 border-gray-300 hover:border-primary"}`}
                            >
                                {s.name}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="space-y-2">
                    <Label>City</Label>
                    <Input value={formData.city} onChange={(e) => setFormData({ ...formData, city: e.target.value })} />
                </div>
                <div className="space-y-2">
                    <Label>Full address</Label>
                    <Input value={formData.address} onChange={(e) => setFormData({ ...formData, address: e.target.value })} />
                </div>

                <div className="space-y-2">
                    <Label>Hospital address (medical only)</Label>
                    <Input value={formData.hospital_address} onChange={(e) => setFormData({ ...formData, hospital_address: e.target.value })} />
                </div>

                <div className="space-y-2">
                    <Label>Affiliation</Label>
                    <Input value={formData.affiliation} onChange={(e) => setFormData({ ...formData, affiliation: e.target.value })} placeholder="e.g. Tribhuvan University" />
                </div>

                <div className="space-y-2">
                    <Label>University Type</Label>
                    <Input value={formData.university_type} onChange={(e) => setFormData({ ...formData, university_type: e.target.value })} placeholder="Government / Private / Community / Public" />
                </div>

                <div className="space-y-2">
                    <Label>Ranking</Label>
                    <Input value={formData.ranking_text} onChange={(e) => setFormData({ ...formData, ranking_text: e.target.value })} placeholder="QS / NIRF / Times rank" />
                </div>

                <div className="space-y-2">
                    <Label>Established Year</Label>
                    <Input value={formData.established_year} onChange={(e) => setFormData({ ...formData, established_year: e.target.value })} />
                </div>

                <div className="space-y-2">
                    <Label>Bed capacity (medical)</Label>
                    <Input value={formData.bed_capacity} onChange={(e) => setFormData({ ...formData, bed_capacity: e.target.value })} />
                </div>

                <div className="space-y-2">
                    <Label>Tuition range</Label>
                    <Input value={formData.tuition_range} onChange={(e) => setFormData({ ...formData, tuition_range: e.target.value })} placeholder="e.g. ₹35–60 Lakh (full course)" />
                </div>

                <div className="space-y-2">
                    <Label>Intake</Label>
                    <Input value={formData.intake_info} onChange={(e) => setFormData({ ...formData, intake_info: e.target.value })} placeholder="e.g. September / Fall 2026" />
                </div>

                <div className="space-y-2">
                    <Label>Application deadline</Label>
                    <Input value={formData.application_deadline} onChange={(e) => setFormData({ ...formData, application_deadline: e.target.value })} />
                </div>

                <div className="space-y-2">
                    <Label>Language requirements</Label>
                    <Input value={formData.language_requirements} onChange={(e) => setFormData({ ...formData, language_requirements: e.target.value })} placeholder="IELTS 6.5 / TOEFL 80 / MOI accepted" />
                </div>

                <div className="space-y-2">
                    <Label>Eligibility</Label>
                    <Input value={formData.eligibility} onChange={(e) => setFormData({ ...formData, eligibility: e.target.value })} placeholder="e.g. 50% in PCB + NEET" />
                </div>

                <div className="space-y-2 md:col-span-2">
                    <Label>Scholarship info</Label>
                    <Input value={formData.scholarship_info} onChange={(e) => setFormData({ ...formData, scholarship_info: e.target.value })} />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <ImageUpload label="Cover Image" value={formData.cover_image_url} onChange={(url) => setFormData({ ...formData, cover_image_url: url })} />
                <ImageUpload label="Logo" value={formData.logo_url} onChange={(url) => setFormData({ ...formData, logo_url: url })} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Input value={formData.website_url} onChange={(e) => setFormData({ ...formData, website_url: e.target.value })} placeholder="Website URL" />
                <Input value={formData.contact_email} onChange={(e) => setFormData({ ...formData, contact_email: e.target.value })} placeholder="Contact email" />
                <Input value={formData.contact_phone} onChange={(e) => setFormData({ ...formData, contact_phone: e.target.value })} placeholder="Contact phone" />
            </div>

            {/* Lists */}
            <div className="space-y-6 border-t pt-6">
                <h3 className="text-lg font-semibold text-gray-800">Details</h3>

                <ListInput label="Recognised by" tone="blue" items={formData.recognised_by} input={formData.recognisedInput} onChange={(v) => setFormData({ ...formData, recognisedInput: v })} onAdd={() => addItem("recognised_by", "recognisedInput")} onRemove={(i) => removeItem("recognised_by", i)} placeholder="e.g. Nepal Medical Council" />

                <ListInput label="Highlights" tone="amber" items={formData.highlights} input={formData.highlightInput} onChange={(v) => setFormData({ ...formData, highlightInput: v })} onAdd={() => addItem("highlights", "highlightInput")} onRemove={(i) => removeItem("highlights", i)} placeholder="e.g. Located in Medical City" />

                <ListInput label="Facilities" tone="green" items={formData.facilities} input={formData.facilityInput} onChange={(v) => setFormData({ ...formData, facilityInput: v })} onAdd={() => addItem("facilities", "facilityInput")} onRemove={(i) => removeItem("facilities", i)} placeholder="e.g. Hostel, Library" />
            </div>

            {/* Programs */}
            <div className="space-y-6 border-t pt-6">
                <h3 className="text-lg font-semibold text-gray-800">Programs</h3>
                <div className="grid md:grid-cols-2 gap-6">
                    <ListInput label="Bachelors / UG" tone="blue" items={formData.programs_bachelor} input={formData.programBachInput} onChange={(v) => setFormData({ ...formData, programBachInput: v })} onAdd={() => addItem("programs_bachelor", "programBachInput")} onRemove={(i) => removeItem("programs_bachelor", i)} placeholder="e.g. MBBS, B.Tech CSE" />
                    <ListInput label="PG / Masters" tone="purple" items={formData.programs_pg} input={formData.programPgInput} onChange={(v) => setFormData({ ...formData, programPgInput: v })} onAdd={() => addItem("programs_pg", "programPgInput")} onRemove={(i) => removeItem("programs_pg", i)} placeholder="e.g. MD, M.Tech AI" />
                </div>
            </div>

            <div className="space-y-2 border-t pt-6">
                <Label>Short description (for cards)</Label>
                <Textarea rows={2} value={formData.short_description} onChange={(e) => setFormData({ ...formData, short_description: e.target.value })} />
                <Label className="mt-4 block">Full description</Label>
                <Textarea rows={5} value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} />
                <Label className="mt-4 block">Additional info</Label>
                <Textarea rows={3} value={formData.additional_info} onChange={(e) => setFormData({ ...formData, additional_info: e.target.value })} />
            </div>

            <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                    <Checkbox id="featured" checked={formData.is_featured} onCheckedChange={(c) => setFormData({ ...formData, is_featured: c as boolean })} />
                    <Label htmlFor="featured">Featured on homepage</Label>
                </div>
                <div className="flex items-center gap-2">
                    <Checkbox id="active" checked={formData.is_active} onCheckedChange={(c) => setFormData({ ...formData, is_active: c as boolean })} />
                    <Label htmlFor="active">Active / visible</Label>
                </div>
            </div>

            <div className="flex justify-end gap-4 pb-12">
                <Button type="button" variant="outline" onClick={() => router.back()}>Cancel</Button>
                <Button type="submit" disabled={loading} size="lg">{loading ? "Saving..." : initialData ? "Update University" : "Create University"}</Button>
            </div>
        </form>
    );
}

function ListInput({
    label, items, input, onChange, onAdd, onRemove, placeholder, tone = "blue",
}: {
    label: string;
    items: string[];
    input: string;
    onChange: (v: string) => void;
    onAdd: () => void;
    onRemove: (i: number) => void;
    placeholder?: string;
    tone?: "blue" | "amber" | "green" | "purple";
}) {
    const toneCls: Record<string, string> = {
        blue: "bg-blue-50 text-blue-700",
        amber: "bg-amber-50 text-amber-700",
        green: "bg-green-50 text-green-700",
        purple: "bg-purple-50 text-purple-700",
    };
    return (
        <div className="space-y-2">
            <Label>{label}</Label>
            <div className="flex gap-2">
                <Input value={input} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} />
                <Button type="button" onClick={onAdd}><Plus className="w-4 h-4" /></Button>
            </div>
            <div className="flex flex-wrap gap-2">
                {items.map((it, i) => (
                    <span key={i} className={`${toneCls[tone]} px-3 py-1 rounded-full text-sm flex items-center gap-2`}>
                        {it}
                        <button type="button" onClick={() => onRemove(i)}>&times;</button>
                    </span>
                ))}
            </div>
        </div>
    );
}
