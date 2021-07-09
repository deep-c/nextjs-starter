import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react';
import UserAdminForm from 'src/components/UserAdminForm';
import AdminLayout from 'src/layouts/admin';
import { ADMIN_USER, NextRoutePage } from 'src/routes';

export interface UserAdminProps {}

export const AdminDashboard: NextRoutePage<UserAdminProps> = () => {
  const router = useRouter();
  const id = router.query.id as string;

  return (
    <>
      <Head>
        <title>Manage User | Admin</title>
        <meta
          name="viewport"
          content="initial-scale=1.0, width=device-width"
        />
        <meta name="description" content="User Admin" />
      </Head>
      <div className="pt-6 pb-6">
        <h1 className="text-3xl font-extrabold text-gray-900">Manage User</h1>
      </div>
      <UserAdminForm id={id} />
    </>
  );
};

AdminDashboard.auth = ADMIN_USER.auth;
AdminDashboard.layout = AdminLayout;

export default AdminDashboard;
