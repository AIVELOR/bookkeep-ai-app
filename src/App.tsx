import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from '@/components/ui/sonner';
import { AuthProvider } from '@/contexts/AuthContext';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import LandingPage from './pages/LandingPage';
import Onboarding from './pages/auth/Onboarding';
import ClientUpload from './pages/client/Upload';
import ClientReview from './pages/client/Review';
import ClientMyReceipts from './pages/client/MyReceipts';
import ClientProfile from './pages/client/Profile';
import AgencyDashboard from './pages/agency/Dashboard';
import AgencyReviewDetail from './pages/agency/ReviewDetail';
import AgencySettings from './pages/agency/Settings';
import AgencyClients from './pages/agency/Clients';

function App() {
  console.log('App component rendering');

  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/auth/onboarding" element={<Onboarding />} />
            <Route
              path="/client/upload"
              element={
                <ProtectedRoute requiredRole="client">
                  <ClientUpload />
                </ProtectedRoute>
              }
            />
            <Route
              path="/client/review"
              element={
                <ProtectedRoute requiredRole="client">
                  <ClientReview />
                </ProtectedRoute>
              }
            />
            <Route
              path="/client/my-receipts"
              element={
                <ProtectedRoute requiredRole="client">
                  <ClientMyReceipts />
                </ProtectedRoute>
              }
            />
            <Route
              path="/client/profile"
              element={
                <ProtectedRoute requiredRole="client">
                  <ClientProfile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/agency/dashboard"
              element={
                <ProtectedRoute requiredRole="accountant">
                  <AgencyDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/agency/review/:id"
              element={
                <ProtectedRoute requiredRole="accountant">
                  <AgencyReviewDetail />
                </ProtectedRoute>
              }
            />
            <Route
              path="/agency/settings"
              element={
                <ProtectedRoute requiredRole="accountant">
                  <AgencySettings />
                </ProtectedRoute>
              }
            />
            <Route
              path="/agency/clients"
              element={
                <ProtectedRoute requiredRole="accountant">
                  <AgencyClients />
                </ProtectedRoute>
              }
            />
          </Routes>
          <Toaster />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
