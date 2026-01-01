import { useState } from 'react';
import { Sidebar } from '@/components/Sidebar';
import { useAuthStore } from '@/stores/authStore';
import { BookOpen, Download, ExternalLink, Search } from 'lucide-react';

export default function ResourcesPage() {
    const { profile } = useAuthStore();

    const resources = [
        {
            id: '1',
            title: 'Interview Preparation Guide',
            type: 'PDF',
            category: 'Interview',
            size: '2.5 MB',
            downloads: 1250,
            description: 'Complete guide for technical and HR interview preparation',
        },
        {
            id: '2',
            title: 'Resume Templates',
            type: 'ZIP',
            category: 'Resume',
            size: '15 MB',
            downloads: 890,
            description: 'Professional resume templates for freshers',
        },
        {
            id: '3',
            title: 'Aptitude Test Papers',
            type: 'PDF',
            category: 'Aptitude',
            size: '8 MB',
            downloads: 2100,
            description: 'Collection of aptitude test questions with solutions',
        },
        {
            id: '4',
            title: 'Programming Challenges',
            type: 'Link',
            category: 'Coding',
            size: 'Online',
            downloads: 0,
            description: 'Link to coding practice platforms and challenges',
        },
        {
            id: '5',
            title: 'Group Discussion Tips',
            type: 'PDF',
            category: 'GD',
            size: '1.2 MB',
            downloads: 650,
            description: 'Tips and topics for group discussion rounds',
        },
        {
            id: '6',
            title: 'Company Specific Materials',
            type: 'Folder',
            category: 'Company',
            size: '25 MB',
            downloads: 450,
            description: 'Previous year questions and preparation materials',
        },
    ];

    const categories = ['All', 'Interview', 'Resume', 'Aptitude', 'Coding', 'GD', 'Company'];
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');

    const filteredResources = resources.filter(resource => {
        const matchesCategory = selectedCategory === 'All' || resource.category === selectedCategory;
        const matchesSearch = searchQuery === '' ||
            resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            resource.description.toLowerCase().includes(searchQuery.toLowerCase());

        return matchesCategory && matchesSearch;
    });

    return (
        <div className="min-h-screen bg-background">
            <Sidebar />

            <main className="ml-64 p-8">
                <header className="mb-8">
                    <h1 className="text-3xl font-bold text-foreground mb-2">Resources</h1>
                    <p className="text-muted-foreground">
                        Access study materials, resume templates, and interview preparation resources
                    </p>
                </header>

                {/* Filters */}
                <div className="flex flex-col sm:flex-row gap-4 mb-6">
                    <div className="flex gap-2 flex-wrap">
                        {categories.map((category) => (
                            <button
                                key={category}
                                onClick={() => setSelectedCategory(category)}
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${selectedCategory === category
                                    ? 'bg-primary text-primary-foreground'
                                    : 'bg-muted text-muted-foreground hover:text-foreground'
                                    }`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>

                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <input
                            type="text"
                            placeholder="Search resources..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-10 pr-4 py-2 w-64 rounded-lg border border-input bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring text-sm"
                        />
                    </div>
                </div>

                {/* Resources Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredResources.map((resource) => (
                        <div key={resource.id} className="bg-card rounded-lg border border-border p-6 hover:shadow-lg transition-shadow">
                            <div className="flex items-start justify-between mb-4">
                                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                                    <BookOpen className="w-6 h-6 text-primary" />
                                </div>
                                <span className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-md">
                                    {resource.type}
                                </span>
                            </div>

                            <h3 className="font-semibold text-foreground mb-2">{resource.title}</h3>
                            <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{resource.description}</p>

                            <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
                                <span>{resource.category}</span>
                                <span>{resource.size}</span>
                                <span>{resource.downloads} downloads</span>
                            </div>

                            <div className="flex gap-2">
                                {resource.type === 'Link' ? (
                                    <button className="btn-primary flex-1 text-sm">
                                        <ExternalLink className="w-4 h-4 mr-2" />
                                        Open Link
                                    </button>
                                ) : (
                                    <button className="btn-primary flex-1 text-sm">
                                        <Download className="w-4 h-4 mr-2" />
                                        Download
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                {filteredResources.length === 0 && (
                    <div className="text-center py-12">
                        <BookOpen className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                        <p className="text-muted-foreground">No resources found matching your criteria.</p>
                    </div>
                )}
            </main>
        </div>
    );
}
