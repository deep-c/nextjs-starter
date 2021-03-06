import { signIn } from 'next-auth/client';
import Image from 'next/image';
import React from 'react';

import { ADMIN_DASHBOARD, ADMIN_LOGIN } from 'src/common/routes';

export const AdminLogin = (): React.ReactElement => (
  <div className="flex min-h-screen bg-white">
    <div className="flex flex-col justify-center flex-1 px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
      <div className="w-full max-w-sm mx-auto lg:w-96">
        <div>
          <Image
            alt="Workflow"
            className="w-auto h-12"
            height={100}
            src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
            width={100}
          />
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Admin Dashboard
          </h2>
        </div>

        <div className="mt-8">
          <div>
            <div>
              <p className="text-sm font-medium text-gray-700">Sign in with</p>

              <div className="mt-1 grid grid-cols-3 gap-3">
                <div>
                  <button
                    className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50"
                    onClick={() =>
                      signIn('cognito', {
                        callbackUrl:
                          process.env.NEXT_PUBLIC_HOST + ADMIN_DASHBOARD.path,
                      })
                    }
                    type="button"
                  >
                    <span className="sr-only">Sign in with Google</span>
                    <svg
                      fill="#000000"
                      height="30px"
                      viewBox="0 0 50 50"
                      width="30px"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M 26 2 C 13.308594 2 3 12.308594 3 25 C 3 37.691406 13.308594 48 26 48 C 35.917969 48 41.972656 43.4375 45.125 37.78125 C 48.277344 32.125 48.675781 25.480469 47.71875 20.9375 L 47.53125 20.15625 L 46.75 20.15625 L 26 20.125 L 25 20.125 L 25 30.53125 L 36.4375 30.53125 C 34.710938 34.53125 31.195313 37.28125 26 37.28125 C 19.210938 37.28125 13.71875 31.789063 13.71875 25 C 13.71875 18.210938 19.210938 12.71875 26 12.71875 C 29.050781 12.71875 31.820313 13.847656 33.96875 15.6875 L 34.6875 16.28125 L 41.53125 9.4375 L 42.25 8.6875 L 41.5 8 C 37.414063 4.277344 31.960938 2 26 2 Z M 26 4 C 31.074219 4 35.652344 5.855469 39.28125 8.84375 L 34.46875 13.65625 C 32.089844 11.878906 29.199219 10.71875 26 10.71875 C 18.128906 10.71875 11.71875 17.128906 11.71875 25 C 11.71875 32.871094 18.128906 39.28125 26 39.28125 C 32.550781 39.28125 37.261719 35.265625 38.9375 29.8125 L 39.34375 28.53125 L 27 28.53125 L 27 22.125 L 45.84375 22.15625 C 46.507813 26.191406 46.066406 31.984375 43.375 36.8125 C 40.515625 41.9375 35.320313 46 26 46 C 14.386719 46 5 36.609375 5 25 C 5 13.390625 14.386719 4 26 4 Z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="relative flex-1 hidden w-0 lg:block">
      <Image
        alt=""
        className="absolute inset-0 object-cover w-full h-full"
        layout="fill"
        src="https://images.unsplash.com/photo-1505904267569-f02eaeb45a4c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1908&q=80"
      />
    </div>
  </div>
);

AdminLogin.auth = ADMIN_LOGIN.auth;

export default AdminLogin;
