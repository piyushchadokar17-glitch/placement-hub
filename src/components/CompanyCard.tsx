import { Company } from '@/types';
import { StatusBadge } from './StatusBadge';
import { MapPin, IndianRupee, Calendar, Users } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';

interface CompanyCardProps {
  company: Company;
  onRegister?: (companyId: string) => void;
}

export function CompanyCard({ company, onRegister }: CompanyCardProps) {
  const getCompanyInitials = (name: string) => {
    return name.split(' ').map(word => word[0]).join('').slice(0, 2).toUpperCase();
  };

  const getCompanyColor = (name: string) => {
    const colors = [
      'bg-primary',
      'bg-success',
      'bg-warning',
      'bg-info',
      'bg-destructive',
    ];
    const index = name.charCodeAt(0) % colors.length;
    return colors[index];
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <div className="company-card group">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div
            className={cn(
              'w-12 h-12 rounded-xl flex items-center justify-center text-sm font-bold text-primary-foreground',
              getCompanyColor(company.name)
            )}
          >
            {getCompanyInitials(company.name)}
          </div>
          <div>
            <Link to={`/company/${company.id}`} className="hover:text-primary transition-colors">
              <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                {company.name}
              </h3>
            </Link>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <MapPin className="w-3.5 h-3.5" />
              <span>{company.location}</span>
            </div>
          </div>
        </div>
        <StatusBadge variant={company.applicationStatus || company.status} />
      </div>

      <h4 className="font-medium text-foreground mb-3">{company.role}</h4>

      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
        <div className="flex items-center gap-1">
          <IndianRupee className="w-4 h-4" />
          <span>{company.ctc}</span>
        </div>
        <div className="flex items-center gap-1">
          <Calendar className="w-4 h-4" />
          <span>{formatDate(company.driveDate)}</span>
        </div>
      </div>

      <div className="flex items-center justify-between pt-3 border-t border-border">
        <div className="flex items-center gap-2">
          <div className="flex -space-x-2">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="w-7 h-7 rounded-full bg-muted border-2 border-card flex items-center justify-center"
              >
                <Users className="w-3.5 h-3.5 text-muted-foreground" />
              </div>
            ))}
          </div>
          <span className="text-sm text-muted-foreground">+{company.registeredCount}</span>
        </div>

        {company.status === 'upcoming' && !company.applicationStatus && (
          <button
            onClick={() => onRegister?.(company.id)}
            className="btn-primary text-sm py-2 px-4"
          >
            Register Now
          </button>
        )}

        {company.applicationStatus === 'applied' && (
          <Link
            to={`/company/${company.id}`}
            className="btn-outline text-sm py-2 px-4"
          >
            View Status
          </Link>
        )}

        {company.status === 'closed' && (
          <span className="text-sm text-muted-foreground">Registration Closed</span>
        )}
      </div>
    </div>
  );
}
