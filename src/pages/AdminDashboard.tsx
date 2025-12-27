import { Sidebar } from '@/components/Sidebar';
import { StatCard } from '@/components/StatCard';
import { StatusBadge } from '@/components/StatusBadge';
import { adminStats, mockCompanies } from '@/data/mockData';
import { useAuthStore } from '@/stores/authStore';
import { 
  Users, 
  GraduationCap, 
  Briefcase, 
  IndianRupee,
  Plus,
  Search,
  Bell,
  ChevronLeft,
  ChevronRight,
  Check,
  X,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

const participationData = [
  { name: 'TCS', value: 180 },
  { name: 'Wipro', value: 150 },
  { name: 'Google', value: 220 },
  { name: 'Infosys', value: 120 },
  { name: 'Amazon', value: 200 },
];

const statusData = [
  { name: 'Completed', value: 15, color: 'hsl(142, 76%, 36%)' },
  { name: 'Ongoing', value: 6, color: 'hsl(217, 91%, 60%)' },
  { name: 'Upcoming', value: 3, color: 'hsl(38, 92%, 50%)' },
];

export default function AdminDashboard() {
  const { user } = useAuthStore();

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      
      <main className="ml-64 p-8">
        {/* Header */}
        <header className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
              <Link to="/admin" className="hover:text-foreground">Home</Link>
              <span>/</span>
              <span>Dashboard</span>
            </div>
            <h1 className="text-3xl font-bold text-foreground">Placement Overview</h1>
            <p className="text-muted-foreground mt-1">
              Manage drives, monitor student progress, and oversee recruitment.
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search students, companies..."
                className="pl-10 pr-4 py-2 w-64 rounded-lg border border-input bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring text-sm"
              />
            </div>
            <button className="relative p-3 rounded-full bg-card border border-border hover:bg-muted transition-colors">
              <Bell className="w-5 h-5 text-foreground" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-destructive rounded-full" />
            </button>
            <button className="btn-primary">
              <Plus className="w-5 h-5" />
              Create New Drive
            </button>
          </div>
        </header>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Students"
            value={adminStats.totalStudents.toLocaleString()}
            change="+12%"
            changeType="positive"
            icon={<Users className="w-6 h-6 text-primary" />}
            iconBgColor="bg-primary/10"
          />
          <StatCard
            title="Placed Students"
            value={adminStats.placedStudents}
            change="+8%"
            changeType="positive"
            icon={<GraduationCap className="w-6 h-6 text-success" />}
            iconBgColor="bg-success/10"
          />
          <StatCard
            title="Ongoing Drives"
            value={adminStats.ongoingDrives}
            change="Active"
            changeType="neutral"
            icon={<Briefcase className="w-6 h-6 text-info" />}
            iconBgColor="bg-info/10"
          />
          <StatCard
            title="Avg. Package"
            value={`₹${adminStats.avgPackage}`}
            change="+5%"
            changeType="positive"
            icon={<IndianRupee className="w-6 h-6 text-warning" />}
            iconBgColor="bg-warning/10"
          />
        </div>

        {/* Charts & Table */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Bar Chart */}
          <div className="lg:col-span-2 bg-card rounded-xl p-6 border border-border">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-semibold text-foreground">Student Participation</h2>
              <span className="text-sm text-muted-foreground">Current Semester</span>
            </div>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={participationData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))', 
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                  }}
                />
                <Bar dataKey="value" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Pie Chart */}
          <div className="bg-card rounded-xl p-6 border border-border">
            <h2 className="font-semibold text-foreground mb-6">Drive Status Summary</h2>
            <div className="flex justify-center">
              <ResponsiveContainer width={200} height={200}>
                <PieChart>
                  <Pie
                    data={statusData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {statusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="text-center mb-4">
              <p className="text-3xl font-bold text-foreground">24</p>
              <p className="text-sm text-muted-foreground">TOTAL DRIVES</p>
            </div>
            <div className="space-y-2">
              {statusData.map((item) => (
                <div key={item.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-sm text-muted-foreground">{item.name}</span>
                  </div>
                  <span className="text-sm font-medium text-foreground">{item.value} ({Math.round(item.value / 24 * 100)}%)</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Placement Drives Table */}
        <div className="bg-card rounded-xl border border-border">
          <div className="p-6 border-b border-border">
            <div className="flex items-center justify-between">
              <h2 className="font-semibold text-foreground">Placement Drives</h2>
              <div className="flex gap-2">
                {['All', 'Upcoming', 'Ongoing', 'Completed'].map((filter) => (
                  <button
                    key={filter}
                    className={`px-3 py-1.5 text-sm rounded-md transition-all ${
                      filter === 'All'
                        ? 'bg-primary text-primary-foreground'
                        : 'text-muted-foreground hover:bg-muted'
                    }`}
                  >
                    {filter}
                  </button>
                ))}
              </div>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-4 px-6 text-sm font-medium text-muted-foreground">COMPANY</th>
                  <th className="text-left py-4 px-6 text-sm font-medium text-muted-foreground">ROLE</th>
                  <th className="text-left py-4 px-6 text-sm font-medium text-muted-foreground">DATE</th>
                  <th className="text-left py-4 px-6 text-sm font-medium text-muted-foreground">STATUS</th>
                  <th className="text-left py-4 px-6 text-sm font-medium text-muted-foreground">ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {mockCompanies.slice(0, 5).map((company) => (
                  <tr key={company.id} className="border-b border-border hover:bg-muted/50 transition-colors">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold text-primary-foreground bg-primary`}>
                          {company.name.split(' ').map(w => w[0]).join('').slice(0, 2)}
                        </div>
                        <div>
                          <p className="font-medium text-foreground">{company.name}</p>
                          <p className="text-xs text-muted-foreground">{company.location}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <p className="text-foreground">{company.role}</p>
                    </td>
                    <td className="py-4 px-6">
                      <p className="text-foreground">{new Date(company.driveDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
                    </td>
                    <td className="py-4 px-6">
                      <StatusBadge variant={company.status} />
                    </td>
                    <td className="py-4 px-6">
                      <Link to={`/company/${company.id}`} className="text-primary hover:underline text-sm">
                        View Details
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="p-4 flex items-center justify-between border-t border-border">
            <p className="text-sm text-muted-foreground">Showing 5 of 12 drives</p>
            <div className="flex items-center gap-2">
              <button className="p-2 rounded-lg border border-border hover:bg-muted transition-colors">
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button className="p-2 rounded-lg border border-border hover:bg-muted transition-colors">
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Forum Moderation */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
          <div className="bg-card rounded-xl p-6 border border-border">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold text-foreground">Forum Moderation</h2>
              <Link to="/admin/forum" className="text-primary text-sm hover:underline">View All</Link>
            </div>
            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-muted/50">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-medium text-foreground text-sm">Sarah Jenkins</p>
                    <p className="text-muted-foreground text-sm mt-1">
                      "Is the aptitude test for TechCorp mandatory for ECE students as well? The guidelines are unclear."
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button className="p-2 rounded-lg bg-success/10 text-success hover:bg-success/20 transition-colors">
                      <Check className="w-4 h-4" />
                    </button>
                    <button className="p-2 rounded-lg bg-destructive/10 text-destructive hover:bg-destructive/20 transition-colors">
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
              <div className="p-4 rounded-lg bg-muted/50">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-medium text-foreground text-sm">Mike Ross</p>
                    <p className="text-muted-foreground text-sm mt-1">
                      "Regarding the FinEdge interview process, are there 2 or 3 technical rounds?"
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button className="p-2 rounded-lg bg-success/10 text-success hover:bg-success/20 transition-colors">
                      <Check className="w-4 h-4" />
                    </button>
                    <button className="p-2 rounded-lg bg-destructive/10 text-destructive hover:bg-destructive/20 transition-colors">
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-card rounded-xl p-6 border border-border">
            <h2 className="font-semibold text-foreground mb-4">Pending Process Updates</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-warning/10 flex items-center justify-center">
                    <Briefcase className="w-4 h-4 text-warning" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground text-sm">FinEdge Round 2</p>
                    <p className="text-xs text-muted-foreground">Date needs confirmation</p>
                  </div>
                </div>
                <button className="text-primary text-sm hover:underline">Update</button>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-info/10 flex items-center justify-center">
                    <Briefcase className="w-4 h-4 text-info" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground text-sm">Innovate Inc. Coding</p>
                    <p className="text-xs text-muted-foreground">Shortlist pending</p>
                  </div>
                </div>
                <button className="text-primary text-sm hover:underline">Update</button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
