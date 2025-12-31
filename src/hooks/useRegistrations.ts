import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuthStore } from '@/stores/authStore';
import { toast } from 'sonner';
import { useEffect } from 'react';

export interface Registration {
  id: string;
  user_id: string;
  company_id: string;
  status: 'registered' | 'applied' | 'shortlisted' | 'interviewing' | 'selected' | 'rejected';
  created_at: string;
  updated_at: string;
}

export function useUserRegistrations() {
  const { user } = useAuthStore();

  return useQuery({
    queryKey: ['registrations', user?.id],
    queryFn: async () => {
      if (!user?.id) return [];

      const { data, error } = await supabase
        .from('registrations')
        .select('*')
        .eq('user_id', user.id);

      if (error) throw error;
      return data as Registration[];
    },
    enabled: !!user?.id,
  });
}

export function useAllRegistrations() {
  return useQuery({
    queryKey: ['all-registrations'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('registrations')
        .select(`
          *,
          profiles:user_id (name, email, department, batch),
          companies:company_id (name, role)
        `);

      if (error) throw error;
      return data;
    },
  });
}

export function useRegisterForDrive() {
  const queryClient = useQueryClient();
  const { user } = useAuthStore();

  return useMutation({
    mutationFn: async (companyId: string) => {
      if (!user?.id) throw new Error('Not authenticated');

      const { data, error } = await supabase
        .from('registrations')
        .insert({
          user_id: user.id,
          company_id: companyId,
          status: 'registered',
        })
        .select()
        .single();

      if (error) {
        if (error.code === '23505') {
          throw new Error('You are already registered for this drive');
        }
        throw error;
      }
      return data;
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

      const { error } = await supabase
        .from('registrations')
        .delete()
        .eq('user_id', user.id)
        .eq('company_id', companyId);

      if (error) throw error;
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

export function useRealtimeRegistrations() {
  const queryClient = useQueryClient();

  useEffect(() => {
    const channel = supabase
      .channel('registrations-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'registrations',
        },
        () => {
          queryClient.invalidateQueries({ queryKey: ['registrations'] });
          queryClient.invalidateQueries({ queryKey: ['companies'] });
          queryClient.invalidateQueries({ queryKey: ['all-registrations'] });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [queryClient]);
}
