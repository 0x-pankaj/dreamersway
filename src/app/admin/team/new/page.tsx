import TeamForm from "@/components/admin/TeamForm";

export default function NewTeamPage() {
    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-gray-900">Add Team Member</h1>
            <TeamForm />
        </div>
    );
}
