import React from 'react';
import Head from 'next/head';
import { ADMIN_DASHBOARD, NextRoutePage } from '@/routes';
import AdminLayout from '@/layouts/admin';

export interface AdminDashboardProps {}

export const AdminDashboard: NextRoutePage<AdminDashboardProps> = () => {
  return (
    <>
      <Head>
        <title>Dashboard | Admin</title>
        <meta
          name="viewport"
          content="initial-scale=1.0, width=device-width"
        />
        <meta name="description" content="User Dashboard" />
      </Head>
      <div className="pt-6 pb-6">
        <h1 className="text-3xl font-extrabold text-gray-900">Dashboard</h1>
      </div>
    </>
  );
};

AdminDashboard.auth = ADMIN_DASHBOARD.auth;
AdminDashboard.layout = AdminLayout;

export default AdminDashboard;
