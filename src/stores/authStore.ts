import { create } from 'zustand';
import { supabase } from '@/integrations/supabase/client';
import { User, Session } from '@supabase/supabase-js';

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
  user: User | null;
  session: Session | null;
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

const fetchProfileAndRole = async (userId: string, set: any) => {
  try {
    const { data: profile } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .maybeSingle();

    const { data: roleData } = await supabase
      .from('user_roles')
      .select('role')
      .eq('user_id', userId)
      .maybeSingle();

    set({ 
      profile: profile as Profile | null,
      role: (roleData?.role as AppRole) ?? 'student'
    });
  } catch (error) {
    console.error('Error fetching profile/role:', error);
  }
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  session: null,
  profile: null,
  role: null,
  isAuthenticated: false,
  isLoading: false,
  initialized: false,

  initialize: async () => {
    // Set up auth state listener FIRST
    supabase.auth.onAuthStateChange((event, session) => {
      set({ 
        session, 
        user: session?.user ?? null,
        isAuthenticated: !!session?.user 
      });
      
      // Defer profile/role fetch to avoid deadlock
      if (session?.user) {
        setTimeout(() => {
          fetchProfileAndRole(session.user.id, set);
        }, 0);
      } else {
        set({ profile: null, role: null });
      }
    });

    // THEN check for existing session
    const { data: { session } } = await supabase.auth.getSession();
    set({ 
      session, 
      user: session?.user ?? null,
      isAuthenticated: !!session?.user,
      initialized: true
    });

    if (session?.user) {
      await fetchProfileAndRole(session.user.id, set);
    }
  },

  login: async (email: string, password: string) => {
    set({ isLoading: true });
    
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    set({ isLoading: false });
    
    if (error) {
      return { error: error.message };
    }
    
    return { error: null };
  },

  signup: async (email: string, password: string, name: string, role: AppRole, department?: string, batch?: string) => {
    set({ isLoading: true });
    
    const redirectUrl = `${window.location.origin}/`;
    
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: redirectUrl,
        data: {
          name,
          role,
          department: department || (role === 'student' ? 'Computer Science (B.Tech)' : 'Placement Cell'),
          batch: batch || (role === 'student' ? '2024' : undefined),
        },
      },
    });

    set({ isLoading: false });
    
    if (error) {
      if (error.message.includes('already registered')) {
        return { error: 'This email is already registered. Please log in instead.' };
      }
      return { error: error.message };
    }
    
    return { error: null };
  },

  loginWithGoogle: async () => {
    set({ isLoading: true });
    
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/dashboard`,
      },
    });

    set({ isLoading: false });
    
    if (error) {
      return { error: error.message };
    }
    
    return { error: null };
  },

  logout: async () => {
    await supabase.auth.signOut();
    set({ 
      user: null, 
      session: null, 
      profile: null, 
      role: null, 
      isAuthenticated: false 
    });
  },
}));
