import { Sidebar } from '@/components/Sidebar';
import { useAuthStore } from '@/stores/authStore';
import { FileText, Download, Edit, Eye } from 'lucide-react';

export default function ResumePage() {
    const { profile } = useAuthStore();

    return (
        <div className="min-h-screen bg-background">
            <Sidebar />

            <main className="ml-64 p-8">
                <header className="mb-8">
                    <h1 className="text-3xl font-bold text-foreground mb-2">Resume Builder</h1>
                    <p className="text-muted-foreground">
                        Create and manage your professional resume
                    </p>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Resume Form */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Personal Information */}
                        <div className="bg-card rounded-lg border border-border p-6">
                            <h2 className="text-xl font-semibold text-foreground mb-4">Personal Information</h2>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-foreground mb-2">Full Name</label>
                                    <input
                                        type="text"
                                        defaultValue={profile?.name || ''}
                                        className="input-field"
                                        placeholder="John Doe"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-foreground mb-2">Email</label>
                                    <input
                                        type="email"
                                        defaultValue={profile?.email || ''}
                                        className="input-field"
                                        placeholder="john@example.com"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-foreground mb-2">Phone</label>
                                    <input
                                        type="tel"
                                        className="input-field"
                                        placeholder="+91 98765 43210"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-foreground mb-2">Department</label>
                                    <input
                                        type="text"
                                        defaultValue={profile?.department || ''}
                                        className="input-field"
                                        placeholder="Computer Science"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Education */}
                        <div className="bg-card rounded-lg border border-border p-6">
                            <h2 className="text-xl font-semibold text-foreground mb-4">Education</h2>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-foreground mb-2">Degree</label>
                                    <input
                                        type="text"
                                        className="input-field"
                                        placeholder="B.Tech Computer Science"
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-foreground mb-2">College</label>
                                        <input
                                            type="text"
                                            className="input-field"
                                            placeholder="Your College Name"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-foreground mb-2">Batch</label>
                                        <input
                                            type="text"
                                            defaultValue={profile?.batch || ''}
                                            className="input-field"
                                            placeholder="2024"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-foreground mb-2">CGPA</label>
                                    <input
                                        type="text"
                                        className="input-field"
                                        placeholder="8.5"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Skills */}
                        <div className="bg-card rounded-lg border border-border p-6">
                            <h2 className="text-xl font-semibold text-foreground mb-4">Technical Skills</h2>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-foreground mb-2">Programming Languages</label>
                                    <input
                                        type="text"
                                        className="input-field"
                                        placeholder="JavaScript, Python, Java, C++"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-foreground mb-2">Technologies</label>
                                    <input
                                        type="text"
                                        className="input-field"
                                        placeholder="React, Node.js, MongoDB, Git"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Projects */}
                        <div className="bg-card rounded-lg border border-border p-6">
                            <h2 className="text-xl font-semibold text-foreground mb-4">Projects</h2>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-foreground mb-2">Project Title</label>
                                    <input
                                        type="text"
                                        className="input-field"
                                        placeholder="E-commerce Website"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-foreground mb-2">Description</label>
                                    <textarea
                                        className="input-field min-h-[100px]"
                                        placeholder="Describe your project, technologies used, and your role..."
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Preview and Actions */}
                    <div className="space-y-6">
                        {/* Resume Preview */}
                        <div className="bg-card rounded-lg border border-border p-6">
                            <h3 className="text-lg font-semibold text-foreground mb-4">Resume Preview</h3>
                            <div className="bg-muted rounded-lg p-4 min-h-[400px] flex items-center justify-center">
                                <div className="text-center">
                                    <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-2" />
                                    <p className="text-muted-foreground">Resume preview will appear here</p>
                                </div>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="space-y-3">
                            <button className="btn-primary w-full">
                                <Eye className="w-4 h-4 mr-2" />
                                Preview Resume
                            </button>
                            <button className="btn-outline w-full">
                                <Download className="w-4 h-4 mr-2" />
                                Download PDF
                            </button>
                            <button className="btn-outline w-full">
                                <Edit className="w-4 h-4 mr-2" />
                                Edit Template
                            </button>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
