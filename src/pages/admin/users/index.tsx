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

import type { GetUsersForAdmin } from 'types/graphql/GetUsersForAdmin';

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
            <div className="relative mt-1 rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <SearchIcon
                  aria-hidden="true"
                  className="w-5 h-5 text-gray-400"
                />
              </div>
              <input
                className="block w-full pl-10 border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
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
      <div className="flex flex-col mt-4">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <div className="overflow-hidden border-b border-gray-200 shadow sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                      scope="col"
                    >
                      Name
                    </th>
                    <th
                      className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                      scope="col"
                    >
                      Email
                    </th>
                    <th
                      className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                      scope="col"
                    >
                      Status
                    </th>
                    <th
                      className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
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
                          className="inline-block w-5 h-5 text-yellow-400"
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
                              <span className="inline-flex px-2 text-xs font-semibold text-green-800 capitalize bg-green-100 rounded-full leading-5">
                                {user.status.toLowerCase()}
                              </span>
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-500 capitalize whitespace-nowrap">
                              {user.role.toLowerCase()}
                            </td>
                            <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
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
        className="flex items-center justify-between py-3 bg-white border-t border-gray-200"
      >
        <div className="hidden sm:block">
          <p className="text-sm text-gray-700">
            Showing{' '}
            <span className="font-medium">{userNodes?.length ?? 0}</span>{' '}
            results
          </p>
        </div>
        <div className="flex justify-between flex-1 sm:justify-end">
          <button
            className="relative inline-flex items-center px-4 py-2 ml-3 text-sm font-medium text-gray-700 bg-white border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed rounded-md hover:bg-gray-50"
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
