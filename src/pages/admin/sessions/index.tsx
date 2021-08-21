import { useMutation, useQuery } from '@apollo/client';
import { ExclamationIcon, SearchIcon } from '@heroicons/react/outline';
import classnames from 'classnames';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import makeSimpleNotification, {
  SimpleNotificationState,
} from 'src/common/components/Notifications';
import { ADMIN_USERS } from 'src/common/routes';
import { getLayout } from 'src/layouts/AdminLayout';
import removeSessionMutation from 'src/modules/session/graphql/mutation/RemoveSession';
import getSessionsForAdminQuery from 'src/modules/session/graphql/query/GetSessionsForAdmin';
import UserAvatar from 'src/modules/user/components/UserAvatar';

import type { GetSessionsForAdmin } from 'types/graphql/GetSessionsForAdmin';
import type { RemoveSession } from 'types/graphql/RemoveSession';

export interface SessionsAdminFilterForm {
  search: string;
}

export const SessionsAdmin = (): React.ReactElement => {
  // eslint-disable-next-line prefer-const
  let { data, fetchMore, loading, refetch } = useQuery<GetSessionsForAdmin>(
    getSessionsForAdminQuery,
    { variables: { first: 10 } }
  );
  const [removeSession] = useMutation<RemoveSession>(removeSessionMutation, {
    update: (cache, { data: _data }) => {
      const normalizedId = cache.identify({
        // eslint-disable-next-line no-underscore-dangle
        __typename: _data?.removeSession?.__typename,
        id: _data?.removeSession?.id,
      });
      cache.evict({ id: normalizedId });
      cache.gc();
    },
  });
  const { locale } = useRouter();
  const { handleSubmit, register } = useForm();
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
          content="initial-scale=1.0, width=device-width"
          name="viewport"
        />
        <meta content="User Dashboard" name="description" />
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
                      ID
                    </th>
                    <th
                      className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                      scope="col"
                    >
                      Expires
                    </th>
                    <th
                      className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                      scope="col"
                    >
                      Created On
                    </th>
                    <th
                      className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                      scope="col"
                    >
                      Updated On
                    </th>
                    <th className="relative px-6 py-3" scope="col">
                      <span className="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {(!sessionNodes || !sessionNodes.length) && !loading ? (
                    <tr key="empty">
                      <td className="px-6 py-4 whitespace-nowrap ">
                        <ExclamationIcon
                          aria-hidden="true"
                          className="inline-block w-5 h-5 text-yellow-400"
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
                              <div className="flex-shrink-0 w-10 h-10">
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
                              className={classnames(
                                // eslint-disable-next-line max-len
                                'px-2 inline-flex text-xs leading-5 font-semibold rounded-full',
                                {
                                  'bg-green-100 text-green-800':
                                    expiresAt > today,
                                  'bg-red-100 text-red-800':
                                    expiresAt <= today,
                                }
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
                          <td className="px-6 py-4 text-sm text-gray-500 capitalize whitespace-nowrap">
                            <div className="text-sm text-gray-500">
                              {new Date(session.updatedAt).toLocaleDateString(
                                locale
                              )}
                            </div>
                          </td>
                          <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                            <button
                              className="text-red-600 cursor-pointer hover:text-red-900"
                              onClick={async () => {
                                try {
                                  await removeSession({
                                    variables: {
                                      id: session.id,
                                    },
                                  });
                                  makeSimpleNotification(
                                    `Session ${session.id} removed.`,
                                    SimpleNotificationState.SUCCESS
                                  );
                                } catch (e) {
                                  makeSimpleNotification(
                                    `Unable remove session ${session.id}.`,
                                    SimpleNotificationState.ERROR
                                  );
                                }
                              }}
                              type="button"
                            >
                              Remove
                            </button>
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
        aria-label="Pagination"
        className="flex items-center justify-between py-3 bg-white border-t border-gray-200"
      >
        <div className="hidden sm:block">
          <p className="text-sm text-gray-700">
            Showing{' '}
            <span className="font-medium">{sessionNodes?.length ?? 0}</span>{' '}
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

SessionsAdmin.auth = ADMIN_USERS.auth;
SessionsAdmin.getLayout = getLayout;

export default SessionsAdmin;
