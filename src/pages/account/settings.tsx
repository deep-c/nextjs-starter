import Head from 'next/head';
import React from 'react';

import UserSettingsForm from 'src/components/UserGeneralSettingsForm';
import AdminLayout from 'src/layouts/AdminLayout';
import { ACCOUNT_SETTINGS, NextRoutePage } from 'src/routes';

export const AccountSettings: NextRoutePage<unknown> = () => (
  <>
    <Head>
      <title>Account Settings | Admin</title>
      <meta content="initial-scale=1.0, width=device-width" name="viewport" />
      <meta content="User account settings" name="description" />
    </Head>
    <div className="pt-6 pb-6">
      <h1 className="text-3xl font-extrabold text-gray-900">Settings</h1>
    </div>
    <div className="pb-6">
      <div className="sm:hidden">
        <label className="sr-only" htmlFor="tabs">
          Select a tab
        </label>
        <select
          className="block w-full py-2 pl-3 pr-10 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          defaultValue="general"
          id="tabs"
          name="tabs"
        >
          <option key="general">General</option>
        </select>
      </div>
      <div className="hidden sm:block">
        <div className="border-b border-gray-200">
          <nav aria-label="Tabs" className="flex -mb-px space-x-8">
            <button
              key="general"
              aria-current="page"
              className="px-1 py-4 text-sm font-medium text-indigo-600 border-b-2 border-indigo-500 whitespace-nowrap"
              type="button"
            >
              General
            </button>
          </nav>
        </div>
      </div>
    </div>
    <UserSettingsForm />
  </>
);

AccountSettings.auth = ACCOUNT_SETTINGS.auth;
AccountSettings.layout = AdminLayout;

export default AccountSettings;
