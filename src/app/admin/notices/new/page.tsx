import NoticeForm from "@/components/admin/NoticeForm";

export default function NewNoticePage() {
    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-gray-900">Add New Notice</h1>
            <NoticeForm />
        </div>
    );
}
