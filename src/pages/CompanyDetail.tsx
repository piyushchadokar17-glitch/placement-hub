import { useParams, Link } from 'react-router-dom';
import { Sidebar } from '@/components/Sidebar';
import { StatusBadge } from '@/components/StatusBadge';
import { mockCompanies, mockMessages } from '@/data/mockData';
import { useState } from 'react';
import { 
  ArrowLeft, 
  MapPin, 
  IndianRupee, 
  Clock, 
  Users,
  Calendar,
  Briefcase,
  FileText,
  Send,
  Pin,
  Check,
} from 'lucide-react';
import { toast } from 'sonner';
import { useAuthStore } from '@/stores/authStore';

export default function CompanyDetail() {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuthStore();
  const company = mockCompanies.find(c => c.id === id);
  const [newMessage, setNewMessage] = useState('');
  const [messages, setMessages] = useState(mockMessages);

  if (!company) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Company not found.</p>
      </div>
    );
  }

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message = {
        id: crypto.randomUUID(),
        userId: user?.id || '1',
        userName: user?.name || 'You',
        userRole: user?.role || 'student' as const,
        content: newMessage,
        timestamp: new Date(),
      };
      setMessages([...messages, message]);
      setNewMessage('');
      toast.success('Message posted!');
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  };

  const handleRegister = () => {
    toast.success(`Successfully registered for ${company.name}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      
      <main className="ml-64 p-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
          <Link to="/dashboard" className="hover:text-foreground">Home</Link>
          <span>/</span>
          <Link to="/dashboard" className="hover:text-foreground">Drives</Link>
          <span>/</span>
          <span className="text-foreground">{company.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Company Header */}
            <div className="bg-card rounded-xl p-6 border border-border">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-xl bg-primary flex items-center justify-center text-xl font-bold text-primary-foreground">
                    {company.name.split(' ').map(w => w[0]).join('').slice(0, 2)}
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <h1 className="text-2xl font-bold text-foreground">{company.name}</h1>
                      <StatusBadge variant={company.status} />
                    </div>
                    <p className="text-lg text-muted-foreground">{company.role}</p>
                  </div>
                </div>
                
                <button onClick={handleRegister} className="btn-primary">
                  Register Now
                  <span>→</span>
                </button>
              </div>

              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <IndianRupee className="w-4 h-4" />
                  {company.ctc}
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  {company.location}
                </span>
              </div>

              <div className="flex items-center gap-4 mt-4">
                <span className="px-3 py-1 rounded-full bg-muted text-sm">Full Time</span>
                <span className="px-3 py-1 rounded-full bg-muted text-sm">On-Site</span>
                <span className="px-3 py-1 rounded-full bg-muted text-sm">Class of 2024</span>
              </div>
            </div>

            {/* About the Role */}
            <div className="bg-card rounded-xl p-6 border border-border">
              <h2 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-primary" />
                About the Role
              </h2>
              <p className="text-muted-foreground mb-4">
                {company.description || `${company.name} is looking for creative and enthusiastic professionals to join our team. You will work on solving complex problems, building scalable systems, and delivering high-quality solutions.`}
              </p>
              <h3 className="font-medium text-foreground mb-2">Key Responsibilities:</h3>
              <ul className="list-disc list-inside text-muted-foreground space-y-1">
                <li>Design and develop scalable web services.</li>
                <li>Write clean, maintainable, and efficient code.</li>
                <li>Participate in code reviews and contribute to engineering best practices.</li>
              </ul>
            </div>

            {/* Eligibility Criteria */}
            {company.eligibility && (
              <div className="bg-card rounded-xl p-6 border border-border">
                <h2 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                  <Users className="w-5 h-5 text-primary" />
                  Eligibility Criteria
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">CGPA CUTOFF</p>
                    <p className="font-semibold text-foreground">{company.eligibility.cgpa}</p>
                    <p className="text-xs text-muted-foreground">No history of academic probation</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">ALLOWED BRANCHES</p>
                    <p className="font-semibold text-foreground">{company.eligibility.branches.join(', ')}</p>
                    <p className="text-xs text-muted-foreground">B.Tech & M.Tech</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">ACTIVE BACKLOGS</p>
                    <p className="font-semibold text-foreground">{company.eligibility.backlogsAllowed} Allowed</p>
                    <p className="text-xs text-muted-foreground">At time of joining</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">CLASS X & XII</p>
                    <p className="font-semibold text-foreground">{company.eligibility.classRequirement}</p>
                    <p className="text-xs text-muted-foreground">Board criteria</p>
                  </div>
                </div>
              </div>
            )}

            {/* Selection Process */}
            {company.selectionProcess && (
              <div className="bg-card rounded-xl p-6 border border-border">
                <h2 className="font-semibold text-foreground mb-6 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-primary" />
                  Selection Process
                </h2>
                <div className="flex items-center justify-between">
                  {company.selectionProcess.map((step, index) => (
                    <div key={step.id} className="flex items-center">
                      <div className="flex flex-col items-center">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center font-medium text-sm ${
                          step.isCompleted
                            ? 'bg-primary text-primary-foreground'
                            : step.isCurrent
                            ? 'bg-primary text-primary-foreground ring-4 ring-primary/20'
                            : 'bg-muted text-muted-foreground'
                        }`}>
                          {step.isCompleted ? <Check className="w-5 h-5" /> : step.id}
                        </div>
                        <div className="mt-2 text-center">
                          <p className="font-medium text-foreground text-sm">{step.title}</p>
                          <p className="text-xs text-muted-foreground">{step.description}</p>
                          {step.duration && (
                            <p className="text-xs text-muted-foreground">({step.duration})</p>
                          )}
                        </div>
                      </div>
                      {index < company.selectionProcess!.length - 1 && (
                        <div className={`h-0.5 w-16 mx-4 ${
                          step.isCompleted ? 'bg-primary' : 'bg-muted'
                        }`} />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Discussion Thread */}
            <div className="bg-card rounded-xl p-6 border border-border">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-semibold text-foreground flex items-center gap-2">
                  <span className="text-xl">💬</span>
                  Discussion
                </h2>
                <span className="text-sm text-muted-foreground">{messages.length} Comments</span>
              </div>

              {/* Messages */}
              <div className="space-y-4 max-h-96 overflow-y-auto mb-4">
                {messages.map((message) => (
                  <div key={message.id} className={`flex gap-3 p-3 rounded-lg ${message.isPinned ? 'bg-primary/5 border border-primary/20' : ''}`}>
                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                      <span className="text-xs font-medium text-primary">
                        {message.userName.split(' ').map(n => n[0]).join('').slice(0, 2)}
                      </span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium text-foreground">{message.userName}</span>
                        {message.isAdmin && (
                          <span className="px-2 py-0.5 text-xs bg-primary text-primary-foreground rounded">ADMIN</span>
                        )}
                        <span className="text-xs text-muted-foreground">{formatDate(message.timestamp)}</span>
                        {message.isPinned && <Pin className="w-3 h-3 text-primary" />}
                      </div>
                      <p className="text-muted-foreground text-sm">{message.content}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Input */}
              <div className="flex gap-3 pt-4 border-t border-border">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Ask a question about this drive..."
                  className="input-field flex-1"
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                />
                <button onClick={handleSendMessage} className="btn-primary">
                  Post Question
                </button>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Important Dates */}
            <div className="bg-card rounded-xl p-6 border border-border">
              <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-primary" />
                Important Dates
              </h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-3 h-3 rounded-full bg-success mt-1.5" />
                  <div>
                    <p className="text-xs text-success font-medium">Today</p>
                    <p className="font-medium text-foreground">Registration Opens</p>
                    <p className="text-xs text-muted-foreground">10:00 AM</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-3 h-3 rounded-full bg-destructive mt-1.5" />
                  <div>
                    <p className="text-xs text-destructive font-medium">Oct 15, 2024</p>
                    <p className="font-medium text-foreground">Registration Closes</p>
                    <p className="text-xs text-muted-foreground">11:59 PM</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-3 h-3 rounded-full bg-muted mt-1.5" />
                  <div>
                    <p className="text-xs text-muted-foreground">Oct 18, 2024</p>
                    <p className="font-medium text-foreground">Online Assessment</p>
                    <p className="text-xs text-muted-foreground">02:00 PM - 04:00 PM</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-3 h-3 rounded-full bg-muted mt-1.5" />
                  <div>
                    <p className="text-xs text-muted-foreground">Oct 25, 2024</p>
                    <p className="font-medium text-foreground">Interview Rounds</p>
                    <p className="text-xs text-muted-foreground">Shortlisted candidates only</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Attachments */}
            <div className="bg-card rounded-xl p-6 border border-border">
              <h3 className="font-semibold text-foreground mb-4">Attachments</h3>
              <div className="flex items-center gap-3 p-3 rounded-lg bg-muted">
                <FileText className="w-10 h-10 text-primary" />
                <div>
                  <p className="font-medium text-foreground">Job_Description.pdf</p>
                  <p className="text-xs text-muted-foreground">2.4 MB</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
