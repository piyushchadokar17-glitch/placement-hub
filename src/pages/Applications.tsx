import { Sidebar } from '@/components/Sidebar';
import { useAuthStore } from '@/stores/authStore';
import { FileText, Calendar, ExternalLink } from 'lucide-react';

export default function ApplicationsPage() {
    const { profile } = useAuthStore();

    const mockApplications = [
        {
            id: '1',
            company: 'Google',
            role: 'Software Development Engineer',
            status: 'shortlisted',
            appliedDate: '2024-10-15',
            driveDate: '2024-11-05',
        },
        {
            id: '2',
            company: 'Microsoft',
            role: 'Software Development Engineer',
            status: 'applied',
            appliedDate: '2024-10-10',
            driveDate: '2024-10-22',
        },
        {
            id: '3',
            company: 'Amazon',
            role: 'SDE Intern',
            status: 'interviewing',
            appliedDate: '2024-10-08',
            driveDate: '2024-10-22',
        },
    ];

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'applied': return 'bg-blue-100 text-blue-800';
            case 'shortlisted': return 'bg-green-100 text-green-800';
            case 'interviewing': return 'bg-yellow-100 text-yellow-800';
            case 'selected': return 'bg-purple-100 text-purple-800';
            case 'rejected': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <div className="min-h-screen bg-background">
            <Sidebar />

            <main className="ml-64 p-8">
                <header className="mb-8">
                    <h1 className="text-3xl font-bold text-foreground mb-2">My Applications</h1>
                    <p className="text-muted-foreground">
                        Track the status of your placement drive applications
                    </p>
                </header>

                <div className="space-y-4">
                    {mockApplications.map((application) => (
                        <div key={application.id} className="bg-card rounded-lg border border-border p-6">
                            <div className="flex items-start justify-between">
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-2">
                                        <h3 className="text-lg font-semibold text-foreground">{application.company}</h3>
                                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(application.status)}`}>
                                            {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                                        </span>
                                    </div>
                                    <p className="text-muted-foreground mb-3">{application.role}</p>
                                    <div className="flex items-center gap-6 text-sm text-muted-foreground">
                                        <div className="flex items-center gap-2">
                                            <FileText className="w-4 h-4" />
                                            <span>Applied: {new Date(application.appliedDate).toLocaleDateString()}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Calendar className="w-4 h-4" />
                                            <span>Drive Date: {new Date(application.driveDate).toLocaleDateString()}</span>
                                        </div>
                                    </div>
                                </div>
                                <button className="btn-outline">
                                    <ExternalLink className="w-4 h-4 mr-2" />
                                    View Details
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {mockApplications.length === 0 && (
                    <div className="text-center py-12">
                        <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                        <p className="text-muted-foreground">No applications found. Start applying to placement drives!</p>
                    </div>
                )}
            </main>
        </div>
    );
}
