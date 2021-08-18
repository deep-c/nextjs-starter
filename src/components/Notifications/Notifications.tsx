import { Transition } from '@headlessui/react';
import {
  CheckCircleIcon,
  ExclamationCircleIcon,
  ExclamationIcon,
  InformationCircleIcon,
  XIcon,
} from '@heroicons/react/outline';
import React, { Fragment } from 'react';
import toast, { Toast, ToastOptions } from 'react-hot-toast';

export enum SimpleNotificationState {
  ERROR,
  SUCCESS,
  WARN,
  INFO,
}

export interface SimpleNotificationProps extends Toast {
  content: string;
  state: SimpleNotificationState;
}

const SimpleNotification = ({
  content,
  icon,
  id,
  state,
  visible,
}: SimpleNotificationProps) => (
  <>
    <Transition
      as={Fragment}
      enter="transform ease-out duration-300 transition"
      enterFrom="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
      enterTo="translate-y-0 opacity-100 sm:translate-x-0"
      leave="transition ease-in duration-100"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
      show={visible}
    >
      <div className="w-full max-w-sm overflow-hidden bg-white rounded-lg shadow-lg pointer-events-auto ring-1 ring-black ring-opacity-5">
        <div className="p-4">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              {icon}
              {!icon && state === SimpleNotificationState.SUCCESS && (
                <CheckCircleIcon
                  aria-hidden="true"
                  className="w-6 h-6 text-green-400"
                />
              )}
              {!icon && state === SimpleNotificationState.WARN && (
                <ExclamationIcon
                  aria-hidden="true"
                  className="w-6 h-6 text-yellow-400"
                />
              )}
              {!icon && state === SimpleNotificationState.ERROR && (
                <ExclamationCircleIcon
                  aria-hidden="true"
                  className="w-6 h-6 text-red-400"
                />
              )}
              {!icon && state === SimpleNotificationState.INFO && (
                <InformationCircleIcon
                  aria-hidden="true"
                  className="w-6 h-6 text-blue-400"
                />
              )}
            </div>
            <div className="flex-1 w-0 ml-3 pt-0.5">
              <p className="text-sm font-medium text-gray-900">{content}</p>
            </div>
            <div className="flex flex-shrink-0 ml-4">
              <button
                className="inline-flex text-gray-400 bg-white rounded-md hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                onClick={() => toast.dismiss(id)}
                type="button"
              >
                <span className="sr-only">Close</span>
                <XIcon aria-hidden="true" className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </>
);

const makeSimpleNotification = (
  content: string,
  state: SimpleNotificationState,
  options?: ToastOptions
): string =>
  toast.custom(
    (t) => <SimpleNotification content={content} state={state} {...t} />,
    options
  );

export default makeSimpleNotification;
