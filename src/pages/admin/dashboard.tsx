import React from 'react';
import { Role } from '@prisma/client';
import { NextAuthPage } from '@/components/Auth';
import routes from '@/routes';
import AdminLayout from '@/layouts/admin';

export interface AdminDashboardProps {}

export const AdminDashboard: NextAuthPage<AdminDashboardProps> = () => {
  return <div>My dashboard</div>;
};

AdminDashboard.auth = {
  loginUrl: routes.ADMIN.LOGIN,
  allowedRoles: [Role.ADMIN, Role.SUPPORT],
};

AdminDashboard.layout = AdminLayout;

export default AdminDashboard;
