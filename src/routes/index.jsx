// src/routes/index.jsx
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import Dashboard from '../pages/Dashboard/Dashboard'; 
import Taxpayers from '../pages/Taxpayers';
import Payments from '../pages/Payments';
import Reports from '../pages/Reports';
import Login from '../pages/Login';
import RegisterPage from '../pages/Login/RegisterPage';
import { useAuth } from '../hooks/useAuth';
import ManualPayment from '../pages/ManualPayment';
import AuthLayout from '../layouts/AuthLayout';
import DashboardPage from '../pages/Dashboard';
import Logout from '../pages/Logout';
import PrivateRoute from './PrivateRoute';
import RevenueStreams from '../pages/RevenueStreams';
import Invoices from '../pages/Invoices';
import Reconciliation from '../pages/Reconciliation';
import Analytics from '../pages/Analytics';
import Settings from '../pages/Settings';
import Users from '../pages/Users';

export default function AppRoutes() {
  const { isAuthenticated, hasRole } = useAuth();

  console.log("isAuthenticated:", isAuthenticated);

  return (
    <Router>
      <Routes>
        {/* Public / Auth Routes */}
        <Route
          path="/login"
          element={
            isAuthenticated ? <Navigate to="/" replace /> : <Login />
          }
        />
        <Route
          path="/register"
          element={
            isAuthenticated ? <Navigate to="/" replace /> : <RegisterPage />
          }
        />

        {/* Protected Routes */}
        <Route
          path="/"
          element={
            isAuthenticated
              ? <PrivateRoute><MainLayout /></PrivateRoute>
              : <Navigate to="/login" />
          }
        >
          {/* <Route path="logout" element={<Logout />} /> */}
          <Route index element={<DashboardPage />} />
          <Route path="taxpayers" element={<Taxpayers />} />
          <Route path="payments" element={<Payments />} />
          <Route path="reports" element={<Reports />} />
          <Route path="manual-payment" element={<ManualPayment />} />
          <Route path="revenue-streams" element={<RevenueStreams />} />
          <Route path="invoices" element={<Invoices />} />
          <Route path="reconciliation" element={<Reconciliation />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="settings" element={<Settings />} />
          {/* Only allow users with ADMIN role to access user management */}
          <Route 
            path="users" 
            element={
              hasRole('ADMIN') ? <Users /> : <Navigate to="/" replace />
            } 
          />
        </Route>
      </Routes>
    </Router>
  );
}
