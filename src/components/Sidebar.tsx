import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useAuthStore } from '@/stores/authStore';
import {
  LayoutDashboard,
  Briefcase,
  FileText,
  Calendar,
  Settings,
  LogOut,
  Users,
  MessageSquare,
  BarChart3,
  GraduationCap,
} from 'lucide-react';

type NavItem = { icon: typeof LayoutDashboard; label: string; path: string; badge?: number };

const studentNavItems: NavItem[] = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
  { icon: FileText, label: 'My Applications', path: '/applications' },
  { icon: Calendar, label: 'Interviews', path: '/interviews' },
  { icon: FileText, label: 'Resume Builder', path: '/resume' },
  { icon: Briefcase, label: 'Resources', path: '/resources' },
];

const adminNavItems: NavItem[] = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/admin' },
  { icon: Briefcase, label: 'Drives', path: '/admin/drives' },
  { icon: Users, label: 'Students', path: '/admin/students' },
  { icon: MessageSquare, label: 'Forum', path: '/admin/forum', badge: 3 },
  { icon: BarChart3, label: 'Reports', path: '/admin/reports' },
  { icon: Settings, label: 'Settings', path: '/admin/settings' },
];

export function Sidebar() {
  const location = useLocation();
  const { user, profile, logout } = useAuthStore();
  const isAdmin = profile?.role === 'admin';
  const navItems: NavItem[] = isAdmin ? adminNavItems : studentNavItems;

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-sidebar border-r border-sidebar-border flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-sidebar-border">
        <Link to="/" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
            <GraduationCap className="w-6 h-6 text-primary-foreground" />
          </div>
          <div>
            <h1 className="font-bold text-foreground">PlacementCell</h1>
            <p className="text-xs text-muted-foreground">
              {isAdmin ? 'Admin Console' : 'Student Portal'}
            </p>
          </div>
        </Link>
      </div>

      {/* User Profile */}
      <div className="p-4 border-b border-sidebar-border">
        <div className="flex items-center gap-3 p-3 rounded-lg bg-sidebar-accent/50">
          <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
            <span className="text-sm font-medium text-primary">
              {profile?.name?.split(' ').map(n => n[0]).join('').slice(0, 2)}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-medium text-foreground truncate">{profile?.name}</p>
            <p className="text-xs text-muted-foreground truncate">{profile?.department}</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 overflow-y-auto">
        <ul className="space-y-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={cn(
                    isActive ? 'sidebar-link-active' : 'sidebar-link'
                  )}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="flex-1">{item.label}</span>
                  {item.badge && (
                    <span className="px-2 py-0.5 text-xs font-medium bg-destructive text-destructive-foreground rounded-full">
                      {item.badge}
                    </span>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-sidebar-border">
        <button
          onClick={logout}
          className="sidebar-link w-full text-left hover:text-destructive"
        >
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}
