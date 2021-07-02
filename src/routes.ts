import type { UrlObject } from 'url';
import type { ReactNode } from 'react';
import type { NextPage } from 'next';
import type { AuthSettings, AuthProps } from '@/components/Auth';
import { Role } from '@prisma/client';
import {
  XIcon,
  CogIcon,
  LoginIcon,
  UserGroupIcon,
  LockClosedIcon,
  BanIcon,
} from '@heroicons/react/outline';

export type Url = string | UrlObject;
export interface AppRoute {
  path: Url;
  name: string;
  icon: ReactNode;
  auth?: AuthSettings;
}
export type NextRoutePage<P> = NextPage<P, P> & {
  auth?: AuthProps;
  layout?: ReactNode;
};

export const LOGIN: AppRoute = {
  path: '/login',
  name: 'Login',
  icon: LoginIcon,
};

export const UNAUTHORIZED: AppRoute = {
  path: '/unauthorized',
  name: 'Unauthorized',
  icon: BanIcon,
};

export const ADMIN_LOGIN: AppRoute = {
  path: '/admin/login',
  name: 'Login',
  icon: LoginIcon,
};

export const ADMIN_DASHBOARD: AppRoute = {
  path: '/admin/dashboard',
  name: 'Dashboard',
  icon: XIcon,
};

export const ADMIN_USERS: AppRoute = {
  path: '/admin/users',
  name: 'Users',
  icon: UserGroupIcon,
  auth: {
    loginUrl: ADMIN_LOGIN.path,
    allowedRoles: [Role.ADMIN, Role.SUPPORT],
  },
};

export const ADMIN_SESSIONS: AppRoute = {
  path: '/admin/sessions',
  name: 'Sessions',
  icon: LockClosedIcon,
  auth: {
    loginUrl: ADMIN_LOGIN.path,
    allowedRoles: [Role.ADMIN, Role.SUPPORT],
  },
};

export const ACCOUNT_SETTINGS: AppRoute = {
  path: '/account/settings',
  name: 'Settings',
  icon: CogIcon,
  auth: {
    loginUrl: LOGIN.path,
  },
};
