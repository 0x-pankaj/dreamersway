import CollegeForm from "@/components/admin/CollegeForm";

export default function NewCollegePage() {
    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-gray-900">Add New College</h1>
            <CollegeForm />
        </div>
    );
}
