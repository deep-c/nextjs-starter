import React from 'react';
import Head from 'next/head';
import { ACCOUNT_SETTINGS, NextRoutePage } from '@/routes';
import AdminLayout from '@/layouts/admin';
import UserSettingsForm from '@/components/UserGeneralSettingsForm';
import { classNames } from '@/utils/ui';

export interface AccountSettingsProps {}

export const AccountSettings: NextRoutePage<AccountSettingsProps> = () => {
  return (
    <>
      <Head>
        <title>Account Settings | Admin</title>
        <meta
          name="viewport"
          content="initial-scale=1.0, width=device-width"
        />
        <meta name="description" content="User account settings" />
      </Head>
      <div className="pt-6 pb-6">
        <h1 className="text-3xl font-extrabold text-gray-900">Settings</h1>
      </div>
      <div className="pb-6">
        <div className="sm:hidden">
          <label htmlFor="tabs" className="sr-only">
            Select a tab
          </label>
          <select
            id="tabs"
            name="tabs"
            className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            defaultValue="general"
          >
            <option key="general">General</option>
          </select>
        </div>
        <div className="hidden sm:block">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8" aria-label="Tabs">
              <button
                key="general"
                className={classNames(
                  true
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
                  'whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm'
                )}
                aria-current="page"
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
};

AccountSettings.auth = ACCOUNT_SETTINGS.auth;
AccountSettings.layout = AdminLayout;

export default AccountSettings;
