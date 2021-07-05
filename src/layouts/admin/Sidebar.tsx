import React, { Fragment } from 'react';
import Image from 'next/image';
import { useQuery } from '@apollo/client';
import { Dialog, Transition } from '@headlessui/react';
import { XIcon } from '@heroicons/react/outline';
import { classNames } from '@/utils/ui';
import ActiveLink from '@/components/ActiveLink';
import { me } from '@/graphql/query/user';
import {
  ADMIN_DASHBOARD,
  ADMIN_USERS,
  ADMIN_SESSIONS,
  ACCOUNT_SETTINGS,
} from '@/routes';

export interface SidebarProps {
  open: boolean;
  handleState: (state: boolean) => void;
}

const navigation = [ADMIN_DASHBOARD, ADMIN_USERS, ADMIN_SESSIONS];

const userNavigation = [ACCOUNT_SETTINGS];

const Sidebar: React.FC<SidebarProps> = ({ open, handleState }) => {
  const { loading: meLoading, error, data } = useQuery(me);

  if (meLoading) return null;

  return (
    <>
      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as="div"
          static
          className="fixed inset-0 flex z-40 lg:hidden"
          open={open}
          onClose={handleState}
        >
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-600 bg-opacity-75" />
          </Transition.Child>
          <Transition.Child
            as={Fragment}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
          >
            <div className="relative flex-1 flex flex-col max-w-xs w-full pt-5 pb-4 bg-white">
              <Transition.Child
                as={Fragment}
                enter="ease-in-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in-out duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="absolute top-0 right-0 -mr-12 pt-2">
                  <button
                    className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                    onClick={() => handleState(false)}
                  >
                    <span className="sr-only">Close sidebar</span>
                    <XIcon className="h-6 w-6 text-white" aria-hidden="true" />
                  </button>
                </div>
              </Transition.Child>
              <div className="flex-shrink-0 flex items-center px-4">
                <Image
                  className="h-8 w-auto"
                  src="https://tailwindui.com/img/logos/workflow-logo-purple-500-mark-gray-700-text.svg"
                  alt="Workflow"
                  width={200}
                  height={50}
                />
              </div>
              <div className="mt-5 flex-1 h-0 overflow-y-auto">
                <nav className="px-2">
                  <div className="space-y-1">
                    {navigation.map((item) => (
                      <ActiveLink key={item.path} href={item.path}>
                        {({ isActive }) => (
                          <a
                            className={classNames(
                              isActive
                                ? 'bg-gray-100 text-gray-900'
                                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50',
                              'group flex items-center px-2 py-2 text-base leading-5 font-medium rounded-md'
                            )}
                            aria-current={isActive ? 'page' : undefined}
                          >
                            <item.icon
                              className={classNames(
                                isActive
                                  ? 'text-gray-500'
                                  : 'text-gray-400 group-hover:text-gray-500',
                                'mr-3 flex-shrink-0 h-6 w-6'
                              )}
                              aria-hidden="true"
                            />
                            {item.name}
                          </a>
                        )}
                      </ActiveLink>
                    ))}
                  </div>
                </nav>
              </div>
            </div>
          </Transition.Child>
          <div className="flex-shrink-0 w-14" aria-hidden="true">
            {/* Dummy element to force sidebar to shrink to fit close icon */}
          </div>
        </Dialog>
      </Transition.Root>
      {/* Static sidebar for desktop */}
      <div className="hidden lg:flex lg:flex-shrink-0">
        <div className="flex flex-col w-64 border-r border-gray-200 pt-5 pb-4 bg-gray-100">
          <div className="flex items-center flex-shrink-0 px-6">
            <Image
              className="h-8 w-auto"
              src="https://tailwindui.com/img/logos/workflow-logo-purple-500-mark-gray-700-text.svg"
              alt="Workflow"
              width={200}
              height={50}
            />
          </div>
          <div className="h-0 flex-1 flex flex-col overflow-y-auto">
            {/* Navigation */}
            <nav className="flex-1 px-3 divide-y mt-6">
              <div className="space-y-1">
                {navigation.map((item) => (
                  <ActiveLink key={item.path} href={item.path}>
                    {({ isActive }) => (
                      <a
                        className={classNames(
                          isActive
                            ? 'bg-gray-200 text-gray-900'
                            : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50',
                          'group flex items-center px-2 py-2 text-sm font-medium rounded-md'
                        )}
                        aria-current={isActive ? 'page' : undefined}
                      >
                        <item.icon
                          className={classNames(
                            isActive
                              ? 'text-gray-500'
                              : 'text-gray-400 group-hover:text-gray-500',
                            'mr-3 flex-shrink-0 h-6 w-6'
                          )}
                          aria-hidden="true"
                        />
                        {item.name}
                      </a>
                    )}
                  </ActiveLink>
                ))}
              </div>
            </nav>
            <div className="group w-full bg-gray-100 rounded-md px-3.5 py-2 text-sm text-left font-medium text-gray-700">
              <span className="flex w-full justify-between items-center">
                <span className="flex min-w-0 items-center justify-between space-x-3">
                  {data.me.image ? (
                    <Image
                      className="w-10 h-10 bg-gray-300 rounded-full flex-shrink-0"
                      src={data.me.image}
                      alt=""
                      width={50}
                      height={50}
                    />
                  ) : (
                    <span className="h-14 w-14 rounded-full overflow-hidden bg-gray-100">
                      <svg
                        className="h-full w-full text-gray-300"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                      </svg>
                    </span>
                  )}
                  <span className="flex-1 flex flex-col min-w-0">
                    <span className="text-gray-900 text-sm font-medium truncate">
                      {data.me.name}
                    </span>
                  </span>
                </span>
              </span>
            </div>
            {/* User Navigation */}
            <div className="px-3 divide-y mt-2">
              {userNavigation.map((item) => (
                <ActiveLink key={item.path} href={item.path}>
                  {({ isActive }) => (
                    <a
                      className={classNames(
                        isActive
                          ? 'bg-gray-200 text-gray-900'
                          : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50',
                        'group flex items-center px-2 py-2 text-sm font-medium rounded-md'
                      )}
                      aria-current={isActive ? 'page' : undefined}
                    >
                      <item.icon
                        className={classNames(
                          isActive
                            ? 'text-gray-500'
                            : 'text-gray-400 group-hover:text-gray-500',
                          'mr-3 flex-shrink-0 h-6 w-6'
                        )}
                        aria-hidden="true"
                      />
                      {item.name}
                    </a>
                  )}
                </ActiveLink>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
