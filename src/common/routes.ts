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

import type { AuthSettings } from 'src/modules/auth/components/Auth';

export type Url = string;
export type DynamicPathFn = (option: Record<string, unknown>) => Url;
export interface Route {
  auth: AuthSettings | boolean;
  icon: typeof BanIcon;
  name: string;
  path: Url;
}

export const LOGIN: Route = {
  auth: false,
  icon: LoginIcon,
  name: 'Login',
  path: '/login',
};

export const UNAUTHORIZED: Route = {
  auth: false,
  icon: BanIcon,
  name: 'Unauthorized',
  path: '/unauthorized',
};

export const ADMIN_LOGIN: Route = {
  auth: false,
  icon: LoginIcon,
  name: 'Login',
  path: '/admin/login',
};

export const ADMIN_DASHBOARD: Route = {
  auth: {
    loginUrl: ADMIN_LOGIN.path,
  },
  icon: MapIcon,
  name: 'Dashboard',
  path: '/admin/dashboard',
};

export const ADMIN_USERS: Route = {
  auth: {
    allowedRoles: [Role.ADMIN, Role.SUPPORT],
    loginUrl: ADMIN_LOGIN.path,
  },
  icon: UserGroupIcon,
  name: 'Users',
  path: '/admin/users',
};

export const ADMIN_USER: Route = {
  auth: {
    allowedRoles: [Role.ADMIN, Role.SUPPORT],
    loginUrl: ADMIN_LOGIN.path,
  },
  icon: UserIcon,
  name: 'User',
  path: '/admin/users/[id]',
};

export const ADMIN_SESSIONS: Route = {
  auth: {
    allowedRoles: [Role.ADMIN, Role.SUPPORT],
    loginUrl: ADMIN_LOGIN.path,
  },
  icon: LockClosedIcon,
  name: 'Sessions',
  path: '/admin/sessions',
};

export const ADMIN_SESSION: Route = {
  auth: {
    allowedRoles: [Role.ADMIN, Role.SUPPORT],
    loginUrl: ADMIN_LOGIN.path,
  },
  icon: LockClosedIcon,
  name: 'Session',
  path: '/admin/session/[id]',
};

export const ACCOUNT_SETTINGS: Route = {
  auth: {
    loginUrl: ADMIN_LOGIN.path,
  },
  icon: CogIcon,
  name: 'Settings',
  path: '/account/settings',
};

export const GRAPHQL_V1_API: Route = {
  auth: false,
  icon: LinkIcon,
  name: 'GraphQL API',
  path: '/api/v1/graphql',
};
