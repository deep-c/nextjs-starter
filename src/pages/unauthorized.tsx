import { BanIcon } from '@heroicons/react/solid';
import React from 'react';

import AdminLayout from 'src/layouts/AdminLayout';
import { NextRoutePage, UNAUTHORIZED } from 'src/routes';

const UnAuthorized: NextRoutePage<unknown> = () => (
  <div className="p-4 mx-auto mt-6 rounded-md bg-red-50">
    <div className="flex">
      <div className="flex-shrink-0">
        <BanIcon aria-hidden="true" className="w-5 h-5 text-red-400" />
      </div>
      <div className="ml-3">
        <h3 className="text-sm font-medium text-red-800">
          UNAUTHORIZED - You do not have permission to view the page.
        </h3>
      </div>
    </div>
  </div>
);

UnAuthorized.auth = UNAUTHORIZED.auth;
UnAuthorized.layout = AdminLayout;

export default UnAuthorized;
