import { useQuery } from '@apollo/client';
import { ExclamationIcon, SearchIcon } from '@heroicons/react/outline';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import UserAvatar from 'src/components/UserAvatar';
import type { GetSessionsForAdmin } from 'src/genTypes/apollo/GetSessionsForAdmin';
import { getSessionsForAdmin } from 'src/graphql/query/session';
import AdminLayout from 'src/layouts/admin';
import { ADMIN_SESSION, ADMIN_USERS, NextRoutePage } from 'src/routes';
import { classNames } from 'src/utils/ui';

export interface SessionsAdminProps {}
export interface SessionsAdminFilterForm {
  search: string;
}

export const SessionsAdmin: NextRoutePage<SessionsAdminProps> = () => {
  let { loading, data, fetchMore, refetch } = useQuery<GetSessionsForAdmin>(
    getSessionsForAdmin,
    { variables: { first: 10 } }
  );
  const { locale } = useRouter();
  const { register, handleSubmit } = useForm();
  const onFilterSubmit: SubmitHandler<SessionsAdminFilterForm> = async (
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
  const pageInfo = data?.sessions?.pageInfo;
  const sessionNodes = data?.sessions?.edges?.map((edge) => edge?.node);
  const today = new Date();

  return (
    <>
      <Head>
        <title>Manage Sessions | Admin</title>
        <meta
          name="viewport"
          content="initial-scale=1.0, width=device-width"
        />
        <meta name="description" content="User Dashboard" />
      </Head>
      <div className="pt-6 pb-6">
        <h1 className="text-3xl font-extrabold text-gray-900">
          Manage Sessions
        </h1>
      </div>
      <div className="flex flex-row-reverse">
        <form onSubmit={handleSubmit(onFilterSubmit)}>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Quick Search
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <SearchIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </div>
              <input
                type="text"
                id="search"
                className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                placeholder="Search name or email.."
                defaultValue=""
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
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      ID
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Expires
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Created On
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Updated On
                    </th>
                    <th scope="col" className="relative px-6 py-3">
                      <span className="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {(!sessionNodes || !sessionNodes.length) && !loading ? (
                    <tr key="empty">
                      <td className="px-6 py-4 whitespace-nowrap ">
                        <ExclamationIcon
                          className="h-5 w-5 text-yellow-400 inline-block"
                          aria-hidden="true"
                        />
                        <span className="pl-4">No sessions found</span>
                      </td>
                    </tr>
                  ) : (
                    sessionNodes &&
                    sessionNodes.map((session) => {
                      if (!session) return null;
                      const expiresAt = new Date(session.expires);
                      return (
                        <tr key={session.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-10 w-10">
                                <UserAvatar image={session.user.image} />
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">
                                  {session.id}
                                </div>
                                <div className="text-sm text-gray-500">
                                  {session.user.email}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span
                              className={classNames(
                                expiresAt > today
                                  ? 'bg-green-100 text-green-800'
                                  : 'bg-red-100 text-red-800',
                                'px-2 inline-flex text-xs leading-5 font-semibold rounded-full'
                              )}
                            >
                              {expiresAt.toLocaleDateString(locale)}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-500">
                              {new Date(session.createdAt).toLocaleDateString(
                                locale
                              )}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 capitalize">
                            <div className="text-sm text-gray-500">
                              {new Date(session.updatedAt).toLocaleDateString(
                                locale
                              )}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <Link
                              href={{
                                pathname: ADMIN_SESSION.path,
                                query: { id: session.id },
                              }}
                            >
                              <a className="text-indigo-600 hover:text-indigo-900">
                                Edit
                              </a>
                            </Link>
                          </td>
                        </tr>
                      );
                    })
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
            <span className="font-medium">{sessionNodes?.length ?? 0}</span>{' '}
            results
          </p>
        </div>
        <div className="flex-1 flex justify-between sm:justify-end">
          <button
            disabled={!pageInfo?.hasNextPage}
            onClick={() => {
              if (pageInfo?.hasNextPage) {
                fetchMore({
                  variables: {
                    cursor: pageInfo.endCursor,
                  },
                });
              }
            }}
            className="disabled:opacity-50 disabled:cursor-not-allowed ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
          >
            More
          </button>
        </div>
      </nav>
    </>
  );
};

SessionsAdmin.auth = ADMIN_USERS.auth;
SessionsAdmin.layout = AdminLayout;

export default SessionsAdmin;
