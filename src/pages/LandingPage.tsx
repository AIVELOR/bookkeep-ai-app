import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Building2, ReceiptText, Zap, Shield, Clock, CheckCircle2 } from 'lucide-react';
import { SignUpForm } from '@/components/auth/SignUpForm';
import { SignInForm } from '@/components/auth/SignInForm';

export default function LandingPage() {
  const navigate = useNavigate();
  const { user, userRole, loading } = useAuth();
  const [showAuth, setShowAuth] = useState(false);
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signup');

  useEffect(() => {
    const checkOnboardingAndNavigate = async () => {
      if (!loading && user && userRole) {
        if (userRole.role === 'client') {
          const { data: client, error } = await supabase
            .from('clients')
            .select('onboarding_completed')
            .eq('id', userRole.profileId)
            .maybeSingle();

          if (error) {
            console.error('Error checking onboarding status:', error);
            return;
          }

          if (!client?.onboarding_completed) {
            navigate('/auth/onboarding');
          } else {
            navigate('/client/upload');
          }
        } else if (userRole.role === 'accountant') {
          navigate('/agency/dashboard');
        }
      }
    };

    checkOnboardingAndNavigate();
  }, [user, userRole, loading, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
        </div>
      </div>
    );
  }

  if (showAuth) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md shadow-xl">
          <CardHeader className="space-y-1">
            <div className="flex justify-center mb-4">
              <div className="bg-blue-600 p-3 rounded-xl">
                <Building2 className="w-8 h-8 text-white" />
              </div>
            </div>
            <CardTitle className="text-2xl font-bold text-center">
              {authMode === 'signup' ? 'Create your account' : 'Welcome back'}
            </CardTitle>
            <CardDescription className="text-center">
              {authMode === 'signup'
                ? 'Start streamlining your bookkeeping today'
                : 'Sign in to access your portal'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {authMode === 'signup' ? (
              <SignUpForm
                onSuccess={() => {}}
                onToggle={() => setAuthMode('signin')}
              />
            ) : (
              <SignInForm
                onSuccess={() => {}}
                onToggle={() => setAuthMode('signup')}
              />
            )}
            <button
              onClick={() => setShowAuth(false)}
              className="w-full mt-4 text-sm text-gray-600 hover:text-gray-900"
            >
              Back to home
            </button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
      <header className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="bg-blue-600 p-2 rounded-lg">
              <Building2 className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">ReceiptFlow</span>
          </div>
          <Button onClick={() => { setShowAuth(true); setAuthMode('signin'); }} variant="outline">
            Sign In
          </Button>
        </div>
      </header>

      <section className="container mx-auto px-4 pt-20 pb-32">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-8">
            <Zap className="w-4 h-4" />
            Trusted by 500+ accounting firms
          </div>

          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Transform Receipt Processing Into
            <span className="text-blue-600"> Minutes, Not Hours</span>
          </h1>

          <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
            Stop wasting time on manual data entry. ReceiptFlow automatically processes, verifies, and categorizes receipts with AI precision.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Button
              onClick={() => { setShowAuth(true); setAuthMode('signup'); }}
              size="lg"
              className="text-lg px-8 py-6 bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-xl transition-all"
            >
              Start Free Trial
            </Button>
            <Button
              onClick={() => { setShowAuth(true); setAuthMode('signup'); }}
              size="lg"
              variant="outline"
              className="text-lg px-8 py-6 border-2"
            >
              See How It Works
            </Button>
          </div>

          <div className="flex items-center justify-center gap-8 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-green-600" />
              <span>No credit card required</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-green-600" />
              <span>14-day free trial</span>
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-20">
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <Card className="border-2 hover:border-blue-200 transition-colors">
            <CardHeader>
              <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Clock className="w-6 h-6 text-blue-600" />
              </div>
              <CardTitle>Save 10+ Hours Per Week</CardTitle>
              <CardDescription className="text-base">
                Automate receipt data extraction and eliminate manual entry. Process 100 receipts in the time it takes to do 5 manually.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-2 hover:border-blue-200 transition-colors">
            <CardHeader>
              <div className="bg-green-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-green-600" />
              </div>
              <CardTitle>99.8% Accuracy Rate</CardTitle>
              <CardDescription className="text-base">
                AI-powered verification catches errors before they become problems. Built-in compliance checks ensure nothing slips through.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-2 hover:border-blue-200 transition-colors">
            <CardHeader>
              <div className="bg-orange-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <ReceiptText className="w-6 h-6 text-orange-600" />
              </div>
              <CardTitle>Real-Time Collaboration</CardTitle>
              <CardDescription className="text-base">
                Clients upload receipts instantly. Your team reviews and approves from anywhere. Stay synced in real-time.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      <section className="bg-gradient-to-br from-blue-600 to-blue-700 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to eliminate bookkeeping bottlenecks?
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Join hundreds of accounting firms saving 10+ hours per week
            </p>
            <Button
              onClick={() => { setShowAuth(true); setAuthMode('signup'); }}
              size="lg"
              className="bg-white text-blue-600 hover:bg-gray-100 text-lg px-8 py-6"
            >
              Get Started Free
            </Button>
          </div>
        </div>
      </section>

      <footer className="bg-slate-900 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="bg-blue-600 p-2 rounded-lg">
              <Building2 className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg font-bold">ReceiptFlow</span>
          </div>
          <p className="text-slate-400">Streamline your bookkeeping workflow</p>
        </div>
      </footer>
    </div>
  );
}
