import type { ReactNode } from 'react';
import type { NextPage } from 'next';
import type { AuthSessionUser } from '@/types/next-auth';
import type { AuthSettings, AuthProps } from '@/components/Auth';
import { isAuthorized } from '@/components/Auth';
import { Role } from '@prisma/client';
import {
  CogIcon,
  LoginIcon,
  UserGroupIcon,
  LockClosedIcon,
  BanIcon,
  LinkIcon,
  MapIcon,
} from '@heroicons/react/outline';

export type Url = string;
export type DynamicPathFn = (option: Record<string, any>) => Url;
export interface AppRoute {
  path: Url;
  name: string;
  icon: ReactNode;
  auth: AuthSettings | boolean;
}
export type NextRoutePage<P> = NextPage<P, P> & {
  auth?: AuthProps | boolean;
  layout?: ReactNode;
};

export const filterRoutesForRole =
  (user: AuthSessionUser | undefined) =>
  (item: AppRoute): boolean => {
    if (!item.auth || item.auth === true || !item?.auth.allowedRoles) {
      return true;
    }
    return isAuthorized(item.auth.allowedRoles, user);
  };

export const GRAPHQL_V1_API = {
  path: '/api/v1/graphql',
  name: 'GraphQL API',
  icon: LinkIcon,
  auth: false,
};

export const LOGIN = {
  path: '/login',
  name: 'Login',
  icon: LoginIcon,
  auth: false,
};

export const UNAUTHORIZED = {
  path: '/unauthorized',
  name: 'Unauthorized',
  icon: BanIcon,
  auth: false,
};

export const ADMIN_LOGIN = {
  path: '/admin/login',
  name: 'Login',
  icon: LoginIcon,
  auth: false,
};

export const ADMIN_DASHBOARD = {
  path: '/admin/dashboard',
  name: 'Dashboard',
  icon: MapIcon,
  auth: false,
};

export const ADMIN_USERS = {
  path: '/admin/users',
  name: 'Users',
  icon: UserGroupIcon,
  auth: {
    loginUrl: ADMIN_LOGIN.path,
    allowedRoles: [Role.ADMIN, Role.SUPPORT],
  },
};

export const ADMIN_SESSIONS = {
  path: '/admin/sessions',
  name: 'Sessions',
  icon: LockClosedIcon,
  auth: {
    loginUrl: ADMIN_LOGIN.path,
    allowedRoles: [Role.ADMIN, Role.SUPPORT],
  },
};

export const ACCOUNT_SETTINGS = {
  path: '/account/settings',
  name: 'Settings',
  icon: CogIcon,
  auth: {
    loginUrl: LOGIN.path,
  },
};
