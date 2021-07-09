import React from 'react';
import { BanIcon } from '@heroicons/react/solid';
import { UNAUTHORIZED, NextRoutePage } from '@/routes';
import AdminLayout from '@/layouts/admin';

const UnAuthorized: NextRoutePage<{}> = () => {
  return (
    <div className="rounded-md bg-red-50 p-4 mx-auto mt-6">
      <div className="flex">
        <div className="flex-shrink-0">
          <BanIcon className="h-5 w-5 text-red-400" aria-hidden="true" />
        </div>
        <div className="ml-3">
          <h3 className="text-sm font-medium text-red-800">
            UNAUTHORIZED - You do not have permission to view the page.
          </h3>
        </div>
      </div>
    </div>
  );
};

UnAuthorized.auth = UNAUTHORIZED.auth;
UnAuthorized.layout = AdminLayout;

export default UnAuthorized;
