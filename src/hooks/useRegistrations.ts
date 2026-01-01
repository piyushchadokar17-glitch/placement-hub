import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuthStore } from '@/stores/authStore';
import { toast } from 'sonner';

export interface Registration {
  id: string;
  user_id: string;
  company_id: string;
  status: 'registered' | 'applied' | 'shortlisted' | 'interviewing' | 'selected' | 'rejected';
  created_at: string;
  updated_at: string;
}

// Mock registration data
const mockRegistrations: Registration[] = [
  {
    id: '1',
    user_id: '1',
    company_id: '1',
    status: 'registered',
    created_at: '2024-01-10',
    updated_at: '2024-01-10',
  },
  {
    id: '2',
    user_id: '1',
    company_id: '2',
    status: 'shortlisted',
    created_at: '2024-01-08',
    updated_at: '2024-01-12',
  },
];

export function useUserRegistrations() {
  const { user } = useAuthStore();

  return useQuery({
    queryKey: ['registrations', user?.id],
    queryFn: async () => {
      if (!user?.id) return [];
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 300));
      
      return mockRegistrations.filter(reg => reg.user_id === user.id);
    },
    enabled: !!user?.id,
  });
}

export function useAllRegistrations() {
  return useQuery({
    queryKey: ['all-registrations'],
    queryFn: async () => {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Mock enhanced data with user and company details
      return mockRegistrations.map(reg => ({
        ...reg,
        profiles: {
          name: reg.user_id === '1' ? 'John Student' : 'Jane Student',
          email: reg.user_id === '1' ? 'student@example.com' : 'jane@example.com',
          department: 'Computer Science (B.Tech)',
          batch: '2024',
        },
        companies: {
          name: reg.company_id === '1' ? 'Google' : reg.company_id === '2' ? 'Microsoft' : 'Amazon',
          role: reg.company_id === '1' ? 'Software Engineer' : 'Software Development Engineer',
        },
      }));
    },
  });
}

export function useRegisterForDrive() {
  const queryClient = useQueryClient();
  const { user } = useAuthStore();

  return useMutation({
    mutationFn: async (companyId: string) => {
      if (!user?.id) throw new Error('Not authenticated');

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Check if already registered
      if (mockRegistrations.find(reg => reg.user_id === user.id && reg.company_id === companyId)) {
        throw new Error('You are already registered for this drive');
      }

      const newRegistration: Registration = {
        id: Date.now().toString(),
        user_id: user.id,
        company_id: companyId,
        status: 'registered',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      return newRegistration;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['registrations'] });
      queryClient.invalidateQueries({ queryKey: ['companies'] });
      toast.success('Successfully registered for the drive!');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to register');
    },
  });
}

export function useUnregisterFromDrive() {
  const queryClient = useQueryClient();
  const { user } = useAuthStore();

  return useMutation({
    mutationFn: async (companyId: string) => {
      if (!user?.id) throw new Error('Not authenticated');

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      return { companyId };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['registrations'] });
      queryClient.invalidateQueries({ queryKey: ['companies'] });
      toast.success('Successfully unregistered from the drive');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to unregister');
    },
  });
}
