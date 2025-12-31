import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
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

export function useCompanies() {
  return useQuery({
    queryKey: ['companies'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('companies')
        .select('*')
        .order('drive_date', { ascending: true });

      if (error) throw error;

      // Get registration counts for each company
      const companiesWithCounts = await Promise.all(
        (data || []).map(async (company) => {
          const { count } = await supabase
            .from('registrations')
            .select('*', { count: 'exact', head: true })
            .eq('company_id', company.id);

          return {
            ...company,
            registration_count: count || 0,
          };
        })
      );

      return companiesWithCounts as Company[];
    },
  });
}

export function useCompany(id: string) {
  return useQuery({
    queryKey: ['company', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('companies')
        .select('*')
        .eq('id', id)
        .maybeSingle();

      if (error) throw error;

      // Get registration count
      const { count } = await supabase
        .from('registrations')
        .select('*', { count: 'exact', head: true })
        .eq('company_id', id);

      return {
        ...data,
        registration_count: count || 0,
      } as Company;
    },
    enabled: !!id,
  });
}

export function useCreateCompany() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (company: Omit<Company, 'id' | 'created_at' | 'updated_at' | 'registration_count'>) => {
      const { data, error } = await supabase
        .from('companies')
        .insert(company)
        .select()
        .single();

      if (error) throw error;
      return data;
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
      const { data, error } = await supabase
        .from('companies')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
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
      const { error } = await supabase
        .from('companies')
        .delete()
        .eq('id', id);

      if (error) throw error;
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
