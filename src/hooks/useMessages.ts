import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuthStore } from '@/stores/authStore';
import { toast } from 'sonner';

export interface Message {
  id: string;
  company_id: string;
  user_id: string;
  content: string;
  is_pinned: boolean;
  created_at: string;
  updated_at: string;
  profile?: {
    name: string;
    avatar_url?: string;
  };
  user_role?: 'admin' | 'student';
}

// Mock message data
const mockMessages: Message[] = [
  {
    id: '1',
    company_id: '1',
    user_id: '2',
    content: 'Google interview tips: Focus on data structures and algorithms. Practice LeetCode medium problems.',
    is_pinned: true,
    created_at: '2024-01-10',
    updated_at: '2024-01-10',
    profile: {
      name: 'Admin User',
      avatar_url: undefined,
    },
    user_role: 'admin',
  },
  {
    id: '2',
    company_id: '1',
    user_id: '1',
    content: 'Has anyone appeared for Google interview before? How was the experience?',
    is_pinned: false,
    created_at: '2024-01-11',
    updated_at: '2024-01-11',
    profile: {
      name: 'John Student',
      avatar_url: undefined,
    },
    user_role: 'student',
  },
];

export function useCompanyMessages(companyId: string) {
  return useQuery({
    queryKey: ['messages', companyId],
    queryFn: async () => {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 300));
      
      return mockMessages.filter(msg => msg.company_id === companyId);
    },
    enabled: !!companyId,
  });
}

export function useSendMessage() {
  const queryClient = useQueryClient();
  const { user } = useAuthStore();

  return useMutation({
    mutationFn: async ({ companyId, content }: { companyId: string; content: string }) => {
      if (!user?.id) throw new Error('Not authenticated');

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      const newMessage: Message = {
        id: Date.now().toString(),
        company_id: companyId,
        user_id: user.id,
        content,
        is_pinned: false,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        profile: {
          name: user.id === '1' ? 'John Student' : 'Admin User',
          avatar_url: undefined,
        },
        user_role: user.id === '1' ? 'student' : 'admin',
      };

      return newMessage;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['messages', variables.companyId] });
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to send message');
    },
  });
}

export function useDeleteMessage() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ messageId, companyId }: { messageId: string; companyId: string }) => {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      return { companyId };
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['messages', data.companyId] });
      toast.success('Message deleted');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to delete message');
    },
  });
}

export function usePinMessage() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ messageId, companyId, isPinned }: { messageId: string; companyId: string; isPinned: boolean }) => {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      return { companyId };
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['messages', data.companyId] });
      toast.success('Message updated');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to update message');
    },
  });
}
