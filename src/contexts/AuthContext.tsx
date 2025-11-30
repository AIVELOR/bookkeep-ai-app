import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase';

interface UserRole {
  role: 'client' | 'accountant';
  profileId: string;
}

interface AuthContextType {
  user: User | null;
  session: Session | null;
  userRole: UserRole | null;
  loading: boolean;
  signUp: (email: string, password: string, role: 'client' | 'accountant', name: string) => Promise<{ error: Error | null }>;
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [userRole, setUserRole] = useState<UserRole | null>(null);
  const [loading, setLoading] = useState(true);

  console.log('AuthProvider state:', { loading, hasUser: !!user, hasRole: !!userRole });

  useEffect(() => {
    let mounted = true;

    const maxLoadingTimeout = setTimeout(() => {
      console.warn('Auth loading timeout - forcing loading to false');
      if (mounted) {
        setLoading(false);
      }
    }, 10000);

    const initAuth = async () => {
      try {
        console.log('Initializing auth...');
        const { data: { session }, error } = await supabase.auth.getSession();

        if (!mounted) return;

        if (error) {
          console.error('Error getting session:', error);
          setLoading(false);
          return;
        }

        console.log('Session retrieved:', !!session);
        setSession(session);
        setUser(session?.user ?? null);

        if (session?.user) {
          console.log('Fetching user role for:', session.user.id);
          await fetchUserRole(session.user.id);
        } else {
          console.log('No session, setting loading false');
          setLoading(false);
        }
      } catch (error) {
        console.error('Auth initialization error:', error);
        if (mounted) {
          setLoading(false);
        }
      }
    };

    initAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      (async () => {
        if (!mounted) return;

        console.log('Auth state changed:', _event, !!session);
        setSession(session);
        setUser(session?.user ?? null);

        if (session?.user) {
          await fetchUserRole(session.user.id);
        } else {
          setUserRole(null);
          setLoading(false);
        }
      })();
    });

    return () => {
      mounted = false;
      clearTimeout(maxLoadingTimeout);
      subscription.unsubscribe();
    };
  }, []);

  const fetchUserRole = async (userId: string) => {
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => reject(new Error('Timeout fetching user role')), 5000);
    });

    try {
      await Promise.race([
        (async () => {
          const { data: clientData, error: clientError } = await supabase
            .from('clients')
            .select('id')
            .eq('user_id', userId)
            .maybeSingle();

          if (clientError) {
            console.error('Error fetching client data:', clientError);
          }

          if (clientData) {
            setUserRole({ role: 'client', profileId: clientData.id });
            setLoading(false);
            return;
          }

          const { data: staffData, error: staffError } = await supabase
            .from('agency_staff')
            .select('id')
            .eq('user_id', userId)
            .maybeSingle();

          if (staffError) {
            console.error('Error fetching staff data:', staffError);
          }

          if (staffData) {
            setUserRole({ role: 'accountant', profileId: staffData.id });
            setLoading(false);
            return;
          }

          console.warn('No role found for user:', userId);
          setUserRole(null);
          setLoading(false);
        })(),
        timeoutPromise
      ]);
    } catch (error) {
      console.error('Error fetching user role:', error);
      setUserRole(null);
      setLoading(false);
    }
  };

  const signUp = async (email: string, password: string, role: 'client' | 'accountant', name: string) => {
    setLoading(true);
    try {
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
      });

      if (authError) throw authError;
      if (!authData.user) throw new Error('User creation failed');

      if (role === 'client') {
        const { error: profileError } = await supabase
          .from('clients')
          .insert({
            user_id: authData.user.id,
            name,
            email,
            company_name: '',
            organization_number: '',
            phone: '',
            address: ''
          });

        if (profileError) {
          console.error('Client profile creation error:', profileError);
          await supabase.auth.admin.deleteUser(authData.user.id);
          throw new Error('Failed to create client profile. Please try again.');
        }
      } else {
        const { data: agencyData, error: agencyError } = await supabase
          .from('agencies')
          .insert({
            name: `${name}'s Agency`,
            organization_number: '',
            address: '',
            phone: '',
            email
          })
          .select()
          .single();

        if (agencyError) {
          console.error('Agency creation error:', agencyError);
          await supabase.auth.admin.deleteUser(authData.user.id);
          throw new Error('Failed to create agency. Please try again.');
        }

        const { error: staffError } = await supabase
          .from('agency_staff')
          .insert({
            agency_id: agencyData.id,
            user_id: authData.user.id,
            name,
            email,
            role: 'admin'
          });

        if (staffError) {
          console.error('Staff creation error:', staffError);
          await supabase.auth.admin.deleteUser(authData.user.id);
          throw new Error('Failed to create staff profile. Please try again.');
        }
      }

      await fetchUserRole(authData.user.id);
      setLoading(false);

      return { error: null };
    } catch (error) {
      console.error('Sign up error:', error);
      setLoading(false);
      return { error: error as Error };
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
      return { error: null };
    } catch (error) {
      return { error: error as Error };
    }
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setUserRole(null);
  };

  if (loading) {
    return (
      <AuthContext.Provider value={{ user, session, userRole, loading, signUp, signIn, signOut }}>
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading...</p>
          </div>
        </div>
      </AuthContext.Provider>
    );
  }

  return (
    <AuthContext.Provider value={{ user, session, userRole, loading, signUp, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
