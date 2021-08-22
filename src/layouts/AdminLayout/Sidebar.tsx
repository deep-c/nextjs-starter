import { Dialog, Transition } from '@headlessui/react';
import { LogoutIcon, XIcon } from '@heroicons/react/outline';
import { signOut } from 'next-auth/client';
import Image from 'next/image';
import React, { Fragment } from 'react';

import {
  ACCOUNT_SETTINGS,
  ADMIN_DASHBOARD,
  ADMIN_LOGIN,
  ADMIN_SESSIONS,
  ADMIN_USERS,
} from 'src/common/routes';
import UserAvatar from 'src/modules/user/components/UserAvatar';

import NavigationItem from './components/NavigationItem';

import type { Session } from 'src/modules/session/types';

export interface SidebarProps {
  handleState: (state: boolean) => void;
  open: boolean;
  session: Session;
}

const Sidebar = ({
  handleState,
  open,
  session,
}: SidebarProps): React.ReactElement => (
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
                  <NavigationItem item={ADMIN_DASHBOARD} session={session} />
                  <NavigationItem item={ADMIN_USERS} session={session} />
                  <NavigationItem item={ADMIN_SESSIONS} session={session} />
                </div>
              </nav>
            </div>
          </div>
        </Transition.Child>
        <div aria-hidden="true" className="flex-shrink-0 w-14" />
      </Dialog>
    </Transition.Root>
    <div className="hidden w-64 lg:flex lg:flex-shrink-0">
      <div className="flex flex-col pt-5 pb-4 bg-gray-100 border-r border-gray-200">
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
          <nav className="flex-1 px-3 mt-6 divide-y">
            <div className="space-y-1">
              <NavigationItem item={ADMIN_DASHBOARD} session={session} />
              <NavigationItem item={ADMIN_USERS} session={session} />
              <NavigationItem item={ADMIN_SESSIONS} session={session} />
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
          <div className="px-3 mt-2">
            <NavigationItem item={ACCOUNT_SETTINGS} session={session} />
            <button
              className="flex items-center w-full px-2 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-md"
              onClick={() =>
                signOut({
                  callbackUrl: process.env.NEXT_PUBLIC_HOST + ADMIN_LOGIN.path,
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

export default Sidebar;
