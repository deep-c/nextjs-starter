import { Menu, Transition } from '@headlessui/react';
import { signOut } from 'next-auth/client';
import Image from 'next/image';
import React, { Fragment } from 'react';

import ActiveLink from 'src/components/ActiveLink';
import { ACCOUNT_SETTINGS, ADMIN_LOGIN } from 'src/routes';
import { classNames } from 'src/utils/ui';

const AccountDropdown: React.FC = () => (
  <Menu as="div" className="ml-3 relative">
    {({ open }) => (
      <>
        <div>
          <Menu.Button className="max-w-xs bg-white flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500">
            <span className="sr-only">Open user menu</span>
            <Image
              alt=""
              className="h-8 w-8 rounded-full"
              height={50}
              src="https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              width={50}
            />
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
          show={open}
        >
          <Menu.Items
            className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-200 focus:outline-none"
            static
          >
            <div className="py-1">
              <Menu.Item>
                {() => (
                  <ActiveLink href={ACCOUNT_SETTINGS.path}>
                    {({ isActive }) => (
                      <a
                        className={classNames(
                          isActive
                            ? 'bg-gray-100 text-gray-900'
                            : 'text-gray-700',
                          'block px-4 py-2 text-sm'
                        )}
                      >
                        Settings
                      </a>
                    )}
                  </ActiveLink>
                )}
              </Menu.Item>
            </div>
            <div className="py-1">
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={classNames(
                      active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                      'block px-4 py-2 text-sm'
                    )}
                    onClick={() =>
                      signOut({
                        callbackUrl:
                          process.env.NEXT_PUBLIC_HOST + ADMIN_LOGIN.path,
                      })
                    }
                    type="button"
                  >
                    Logout
                  </button>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </>
    )}
  </Menu>
);

export default AccountDropdown;
