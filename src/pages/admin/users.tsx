import React from 'react';
import Head from 'next/head';
import { useQuery } from '@apollo/client';
import { ADMIN_USERS, NextRoutePage } from '@/routes';
import AdminLayout from '@/layouts/admin';
import { getUsersForAdmin } from '@/graphql/query/user';
import type { GetUsersForAdmin } from '@/types/__generated__/apollo/GetUsersForAdmin';
import Avatar from '@/components/user/Avatar';

export interface UsersAdminProps {}

export const UsersAdmin: NextRoutePage<UsersAdminProps> = () => {
  const { loading, data, fetchMore } =
    useQuery<GetUsersForAdmin>(getUsersForAdmin);
  const pageInfo = data?.users?.pageInfo;
  const userNodes = data?.users?.edges?.map((edge) => edge?.node);

  return (
    <>
      <Head>
        <title>Users | Admin</title>
        <meta
          name="viewport"
          content="initial-scale=1.0, width=device-width"
        />
        <meta name="description" content="User Dashboard" />
      </Head>
      <div className="pt-6 pb-6">
        <h1 className="text-3xl font-extrabold text-gray-900">Users</h1>
      </div>
      <div className="mt-4 flex flex-col">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Email
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Status
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Role
                    </th>
                    <th scope="col" className="relative px-6 py-3">
                      <span className="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {userNodes &&
                    userNodes.map(
                      (user) =>
                        user && (
                          <tr key={user.id}>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <Avatar image={user.image} />
                                <div className="ml-4">
                                  <div className="text-sm font-medium text-gray-900">
                                    {user.name}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-500">
                                {user.email}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                Active
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {user.role}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                              <a
                                href="#"
                                className="text-indigo-600 hover:text-indigo-900"
                              >
                                Edit
                              </a>
                            </td>
                          </tr>
                        )
                    )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <nav
        className="bg-white py-3 flex items-center justify-between border-t border-gray-200"
        aria-label="Pagination"
      >
        <div className="hidden sm:block">
          <p className="text-sm text-gray-700">
            Showing{' '}
            <span className="font-medium">{userNodes?.length ?? 0}</span>{' '}
            results
          </p>
        </div>
        <div className="flex-1 flex justify-between sm:justify-end">
          <button
            disabled={!pageInfo?.hasNextPage}
            onClick={() => {
              // @ts-ignore
              if (pageInfo?.hasNextPage) {
                fetchMore({
                  variables: {
                    // @ts-ignore
                    cursor: pageInfo.endCursor,
                  },
                });
              }
            }}
            className="disabled:opacity-50 disabled:cursor-text ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
          >
            More
          </button>
        </div>
      </nav>
    </>
  );
};

UsersAdmin.auth = ADMIN_USERS.auth;
UsersAdmin.layout = AdminLayout;

export default UsersAdmin;
