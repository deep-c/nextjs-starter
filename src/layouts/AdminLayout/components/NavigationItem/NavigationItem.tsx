import classnames from 'classnames';
import React from 'react';

import ActiveLink from 'src/common/components/ActiveLink';
import { isRouteAuthorized } from 'src/modules/auth/utils';

import type { Route } from 'src/common/routes';
import type { Session } from 'src/modules/auth/components/Auth';

export interface NavigationItemProps {
  item: Route;
  session: Session;
}

const NavigationItem = ({
  item,
  session,
}: NavigationItemProps): React.ReactElement | null => {
  const { icon: Icon, name, path } = item;
  const isAllowed = isRouteAuthorized(item, session);
  if (!isAllowed) return null;
  return (
    <ActiveLink href={path} nested>
      {({ isActive }) => (
        <a
          aria-current={isActive ? 'page' : undefined}
          className={classnames(
            // eslint-disable-next-line max-len
            'group flex items-center px-2 py-2 text-base leading-5 font-medium rounded-md',
            {
              'bg-gray-100 text-gray-900': isActive,
              // eslint-disable-next-line max-len
              'text-gray-600 hover:text-gray-900 hover:bg-gray-50': !isActive,
            }
          )}
        >
          <Icon
            aria-hidden="true"
            className={classnames('mr-3 flex-shrink-0 h-6 w-6', {
              'text-gray-400 group-hover:text-gray-500': !isActive,
              'text-gray-500': isActive,
            })}
          />
          {name}
        </a>
      )}
    </ActiveLink>
  );
};

export default NavigationItem;
