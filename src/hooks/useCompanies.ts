import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

export interface Company {
  id: string;
  name: string;
  logo_url?: string;
  location: string;
  role: string;
  ctc: string;
  drive_date: string;
  status: 'upcoming' | 'ongoing' | 'completed' | 'closed';
  description?: string;
  eligibility_cgpa?: string;
  eligibility_branches?: string[];
  eligibility_backlogs_allowed?: number;
  eligibility_class_requirement?: string;
  selection_process?: any;
  created_by?: string;
  created_at: string;
  updated_at: string;
  registration_count?: number;
}

// Mock company data
const mockCompanies: Company[] = [
  {
    id: '1',
    name: 'Google',
    logo_url: 'https://logo.clearbit.com/google.com',
    location: 'Bangalore, India',
    role: 'Software Engineer',
    ctc: '₹30-40 LPA',
    drive_date: '2024-02-15',
    status: 'upcoming',
    description: 'Google is looking for talented software engineers to join their team.',
    eligibility_cgpa: '7.0',
    eligibility_branches: ['Computer Science', 'Information Technology'],
    eligibility_backlogs_allowed: 0,
    eligibility_class_requirement: 'No Active Backlogs',
    selection_process: ['Online Test', 'Technical Interview', 'HR Interview'],
    created_at: '2024-01-01',
    updated_at: '2024-01-01',
    registration_count: 45,
  },
  {
    id: '2',
    name: 'Microsoft',
    logo_url: 'https://logo.clearbit.com/microsoft.com',
    location: 'Hyderabad, India',
    role: 'Software Development Engineer',
    ctc: '₹25-35 LPA',
    drive_date: '2024-02-20',
    status: 'upcoming',
    description: 'Microsoft is hiring SDEs for their Hyderabad office.',
    eligibility_cgpa: '6.5',
    eligibility_branches: ['Computer Science', 'Information Technology', 'Electronics'],
    eligibility_backlogs_allowed: 2,
    eligibility_class_requirement: 'No Active Backlogs',
    selection_process: ['Online Assessment', 'Technical Rounds', 'Managerial Interview'],
    created_at: '2024-01-02',
    updated_at: '2024-01-02',
    registration_count: 38,
  },
  {
    id: '3',
    name: 'Amazon',
    logo_url: 'https://logo.clearbit.com/amazon.com',
    location: 'Bangalore, India',
    role: 'Software Development Engineer',
    ctc: '₹28-40 LPA',
    drive_date: '2024-01-30',
    status: 'ongoing',
    description: 'Amazon is looking for SDEs to join their development teams.',
    eligibility_cgpa: '7.0',
    eligibility_branches: ['Computer Science', 'Information Technology'],
    eligibility_backlogs_allowed: 0,
    eligibility_class_requirement: 'No Active Backlogs',
    selection_process: ['Online Test', 'Technical Interview', 'Bar Raiser', 'HR Interview'],
    created_at: '2024-01-03',
    updated_at: '2024-01-03',
    registration_count: 52,
  },
];

export function useCompanies() {
  return useQuery({
    queryKey: ['companies'],
    queryFn: async () => {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      return mockCompanies;
    },
  });
}

export function useCompany(id: string) {
  return useQuery({
    queryKey: ['company', id],
    queryFn: async () => {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 300));
      return mockCompanies.find(company => company.id === id) || null;
    },
    enabled: !!id,
  });
}

export function useCreateCompany() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (company: Omit<Company, 'id' | 'created_at' | 'updated_at' | 'registration_count'>) => {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newCompany: Company = {
        ...company,
        id: Date.now().toString(),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        registration_count: 0,
      };
      
      return newCompany;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['companies'] });
      toast.success('Company added successfully');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to add company');
    },
  });
}

export function useUpdateCompany() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, ...updates }: Partial<Company> & { id: string }) => {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      return { id, ...updates };
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['companies'] });
      queryClient.invalidateQueries({ queryKey: ['company', variables.id] });
      toast.success('Company updated successfully');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to update company');
    },
  });
}

export function useDeleteCompany() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['companies'] });
      toast.success('Company deleted successfully');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to delete company');
    },
  });
}
