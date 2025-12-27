import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface StatCardProps {
  title: string;
  value: string | number;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral';
  icon: ReactNode;
  iconBgColor?: string;
  className?: string;
}

export function StatCard({
  title,
  value,
  change,
  changeType = 'neutral',
  icon,
  iconBgColor = 'bg-primary/10',
  className,
}: StatCardProps) {
  return (
    <div className={cn('stat-card', className)}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-muted-foreground mb-1">{title}</p>
          <p className="text-3xl font-bold text-foreground">{value}</p>
          {change && (
            <p
              className={cn(
                'text-sm mt-1 flex items-center gap-1',
                changeType === 'positive' && 'text-success',
                changeType === 'negative' && 'text-destructive',
                changeType === 'neutral' && 'text-muted-foreground'
              )}
            >
              {changeType === 'positive' && '↗'}
              {changeType === 'negative' && '↘'}
              {change}
            </p>
          )}
        </div>
        <div className={cn('p-3 rounded-xl', iconBgColor)}>
          {icon}
        </div>
      </div>
    </div>
  );
}
