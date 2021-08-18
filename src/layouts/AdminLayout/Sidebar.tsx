import { Dialog, Transition } from '@headlessui/react';
import { LogoutIcon, XIcon } from '@heroicons/react/outline';
import classnames from 'classnames';
import { signOut } from 'next-auth/client';
import Image from 'next/image';
import React, { Fragment, useCallback } from 'react';

import ActiveLink from 'src/components/ActiveLink';
import UserAvatar from 'src/components/UserAvatar';
import {
  ACCOUNT_SETTINGS,
  ADMIN_DASHBOARD,
  ADMIN_LOGIN,
  ADMIN_SESSIONS,
  ADMIN_USERS,
  filterRoutesForRole,
} from 'src/routes';

import type { Session } from 'src/components/Auth';

export interface SidebarProps {
  handleState: (state: boolean) => void;
  open: boolean;
  session: Session;
}

const navigation = [ADMIN_DASHBOARD, ADMIN_USERS, ADMIN_SESSIONS];

const userNavigation = [ACCOUNT_SETTINGS];

const Sidebar: React.FC<SidebarProps> = ({ handleState, open, session }) => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const filterRoutes = useCallback(filterRoutesForRole(session?.user), [
    session,
  ]);

  return (
    <>
      <Transition.Root as={Fragment} show={open}>
        <Dialog
          as="div"
          className="fixed inset-0 z-40 flex lg:hidden"
          onClose={handleState}
          open={open}
          static
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
            <div className="relative flex flex-col flex-1 w-full max-w-xs pt-5 pb-4 bg-white">
              <Transition.Child
                as={Fragment}
                enter="ease-in-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in-out duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="absolute top-0 right-0 pt-2 -mr-12">
                  <button
                    className="flex items-center justify-center w-10 h-10 ml-1 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                    onClick={() => handleState(false)}
                    type="button"
                  >
                    <span className="sr-only">Close sidebar</span>
                    <XIcon aria-hidden="true" className="w-6 h-6 text-white" />
                  </button>
                </div>
              </Transition.Child>
              <div className="flex items-center flex-shrink-0 px-4">
                <Image
                  alt="Workflow"
                  className="w-auto h-8"
                  height={50}
                  src="https://tailwindui.com/img/logos/workflow-logo-purple-500-mark-gray-700-text.svg"
                  width={200}
                />
              </div>
              <div className="flex-1 h-0 mt-5 overflow-y-auto">
                <nav className="px-2">
                  <div className="space-y-1">
                    {navigation.filter(filterRoutes).map((item) => (
                      <ActiveLink key={item.path} href={item.path} nested>
                        {({ isActive }) => (
                          <a
                            aria-current={isActive ? 'page' : undefined}
                            className={classnames(
                              // eslint-disable-next-line max-len
                              'group flex items-center px-2 py-2 text-base leading-5 font-medium rounded-md',
                              {
                                'bg-gray-100 text-gray-900': isActive,
                                // eslint-disable-next-line max-len
                                'text-gray-600 hover:text-gray-900 hover:bg-gray-50':
                                  !isActive,
                              }
                            )}
                          >
                            <item.icon
                              aria-hidden="true"
                              className={classnames(
                                'mr-3 flex-shrink-0 h-6 w-6',
                                {
                                  'text-gray-400 group-hover:text-gray-500':
                                    !isActive,
                                  'text-gray-500': isActive,
                                }
                              )}
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
          <div aria-hidden="true" className="flex-shrink-0 w-14">
            {/* Dummy element to force sidebar to shrink to fit close icon */}
          </div>
        </Dialog>
      </Transition.Root>
      {/* Static sidebar for desktop */}
      <div className="hidden lg:flex lg:flex-shrink-0">
        <div className="flex flex-col w-64 pt-5 pb-4 bg-gray-100 border-r border-gray-200">
          <div className="flex items-center flex-shrink-0 px-6">
            <Image
              alt="Workflow"
              className="w-auto h-8"
              height={50}
              src="https://tailwindui.com/img/logos/workflow-logo-purple-500-mark-gray-700-text.svg"
              width={200}
            />
          </div>
          <div className="flex flex-col flex-1 h-0 overflow-y-auto">
            {/* Navigation */}
            <nav className="flex-1 px-3 mt-6 divide-y">
              <div className="space-y-1">
                {navigation.filter(filterRoutes).map((item) => (
                  <ActiveLink key={item.path} href={item.path} nested>
                    {({ isActive }) => (
                      <a
                        aria-current={isActive ? 'page' : undefined}
                        className={classnames(
                          // eslint-disable-next-line max-len
                          'group flex items-center px-2 py-2 text-sm font-medium rounded-md',
                          {
                            'bg-gray-200 text-gray-900': isActive,
                            // eslint-disable-next-line max-len
                            'text-gray-700 hover:text-gray-900 hover:bg-gray-50':
                              !isActive,
                          }
                        )}
                      >
                        <item.icon
                          aria-hidden="true"
                          className={classnames('mr-3 flex-shrink-0 h-6 w-6', {
                            'text-gray-400 group-hover:text-gray-500':
                              !isActive,
                            'text-gray-500': isActive,
                          })}
                        />
                        {item.name}
                      </a>
                    )}
                  </ActiveLink>
                ))}
              </div>
            </nav>
            <div className="w-full py-2 text-sm font-medium text-left text-gray-700 bg-gray-100 group rounded-md px-3.5">
              <span className="flex items-center justify-between w-full">
                {session?.user && (
                  <UserAvatar
                    image={session.user.image}
                    name={session.user.name}
                  />
                )}
              </span>
            </div>
            {/* User Navigation */}
            <div className="px-3 mt-2">
              {userNavigation.map((item) => (
                <ActiveLink key={item.path} href={item.path} nested>
                  {({ isActive }) => (
                    <a
                      aria-current={isActive ? 'page' : undefined}
                      className={classnames(
                        // eslint-disable-next-line max-len
                        'group flex items-center px-2 py-2 text-sm font-medium rounded-md',
                        {
                          'bg-gray-200 text-gray-900': isActive,
                          'text-gray-700 hover:text-gray-900 hover:bg-gray-50':
                            !isActive,
                        }
                      )}
                    >
                      <item.icon
                        aria-hidden="true"
                        className={classnames('mr-3 flex-shrink-0 h-6 w-6', {
                          'text-gray-400 group-hover:text-gray-500': !isActive,
                          'text-gray-500': isActive,
                        })}
                      />
                      {item.name}
                    </a>
                  )}
                </ActiveLink>
              ))}
              <button
                className="flex items-center w-full px-2 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-md"
                onClick={() =>
                  signOut({
                    callbackUrl:
                      process.env.NEXT_PUBLIC_HOST + ADMIN_LOGIN.path,
                  })
                }
                type="button"
              >
                <LogoutIcon
                  aria-hidden="true"
                  className="flex-shrink-0 w-6 h-6 mr-3 text-gray-400 group-hover:text-gray-500"
                />
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
