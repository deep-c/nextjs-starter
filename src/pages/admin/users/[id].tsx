import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react';

import { ADMIN_USER } from 'src/common/routes';
import { getLayout } from 'src/layouts/AdminLayout';
import UserAdminForm from 'src/modules/user/components/admin/UserAdminForm';

export const AdminDashboard = (): React.ReactElement => {
  const router = useRouter();
  const id = router.query.id as string;

  return (
    <>
      <Head>
        <title>Manage User | Admin</title>
        <meta
          content="initial-scale=1.0, width=device-width"
          name="viewport"
        />
        <meta content="User Admin" name="description" />
      </Head>
      <div className="pt-6 pb-6">
        <h1 className="text-3xl font-extrabold text-gray-900">Manage User</h1>
      </div>
      <UserAdminForm id={id} />
    </>
  );
};

AdminDashboard.auth = ADMIN_USER.auth;
AdminDashboard.getLayout = getLayout;

export default AdminDashboard;
