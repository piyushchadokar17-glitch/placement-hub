import { cn } from '@/lib/utils';

type StatusBadgeVariant = 'upcoming' | 'ongoing' | 'completed' | 'closed' | 'applied' | 'shortlisted' | 'interviewing' | 'selected' | 'rejected' | 'registered';

interface StatusBadgeProps {
  variant: StatusBadgeVariant;
  className?: string;
}

const variantStyles: Record<StatusBadgeVariant, string> = {
  upcoming: 'badge-upcoming',
  ongoing: 'bg-info/10 text-info border border-info/20',
  completed: 'bg-success/10 text-success border border-success/20',
  closed: 'badge-closed',
  applied: 'badge-applied',
  registered: 'badge-applied',
  shortlisted: 'badge-shortlisted',
  interviewing: 'badge-interviewing',
  selected: 'bg-success/10 text-success border border-success/20',
  rejected: 'bg-destructive/10 text-destructive border border-destructive/20',
};

const variantLabels: Record<StatusBadgeVariant, string> = {
  upcoming: 'Upcoming',
  ongoing: 'Ongoing',
  completed: 'Completed',
  closed: 'Closed',
  applied: 'Applied',
  registered: 'Registered',
  shortlisted: 'Shortlisted',
  interviewing: 'Interviewing',
  selected: 'Selected',
  rejected: 'Rejected',
};

export function StatusBadge({ variant, className }: StatusBadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
        variantStyles[variant],
        className
      )}
    >
      {variantLabels[variant]}
    </span>
  );
}
