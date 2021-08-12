import { useQuery } from '@apollo/client';
import Head from 'next/head';
import Link from 'next/link';
import React from 'react';

import UserAvatar from 'src/components/UserAvatar';
import { meQuery } from 'src/graphql/query/user';
import AdminLayout from 'src/layouts/AdminLayout';
import { ACCOUNT_SETTINGS, ADMIN_DASHBOARD, NextRoutePage } from 'src/routes';

import type { GetMe } from 'src/genTypes/apollo/GetMe';

const stats = [
  { label: 'Items posted for sale', value: 12 },
  { label: 'Items being watched', value: 4 },
  { label: 'New messages', value: 2 },
];

export const AdminDashboard: NextRoutePage<unknown> = () => {
  const { data } = useQuery<GetMe>(meQuery);
  return (
    <>
      <Head>
        <title>Dashboard | Admin</title>
        <meta
          content="initial-scale=1.0, width=device-width"
          name="viewport"
        />
        <meta content="User Dashboard" name="description" />
      </Head>
      <div className="pt-6 pb-6">
        <h1 className="text-3xl font-extrabold text-gray-900">Dashboard</h1>
      </div>
      <div className="overflow-hidden bg-white border-b border-gray-200 rounded-lg shadow">
        <h2 className="sr-only" id="profile-overview-title">
          Profile Overview
        </h2>
        <div className="p-6 bg-white">
          <div className="sm:flex sm:items-center sm:justify-between">
            <div className="sm:flex sm:space-x-5">
              <div className="flex-shrink-0">
                {data?.me && (
                  <UserAvatar image={data.me.image} size={[100, 100]} />
                )}
              </div>
              <div className="mt-4 text-center sm:mt-0 sm:pt-1 sm:text-left">
                <p className="text-sm font-medium text-gray-600">
                  Welcome back,
                </p>
                <p className="text-xl font-bold text-gray-900 sm:text-2xl">
                  {data?.me?.name}
                </p>
                <p className="text-sm font-medium text-gray-600">
                  {data?.me?.bio}
                </p>
              </div>
            </div>
            <div className="flex justify-center mt-5 sm:mt-0">
              <Link href={ACCOUNT_SETTINGS.path}>
                <a className="flex items-center justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 shadow-sm rounded-md hover:bg-gray-50">
                  Edit Settings
                </a>
              </Link>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-200 bg-gray-50 grid grid-cols-1 divide-y divide-gray-200 sm:grid-cols-3 sm:divide-y-0 sm:divide-x">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="px-6 py-5 text-sm font-medium text-center"
            >
              <span className="text-gray-900">{stat.value}</span>{' '}
              <span className="text-gray-600">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

AdminDashboard.auth = ADMIN_DASHBOARD.auth;
AdminDashboard.layout = AdminLayout;

export default AdminDashboard;
