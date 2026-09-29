import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase, isSupabaseConfigured, getSupabaseCredentials } from '../lib/supabase';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  isAdmin: boolean;
  isConfigured: boolean;
  signIn: (email: string, pass: string) => Promise<{ error: string | null }>;
  signUp: (email: string, pass: string) => Promise<{ error: string | null; needsConfirmation?: boolean }>;
  signOut: () => Promise<void>;
  refreshAuth: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [isConfigured, setIsConfigured] = useState(isSupabaseConfigured());

  useEffect(() => {
    let mounted = true;

    async function checkSession() {
      const configured = isSupabaseConfigured();
      setIsConfigured(configured);

      if (!configured) {
        setLoading(false);
        return;
      }

      try {
        const { data } = await supabase.auth.getSession();
        if (mounted) {
          setSession(data.session);
          setUser(data.session?.user || null);
          setLoading(false);
        }
      } catch (err) {
        console.error('Error fetching auth session:', err);
        if (mounted) setLoading(false);
      }
    }

    checkSession();

    if (isConfigured) {
      const { data: authListener } = supabase.auth.onAuthStateChange((_event, newSession) => {
        if (mounted) {
          setSession(newSession);
          setUser(newSession?.user || null);
          setLoading(false);
        }
      });

      return () => {
        mounted = false;
        authListener.subscription.unsubscribe();
      };
    } else {
      return () => {
        mounted = false;
      };
    }
  }, [isConfigured]);

  const signIn = async (email: string, pass: string): Promise<{ error: string | null }> => {
    if (!isSupabaseConfigured()) {
      return { error: 'Supabase credentials are not configured yet. Please configure them below.' };
    }

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password: pass,
      });

      if (error) {
        return { error: error.message };
      }

      setUser(data.user);
      setSession(data.session);
      return { error: null };
    } catch (err: any) {
      return { error: err.message || 'Login failed' };
    }
  };

  const signUp = async (email: string, pass: string): Promise<{ error: string | null; needsConfirmation?: boolean }> => {
    if (!isSupabaseConfigured()) {
      return { error: 'Supabase credentials are not configured yet.' };
    }

    try {
      const { data, error } = await supabase.auth.signUp({
        email: email.trim(),
        password: pass,
      });

      if (error) {
        return { error: error.message };
      }

      if (data.session) {
        setUser(data.user);
        setSession(data.session);
        return { error: null, needsConfirmation: false };
      }

      // If Supabase has email confirmation enabled
      return { error: null, needsConfirmation: true };
    } catch (err: any) {
      return { error: err.message || 'Sign up failed' };
    }
  };

  const signOut = async (): Promise<void> => {
    try {
      await supabase.auth.signOut();
    } catch (err) {
      console.warn('Sign out error:', err);
    } finally {
      setUser(null);
      setSession(null);
    }
  };

  const refreshAuth = async (): Promise<void> => {
    setIsConfigured(isSupabaseConfigured());
    try {
      const { data } = await supabase.auth.getSession();
      setSession(data.session);
      setUser(data.session?.user || null);
    } catch (err) {
      console.error('refreshAuth error:', err);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        loading,
        isAdmin: Boolean(user),
        isConfigured,
        signIn,
        signUp,
        signOut,
        refreshAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
