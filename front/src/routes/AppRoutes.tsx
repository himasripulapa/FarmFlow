import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';

// Public Pages
import { LandingPage } from '../pages/public/LandingPage';
import { ConsumerTracePage } from '../pages/public/ConsumerTracePage';
import { HelpCenterPage } from '../pages/public/HelpCenterPage';
import { NotFoundPage } from '../pages/public/NotFoundPage';

// Auth Pages
import { LoginPage } from '../pages/auth/LoginPage';
import { RegisterPage } from '../pages/auth/RegisterPage';

// Farmer Pages
import { FarmerDashboard } from '../pages/farmer/FarmerDashboard';
import { CreateBatchPage } from '../pages/farmer/CreateBatchPage';
import { MyBatchesPage } from '../pages/farmer/MyBatchesPage';
import { FarmerEarningsPage } from '../pages/farmer/FarmerEarningsPage';

// Collection Center Pages
import { CenterDashboard } from '../pages/center/CenterDashboard';
import { IncomingBatchesPage } from '../pages/center/IncomingBatchesPage';

// Distributor Pages
import { ShipmentsPage } from '../pages/distributor/ShipmentsPage';

// Retailer Pages
import { RetailInventoryPage } from '../pages/retailer/RetailInventoryPage';

// Admin Pages
import { UserManagementPage } from '../pages/admin/UserManagementPage';
import { AnalyticsReportsPage } from '../pages/admin/AnalyticsReportsPage';

// Shared Pages
import { GlobalSearchPage } from '../pages/shared/GlobalSearchPage';
import { TransactionsPage } from '../pages/shared/TransactionsPage';
import { BuyerManagementPage } from '../pages/shared/BuyerManagementPage';
import { ProfilePage } from '../pages/shared/ProfilePage';

// Protected Route Component
import { ProtectedRoute } from './ProtectedRoute';

// Dashboard Router Component
const DynamicDashboard: React.FC = () => {
  const { currentUser } = useAuthStore();
  const role = currentUser?.role || 'farmer';

  switch (role) {
    case 'farmer':
      return <FarmerDashboard />;
    case 'collectionCenter':
      return <CenterDashboard />;
    case 'distributor':
      return <ShipmentsPage />;
    case 'retailer':
      return <RetailInventoryPage />;
    case 'admin':
      return <AnalyticsReportsPage />;
    case 'consumer':
      return <Navigate to="/trace/FF-2026-000101" replace />;
    default:
      return <FarmerDashboard />;
  }
};

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/trace/:batchId" element={<ConsumerTracePage />} />
      <Route path="/help" element={<HelpCenterPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/search" element={<GlobalSearchPage />} />

      {/* Shared Authenticated Routes */}
      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<DynamicDashboard />} />
        <Route path="/shared/transactions" element={<TransactionsPage />} />
        <Route path="/shared/buyers" element={<BuyerManagementPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Route>

      {/* Farmer Routes */}
      <Route element={<ProtectedRoute allowedRoles={['farmer', 'admin']} />}>
        <Route path="/farmer/create-batch" element={<CreateBatchPage />} />
        <Route path="/farmer/my-batches" element={<MyBatchesPage />} />
        <Route path="/farmer/earnings" element={<FarmerEarningsPage />} />
      </Route>

      {/* Collection Center Routes */}
      <Route element={<ProtectedRoute allowedRoles={['collectionCenter', 'admin']} />}>
        <Route path="/center/incoming" element={<IncomingBatchesPage />} />
        <Route path="/center/inventory" element={<IncomingBatchesPage />} />
      </Route>

      {/* Distributor Routes */}
      <Route element={<ProtectedRoute allowedRoles={['distributor', 'admin']} />}>
        <Route path="/distributor/shipments" element={<ShipmentsPage />} />
        <Route path="/distributor/dispatch" element={<ShipmentsPage />} />
      </Route>

      {/* Retailer Routes */}
      <Route element={<ProtectedRoute allowedRoles={['retailer', 'admin']} />}>
        <Route path="/retailer/inventory" element={<RetailInventoryPage />} />
        <Route path="/retailer/sales" element={<RetailInventoryPage />} />
      </Route>

      {/* Admin Routes */}
      <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
        <Route path="/admin/users" element={<UserManagementPage />} />
        <Route path="/admin/analytics" element={<AnalyticsReportsPage />} />
        <Route path="/admin/batches" element={<MyBatchesPage />} />
        <Route path="/admin/settings" element={<ProfilePage />} />
      </Route>

      {/* Fallback 404 */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};
