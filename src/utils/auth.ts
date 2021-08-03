import type { Role } from '@prisma/client';
import type { AuthSessionUser } from 'src/types/next-auth';

export const isAuthenticated = (user?: AuthSessionUser | null): boolean =>
  !!user;

export const isAuthorized = (
  allowedRoles: Role[],
  user?: AuthSessionUser | null
): boolean =>
  isAuthenticated(user) && !!allowedRoles.find((role) => role === user?.role);
