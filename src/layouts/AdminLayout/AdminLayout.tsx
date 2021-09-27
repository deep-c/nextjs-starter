import { MenuAlt1Icon } from '@heroicons/react/outline';
import { SearchIcon } from '@heroicons/react/solid';
import React, { useState } from 'react';

import UserProfileDropdown from 'src/modules/user/components/UserProfileDropdown';

import Sidebar from './components/Sidebar';

import type { AuthChildProps } from 'src/modules/auth/components/Auth';
import type { GetLayoutFn } from 'src/pages/_app';

export interface AdminlayoutProps extends AuthChildProps {
  children: React.ReactChild;
}

export const AdminLayout = ({
  children,
  session,
}: AdminlayoutProps): React.ReactElement => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <div className="flex h-screen overflow-hidden bg-white">
      <Sidebar
        handleState={setSidebarOpen}
        open={sidebarOpen}
        session={session}
      />
      {/* Main column */}
      <div className="flex flex-col flex-1 w-0 overflow-hidden">
        {/* Search header */}
        <div className="relative z-10 flex flex-shrink-0 h-16 bg-white border-b border-gray-200 lg:hidden">
          <button
            className="px-4 text-gray-500 border-r border-gray-200 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-purple-500 lg:hidden"
            onClick={() => setSidebarOpen(true)}
            type="button"
          >
            <span className="sr-only">Open sidebar</span>
            <MenuAlt1Icon aria-hidden="true" className="w-6 h-6" />
          </button>
          <div className="flex justify-between flex-1 px-4 sm:px-6 lg:px-8">
            <div className="flex flex-1">
              <form action="#" className="flex w-full md:ml-0" method="GET">
                <label className="sr-only" htmlFor="search_field">
                  Search
                </label>
                <div className="relative w-full text-gray-400 focus-within:text-gray-600">
                  <div className="absolute inset-y-0 left-0 flex items-center pointer-events-none">
                    <SearchIcon aria-hidden="true" className="w-5 h-5" />
                  </div>
                  <input
                    className="block w-full h-full py-2 pl-8 pr-3 text-gray-900 placeholder-gray-500 border-transparent focus:outline-none focus:ring-0 focus:border-transparent focus:placeholder-gray-400 sm:text-sm"
                    id="search_field"
                    name="search_field"
                    placeholder="Search"
                    type="search"
                  />
                </div>
              </form>
            </div>
            <div className="flex items-center">
              <UserProfileDropdown />
            </div>
          </div>
        </div>
        <main className="flex-1 overflow-y-auto focus:outline-none">
          <div className="relative max-w-4xl mx-12 md:px-8 xl:px-0">
            <>{children}</>
          </div>
        </main>
      </div>
    </div>
  );
};

export const getLayout: GetLayoutFn = (page) => (
  // Layout components are wrapped by Auth in  _app.tsx,
  // Auth clones it and injects props. Not sure if its even
  // possible to type this so ignore for now.
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  <AdminLayout>{page}</AdminLayout>
);

export default AdminLayout;
