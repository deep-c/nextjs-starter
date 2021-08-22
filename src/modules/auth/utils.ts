import type { Role } from '@prisma/client';
import type { Route } from 'src/common/routes';
import type { AuthSessionUser } from 'src/common/types/next-auth';
import type { Session } from 'src/modules/auth/components/Auth';

export const isAuthenticated = (user?: AuthSessionUser | null): boolean =>
  !!user;

export const isAuthorized = (
  allowedRoles: Role[],
  user?: AuthSessionUser | null
): boolean =>
  isAuthenticated(user) && !!allowedRoles.find((role) => role === user?.role);

export const isRouteAuthorized = (item: Route, session: Session): boolean => {
  if (!item.auth || item.auth === true || !item?.auth.allowedRoles) {
    return true;
  }
  return isAuthorized(item.auth.allowedRoles, session?.user);
};
