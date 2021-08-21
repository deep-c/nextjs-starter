import {
  BanIcon,
  CogIcon,
  LinkIcon,
  LockClosedIcon,
  LoginIcon,
  MapIcon,
  UserGroupIcon,
  UserIcon,
} from '@heroicons/react/outline';
import { Role } from '@prisma/client';

import { isAuthorized } from 'src/modules/auth/utils';

import type { ReactNode } from 'react';
import type { AuthSessionUser } from 'src/common/types/next-auth';
import type { AuthSettings } from 'src/modules/auth/components/Auth';

export type Url = string;
export type DynamicPathFn = (option: Record<string, unknown>) => Url;
export interface Route {
  auth: AuthSettings | boolean;
  icon: ReactNode;
  name: string;
  path: Url;
}

export const filterRoutesForRole =
  (user: AuthSessionUser | undefined) =>
  (item: Route): boolean => {
    if (!item.auth || item.auth === true || !item?.auth.allowedRoles) {
      return true;
    }
    return isAuthorized(item.auth.allowedRoles, user);
  };

export const LOGIN = {
  auth: false,
  icon: LoginIcon,
  name: 'Login',
  path: '/login',
};

export const UNAUTHORIZED = {
  auth: false,
  icon: BanIcon,
  name: 'Unauthorized',
  path: '/unauthorized',
};

export const ADMIN_LOGIN = {
  auth: false,
  icon: LoginIcon,
  name: 'Login',
  path: '/admin/login',
};

export const ADMIN_DASHBOARD = {
  auth: {
    loginUrl: ADMIN_LOGIN.path,
  },
  icon: MapIcon,
  name: 'Dashboard',
  path: '/admin/dashboard',
};

export const ADMIN_USERS = {
  auth: {
    allowedRoles: [Role.ADMIN, Role.SUPPORT],
    loginUrl: ADMIN_LOGIN.path,
  },
  icon: UserGroupIcon,
  name: 'Users',
  path: '/admin/users',
};

export const ADMIN_USER = {
  auth: {
    allowedRoles: [Role.ADMIN, Role.SUPPORT],
    loginUrl: ADMIN_LOGIN.path,
  },
  icon: UserIcon,
  name: 'User',
  path: '/admin/users/[id]',
};

export const ADMIN_SESSIONS = {
  auth: {
    allowedRoles: [Role.ADMIN, Role.SUPPORT],
    loginUrl: ADMIN_LOGIN.path,
  },
  icon: LockClosedIcon,
  name: 'Sessions',
  path: '/admin/sessions',
};

export const ADMIN_SESSION = {
  auth: {
    allowedRoles: [Role.ADMIN, Role.SUPPORT],
    loginUrl: ADMIN_LOGIN.path,
  },
  icon: LockClosedIcon,
  name: 'Session',
  path: '/admin/session/[id]',
};

export const ACCOUNT_SETTINGS = {
  auth: {
    loginUrl: ADMIN_LOGIN.path,
  },
  icon: CogIcon,
  name: 'Settings',
  path: '/account/settings',
};

export const GRAPHQL_V1_API = {
  auth: false,
  icon: LinkIcon,
  name: 'GraphQL API',
  path: '/api/v1/graphql',
};
