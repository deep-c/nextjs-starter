import React from 'react';
import { ADMIN_DASHBOARD, NextRoutePage } from '@/routes';
import AdminLayout from '@/layouts/admin';

export interface AdminDashboardProps {}

export const AdminDashboard: NextRoutePage<AdminDashboardProps> = () => {
  return <div>My dashboard</div>;
};

AdminDashboard.auth = ADMIN_DASHBOARD.auth;
AdminDashboard.layout = AdminLayout;

export default AdminDashboard;
