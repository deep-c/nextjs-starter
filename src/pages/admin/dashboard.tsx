import Head from 'next/head';
import Image from 'next/image';
import React from 'react';
import AdminLayout from 'src/layouts/admin';
import { ADMIN_DASHBOARD, NextRoutePage } from 'src/routes';

export interface AdminDashboardProps {}

const user = {
  name: 'Rebecca Nicholas',
  role: 'Product Designer',
  imageUrl:
    'https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
};
const stats = [
  { label: 'Items posted for sale', value: 12 },
  { label: 'Items being watched', value: 4 },
  { label: 'New messages', value: 2 },
];

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
      <div className="rounded-lg bg-white overflow-hidden border-b border-gray-200 shadow">
        <h2 className="sr-only" id="profile-overview-title">
          Profile Overview
        </h2>
        <div className="bg-white p-6">
          <div className="sm:flex sm:items-center sm:justify-between">
            <div className="sm:flex sm:space-x-5">
              <div className="flex-shrink-0">
                <Image
                  className="mx-auto h-20 w-20 rounded-full"
                  src={user.imageUrl}
                  alt=""
                  width={100}
                  height={100}
                />
              </div>
              <div className="mt-4 text-center sm:mt-0 sm:pt-1 sm:text-left">
                <p className="text-sm font-medium text-gray-600">
                  Welcome back,
                </p>
                <p className="text-xl font-bold text-gray-900 sm:text-2xl">
                  {user.name}
                </p>
                <p className="text-sm font-medium text-gray-600">
                  {user.role}
                </p>
              </div>
            </div>
            <div className="mt-5 flex justify-center sm:mt-0">
              <a
                href="#"
                className="flex justify-center items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
              >
                Edit Settings
              </a>
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
