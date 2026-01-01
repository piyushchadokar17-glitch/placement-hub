import { Sidebar } from '@/components/Sidebar';
import { useAuthStore } from '@/stores/authStore';
import { Calendar, Clock, MapPin, User } from 'lucide-react';

export default function InterviewsPage() {
    const { profile } = useAuthStore();

    const mockInterviews = [
        {
            id: '1',
            company: 'Google',
            role: 'Software Development Engineer',
            type: 'Technical Interview',
            date: '2024-10-25',
            time: '10:00 AM',
            mode: 'Online',
            location: 'Google Meet Link',
            status: 'upcoming',
        },
        {
            id: '2',
            company: 'Amazon',
            role: 'SDE Intern',
            type: 'HR Interview',
            date: '2024-10-24',
            time: '2:00 PM',
            mode: 'Offline',
            location: 'Room 201, Main Building',
            status: 'upcoming',
        },
        {
            id: '3',
            company: 'Microsoft',
            role: 'Software Development Engineer',
            type: 'Technical Interview',
            date: '2024-10-20',
            time: '11:00 AM',
            mode: 'Online',
            location: 'Teams Link',
            status: 'completed',
        },
    ];

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'upcoming': return 'bg-blue-100 text-blue-800';
            case 'completed': return 'bg-green-100 text-green-800';
            case 'missed': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <div className="min-h-screen bg-background">
            <Sidebar />

            <main className="ml-64 p-8">
                <header className="mb-8">
                    <h1 className="text-3xl font-bold text-foreground mb-2">Interview Schedule</h1>
                    <p className="text-muted-foreground">
                        Manage and track your upcoming interviews
                    </p>
                </header>

                <div className="grid gap-6">
                    {mockInterviews.map((interview) => (
                        <div key={interview.id} className="bg-card rounded-lg border border-border p-6">
                            <div className="flex items-start justify-between">
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-3">
                                        <h3 className="text-lg font-semibold text-foreground">{interview.company}</h3>
                                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(interview.status)}`}>
                                            {interview.status.charAt(0).toUpperCase() + interview.status.slice(1)}
                                        </span>
                                    </div>

                                    <p className="text-muted-foreground mb-4">{interview.role}</p>

                                    <div className="grid grid-cols-2 gap-4 text-sm">
                                        <div className="flex items-center gap-2">
                                            <Calendar className="w-4 h-4 text-muted-foreground" />
                                            <span>{new Date(interview.date).toLocaleDateString()}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Clock className="w-4 h-4 text-muted-foreground" />
                                            <span>{interview.time}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <User className="w-4 h-4 text-muted-foreground" />
                                            <span>{interview.type}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <MapPin className="w-4 h-4 text-muted-foreground" />
                                            <span>{interview.mode} - {interview.location}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex gap-2">
                                    {interview.status === 'upcoming' && (
                                        <>
                                            <button className="btn-primary">Join Interview</button>
                                            <button className="btn-outline">Reschedule</button>
                                        </>
                                    )}
                                    {interview.status === 'completed' && (
                                        <button className="btn-outline">View Feedback</button>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {mockInterviews.length === 0 && (
                    <div className="text-center py-12">
                        <Calendar className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                        <p className="text-muted-foreground">No interviews scheduled yet.</p>
                    </div>
                )}
            </main>
        </div>
    );
}
