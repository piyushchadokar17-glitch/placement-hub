import { useState } from 'react';
import { Sidebar } from '@/components/Sidebar';
import { StatCard } from '@/components/StatCard';
import { CompanyCard } from '@/components/CompanyCard';
import { useAuthStore } from '@/stores/authStore';
import { mockCompanies, studentStats } from '@/data/mockData';
import { 
  Briefcase, 
  Send, 
  Star, 
  CheckCircle2, 
  Search,
  Bell,
} from 'lucide-react';
import { toast } from 'sonner';

type TabType = 'upcoming' | 'ongoing' | 'completed';

export default function StudentDashboard() {
  const { profile } = useAuthStore();
  const [activeTab, setActiveTab] = useState<TabType>('upcoming');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCompanies = mockCompanies.filter(company => {
    const matchesTab = activeTab === 'upcoming' 
      ? company.status === 'upcoming'
      : activeTab === 'ongoing'
      ? company.status === 'ongoing'
      : company.status === 'completed' || company.status === 'closed';
    
    const matchesSearch = searchQuery === '' || 
      company.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      company.role.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesTab && matchesSearch;
  });

  const handleRegister = (companyId: string) => {
    const company = mockCompanies.find(c => c.id === companyId);
    if (company) {
      toast.success(`Successfully registered for ${company.name}`);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      
      <main className="ml-64 p-8">
        {/* Header */}
        <header className="flex items-center justify-between mb-8">
          <div>
            <p className="text-sm text-muted-foreground mb-1">Academic Year 2024-2025</p>
            <h1 className="text-3xl font-bold text-foreground">
              Welcome back, {profile?.name?.split(' ')[0] || 'Student'} 👋
            </h1>
            <p className="text-muted-foreground mt-1">
              Here are the latest placement opportunities curated for your profile.
            </p>
          </div>
          <button className="relative p-3 rounded-full bg-card border border-border hover:bg-muted transition-colors">
            <Bell className="w-5 h-5 text-foreground" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-destructive rounded-full" />
          </button>
        </header>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Drives"
            value={studentStats.totalDrives}
            change="+5 this week"
            changeType="positive"
            icon={<Briefcase className="w-6 h-6 text-primary" />}
            iconBgColor="bg-primary/10"
          />
          <StatCard
            title="Applications"
            value={studentStats.applications}
            change="+2 this week"
            changeType="positive"
            icon={<Send className="w-6 h-6 text-success" />}
            iconBgColor="bg-success/10"
          />
          <StatCard
            title="Shortlisted"
            value={studentStats.shortlisted}
            change="Pending interviews"
            changeType="neutral"
            icon={<Star className="w-6 h-6 text-warning" />}
            iconBgColor="bg-warning/10"
          />
          <StatCard
            title="Offers"
            value={studentStats.offers}
            change="Action Required"
            changeType="positive"
            icon={<CheckCircle2 className="w-6 h-6 text-success" />}
            iconBgColor="bg-success/10"
          />
        </div>

        {/* Tabs and Search */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex gap-1 bg-muted p-1 rounded-lg">
            {(['upcoming', 'ongoing', 'completed'] as TabType[]).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-all capitalize ${
                  activeTab === tab
                    ? 'bg-card text-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {tab === 'upcoming' ? 'Upcoming Drives' : tab}
              </button>
            ))}
          </div>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search by company, role, or CTC..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 w-80 rounded-lg border border-input bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring text-sm"
            />
          </div>
        </div>

        {/* Company Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCompanies.map((company, index) => (
            <div 
              key={company.id} 
              className="animate-fade-in opacity-0"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CompanyCard company={company} onRegister={handleRegister} />
            </div>
          ))}
        </div>

        {filteredCompanies.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No placement drives found matching your criteria.</p>
          </div>
        )}
      </main>
    </div>
  );
}
