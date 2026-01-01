import { create } from 'zustand';

export type AppRole = 'admin' | 'student';

interface Profile {
  id: string;
  email: string;
  name: string;
  department?: string;
  batch?: string;
  avatar_url?: string;
}

interface AuthState {
  user: { id: string; email: string } | null;
  profile: Profile | null;
  role: AppRole | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  initialized: boolean;
  login: (email: string, password: string) => Promise<{ error: string | null }>;
  signup: (email: string, password: string, name: string, role: AppRole, department?: string, batch?: string) => Promise<{ error: string | null }>;
  loginWithGoogle: () => Promise<{ error: string | null }>;
  logout: () => Promise<void>;
  initialize: () => Promise<void>;
}

// Mock user data for demo purposes
const mockUsers = [
  { id: '1', email: 'student@example.com', password: 'password', role: 'student' as AppRole, name: 'John Student' },
  { id: '2', email: 'admin@example.com', password: 'password', role: 'admin' as AppRole, name: 'Admin User' }
];

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  profile: null,
  role: null,
  isAuthenticated: false,
  isLoading: false,
  initialized: false,

  initialize: async () => {
    // Check localStorage for persisted session
    const savedUser = localStorage.getItem('authUser');
    if (savedUser) {
      const user = JSON.parse(savedUser);
      const mockUser = mockUsers.find(u => u.email === user.email);
      if (mockUser) {
        set({
          user: { id: mockUser.id, email: mockUser.email },
          profile: {
            id: mockUser.id,
            email: mockUser.email,
            name: mockUser.name,
            department: mockUser.role === 'student' ? 'Computer Science (B.Tech)' : 'Placement Cell',
            batch: mockUser.role === 'student' ? '2024' : undefined,
          },
          role: mockUser.role,
          isAuthenticated: true,
          initialized: true
        });
        return;
      }
    }
    set({ initialized: true });
  },

  login: async (email: string, password: string) => {
    set({ isLoading: true });
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const mockUser = mockUsers.find(u => u.email === email && u.password === password);
    
    if (mockUser) {
      const user = { id: mockUser.id, email: mockUser.email };
      localStorage.setItem('authUser', JSON.stringify(user));
      
      set({
        user,
        profile: {
          id: mockUser.id,
          email: mockUser.email,
          name: mockUser.name,
          department: mockUser.role === 'student' ? 'Computer Science (B.Tech)' : 'Placement Cell',
          batch: mockUser.role === 'student' ? '2024' : undefined,
        },
        role: mockUser.role,
        isAuthenticated: true,
        isLoading: false
      });
      
      return { error: null };
    }
    
    set({ isLoading: false });
    return { error: 'Invalid email or password' };
  },

  signup: async (email: string, password: string, name: string, role: AppRole, department?: string, batch?: string) => {
    set({ isLoading: true });
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Check if user already exists
    if (mockUsers.find(u => u.email === email)) {
      set({ isLoading: false });
      return { error: 'This email is already registered. Please log in instead.' };
    }
    
    // In a real app, this would create a user in the database
    // For demo, we'll just show success
    set({ isLoading: false });
    return { error: null };
  },

  loginWithGoogle: async () => {
    set({ isLoading: true });
    
    // Simulate OAuth delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock Google login - auto-login as student
    const mockUser = mockUsers.find(u => u.role === 'student');
    if (mockUser) {
      const user = { id: mockUser.id, email: mockUser.email };
      localStorage.setItem('authUser', JSON.stringify(user));
      
      set({
        user,
        profile: {
          id: mockUser.id,
          email: mockUser.email,
          name: mockUser.name,
          department: 'Computer Science (B.Tech)',
          batch: '2024',
        },
        role: 'student',
        isAuthenticated: true,
        isLoading: false
      });
      
      return { error: null };
    }
    
    set({ isLoading: false });
    return { error: 'Google login failed' };
  },

  logout: async () => {
    localStorage.removeItem('authUser');
    set({ 
      user: null, 
      profile: null, 
      role: null, 
      isAuthenticated: false 
    });
  },
}));
