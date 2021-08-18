import { Menu, Transition } from '@headlessui/react';
import classnames from 'classnames';
import { signOut } from 'next-auth/client';
import Image from 'next/image';
import React, { Fragment } from 'react';

import ActiveLink from 'src/components/ActiveLink';
import { ACCOUNT_SETTINGS, ADMIN_LOGIN } from 'src/routes';

const AccountDropdown = (): React.ReactElement => (
  <Menu as="div" className="relative ml-3">
    {({ open }) => (
      <>
        <div>
          <Menu.Button className="flex items-center max-w-xs text-sm bg-white rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500">
            <span className="sr-only">Open user menu</span>
            <Image
              alt=""
              className="w-8 h-8 rounded-full"
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
            className="absolute right-0 w-48 mt-2 bg-white shadow-lg origin-top-right rounded-md ring-1 ring-black ring-opacity-5 divide-y divide-gray-200 focus:outline-none"
            static
          >
            <div className="py-1">
              <Menu.Item>
                {() => (
                  <ActiveLink href={ACCOUNT_SETTINGS.path}>
                    {({ isActive }) => (
                      <a
                        className={classnames('block px-4 py-2 text-sm', {
                          'bg-gray-100 text-gray-900': isActive,
                          'text-gray-700': !isActive,
                        })}
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
                    className={classnames('block px-4 py-2 text-sm', {
                      'bg-gray-100 text-gray-900': active,
                      'text-gray-700': !active,
                    })}
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
