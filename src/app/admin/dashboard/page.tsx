import { Button } from "@/components/ui/button";
import Link from 'next/link';

export default function AdminDashboard() {
    return (
        <div className="space-y-8">
            <h1 className="text-3xl font-bold text-gray-900">Dashboard Overview</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Quick Stats / Links */}
                <Link href="/admin/colleges">
                    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                        <h3 className="text-lg font-semibold text-gray-700">Manage Colleges</h3>
                        <p className="text-3xl font-bold text-primary mt-2">--</p>
                        <p className="text-sm text-gray-500 mt-1">Total Listed</p>
                    </div>
                </Link>

                <Link href="/admin/notices">
                    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                        <h3 className="text-lg font-semibold text-gray-700">Manage Notices</h3>
                        <p className="text-3xl font-bold text-primary mt-2">--</p>
                        <p className="text-sm text-gray-500 mt-1">Active Notices</p>
                    </div>
                </Link>

                <Link href="/admin/team">
                    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                        <h3 className="text-lg font-semibold text-gray-700">Manage Team</h3>
                        <p className="text-3xl font-bold text-primary mt-2">--</p>
                        <p className="text-sm text-gray-500 mt-1">Members</p>
                    </div>
                </Link>
            </div>

            <div className="bg-blue-50 p-6 rounded-xl border border-blue-100">
                <h3 className="font-bold text-blue-900 mb-2">Welcome to Admin Panel</h3>
                <p className="text-blue-700">
                    Select a module from the sidebar or the cards above to start managing your website content.
                </p>
            </div>
        </div>
    );
}
