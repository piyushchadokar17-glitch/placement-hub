import { User, UserRole } from '@/types';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string, role: UserRole) => Promise<void>;
  signup: (email: string, password: string, name: string, role: UserRole) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  logout: () => void;
  setUser: (user: User | null) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,

      login: async (email: string, password: string, role: UserRole) => {
        set({ isLoading: true });
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const user: User = {
          id: crypto.randomUUID(),
          email,
          name: email.split('@')[0].replace('.', ' ').replace(/\b\w/g, l => l.toUpperCase()),
          role,
          department: role === 'student' ? 'Computer Science (B.Tech)' : 'Placement Cell',
          batch: role === 'student' ? '2024' : undefined,
        };
        
        set({ user, isAuthenticated: true, isLoading: false });
      },

      signup: async (email: string, password: string, name: string, role: UserRole) => {
        set({ isLoading: true });
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const user: User = {
          id: crypto.randomUUID(),
          email,
          name,
          role,
          department: role === 'student' ? 'Computer Science (B.Tech)' : 'Placement Cell',
          batch: role === 'student' ? '2024' : undefined,
        };
        
        set({ user, isAuthenticated: true, isLoading: false });
      },

      loginWithGoogle: async () => {
        set({ isLoading: true });
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const user: User = {
          id: crypto.randomUUID(),
          email: 'student@college.edu',
          name: 'Google User',
          role: 'student',
          department: 'Computer Science (B.Tech)',
          batch: '2024',
        };
        
        set({ user, isAuthenticated: true, isLoading: false });
      },

      logout: () => {
        set({ user: null, isAuthenticated: false });
      },

      setUser: (user) => {
        set({ user, isAuthenticated: !!user });
      },
    }),
    {
      name: 'auth-storage',
    }
  )
);
