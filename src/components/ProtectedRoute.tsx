import { ReactNode, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';

interface ProtectedRouteProps {
  children: ReactNode;
  requiredRole: 'client' | 'accountant';
}

export function ProtectedRoute({ children, requiredRole }: ProtectedRouteProps) {
  const { user, userRole, loading } = useAuth();
  const navigate = useNavigate();
  const [checkingOnboarding, setCheckingOnboarding] = useState(true);

  useEffect(() => {
    const checkAccess = async () => {
      if (!loading) {
        if (!user) {
          navigate('/');
          return;
        }

        if (userRole && userRole.role === 'client') {
          const { data: client, error } = await supabase
            .from('clients')
            .select('onboarding_completed')
            .eq('id', userRole.profileId)
            .maybeSingle();

          if (error) {
            console.error('Error checking onboarding:', error);
            setCheckingOnboarding(false);
            return;
          }

          if (!client?.onboarding_completed) {
            navigate('/auth/onboarding');
            return;
          }
        }

        if (userRole && userRole.role !== requiredRole) {
          if (userRole.role === 'client') {
            navigate('/client/upload');
          } else {
            navigate('/agency/dashboard');
          }
        }

        setCheckingOnboarding(false);
      }
    };

    checkAccess();
  }, [user, userRole, loading, requiredRole, navigate]);

  if (loading || checkingOnboarding) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
        </div>
      </div>
    );
  }

  if (!user || !userRole || userRole.role !== requiredRole) {
    return null;
  }

  return <>{children}</>;
}
