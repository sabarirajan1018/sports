import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { BetSlipProvider } from './contexts/BetSlipContext';
import { Layout } from './components/layout/Layout';
import {
  LandingPage,
  LoginPage,
  RegisterPage,
  ForgotPasswordPage,
  DashboardPage,
  SportsbookPage,
  LiveBettingPage,
  CasinoPage,
  WalletPage,
  PromotionsPage,
  ProfilePage,
  AdminDashboard,
} from './pages';

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />;
}

function AppRoutes() {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={!isAuthenticated ? <LoginPage /> : <Navigate to="/dashboard" replace />} />
      <Route path="/register" element={!isAuthenticated ? <RegisterPage /> : <Navigate to="/dashboard" replace />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />

      {/* Protected routes with layout */}
      <Route element={<Layout />}>
        <Route path="/dashboard" element={<PrivateRoute><DashboardPage /></PrivateRoute>} />
        <Route path="/sportsbook" element={<PrivateRoute><SportsbookPage /></PrivateRoute>} />
        <Route path="/live" element={<PrivateRoute><LiveBettingPage /></PrivateRoute>} />
        <Route path="/casino" element={<PrivateRoute><CasinoPage /></PrivateRoute>} />
        <Route path="/wallet" element={<PrivateRoute><WalletPage /></PrivateRoute>} />
        <Route path="/promotions" element={<PrivateRoute><PromotionsPage /></PrivateRoute>} />
        <Route path="/profile" element={<PrivateRoute><ProfilePage /></PrivateRoute>} />
      </Route>

      {/* Admin routes */}
      <Route element={<Layout isAdmin />}>
        <Route path="/admin" element={<PrivateRoute><AdminDashboard /></PrivateRoute>} />
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <BetSlipProvider>
          <AppRoutes />
        </BetSlipProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
