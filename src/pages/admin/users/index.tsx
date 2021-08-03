import { useQuery } from '@apollo/client';
import { ExclamationIcon, SearchIcon } from '@heroicons/react/outline';
import Head from 'next/head';
import Link from 'next/link';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import UserAvatar from 'src/components/UserAvatar';
import { getUsersForAdminQuery } from 'src/graphql/query/user';
import AdminLayout from 'src/layouts/AdminLayout';
import { ADMIN_USER, ADMIN_USERS, NextRoutePage } from 'src/routes';

import type { GetUsersForAdmin } from 'src/genTypes/apollo/GetUsersForAdmin';

export interface UsersAdminFilterForm {
  search: string;
}

export const UsersAdmin: NextRoutePage<unknown> = () => {
  // eslint-disable-next-line prefer-const
  let { data, fetchMore, loading, refetch } = useQuery<GetUsersForAdmin>(
    getUsersForAdminQuery,
    { variables: { first: 10 } }
  );
  const { handleSubmit, register } = useForm();
  const onFilterSubmit: SubmitHandler<UsersAdminFilterForm> = async (
    formFields
  ) => {
    const result = await refetch({
      first: 10,
      search: formFields.search,
    });
    loading = result.loading;
    data = result.data;
    return result;
  };
  const pageInfo = data?.users?.pageInfo;
  const userNodes = data?.users?.edges?.map((edge) => edge?.node);

  return (
    <>
      <Head>
        <title>Manage Users | Admin</title>
        <meta
          content="initial-scale=1.0, width=device-width"
          name="viewport"
        />
        <meta content="User Dashboard" name="description" />
      </Head>
      <div className="pt-6 pb-6">
        <h1 className="text-3xl font-extrabold text-gray-900">Manage Users</h1>
      </div>
      <div className="flex flex-row-reverse">
        <form onSubmit={handleSubmit(onFilterSubmit)}>
          <div>
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="email"
            >
              Quick Search
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <SearchIcon
                  aria-hidden="true"
                  className="h-5 w-5 text-gray-400"
                />
              </div>
              <input
                className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                defaultValue=""
                id="search"
                placeholder="Search name or email.."
                type="text"
                {...register('search', { maxLength: 50 })}
              />
            </div>
          </div>
        </form>
      </div>
      <div className="mt-4 flex flex-col">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      scope="col"
                    >
                      Name
                    </th>
                    <th
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      scope="col"
                    >
                      Email
                    </th>
                    <th
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      scope="col"
                    >
                      Status
                    </th>
                    <th
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      scope="col"
                    >
                      Role
                    </th>
                    <th className="relative px-6 py-3" scope="col">
                      <span className="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {(!userNodes || !userNodes.length) && !loading ? (
                    <tr key="empty">
                      <td className="px-6 py-4 whitespace-nowrap ">
                        <ExclamationIcon
                          aria-hidden="true"
                          className="h-5 w-5 text-yellow-400 inline-block"
                        />
                        <span className="pl-4">No users found</span>
                      </td>
                    </tr>
                  ) : (
                    userNodes &&
                    userNodes.map(
                      (user) =>
                        user && (
                          <tr key={user.id}>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <UserAvatar image={user.image} />
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
                              <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800 capitalize">
                                {user.status.toLowerCase()}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 capitalize">
                              {user.role.toLowerCase()}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                              <Link
                                href={{
                                  pathname: ADMIN_USER.path,
                                  query: { id: user.id },
                                }}
                              >
                                <a className="text-indigo-600 hover:text-indigo-900">
                                  Edit
                                </a>
                              </Link>
                            </td>
                          </tr>
                        )
                    )
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <nav
        aria-label="Pagination"
        className="bg-white py-3 flex items-center justify-between border-t border-gray-200"
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
            className="disabled:opacity-50 disabled:cursor-not-allowed ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            disabled={!pageInfo?.hasNextPage}
            onClick={() => {
              if (pageInfo?.hasNextPage) {
                // eslint-disable-next-line no-void
                void fetchMore({
                  variables: {
                    cursor: pageInfo.endCursor,
                  },
                });
              }
            }}
            type="button"
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
