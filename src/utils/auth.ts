import type { Role } from '@prisma/client';
import type { AuthSessionUser } from 'src/types/next-auth';

export const isAuthorized = (
  allowedRoles: Role[],
  user?: AuthSessionUser | null
) => {
  return (
    isAuthenticated(user) && !!allowedRoles.find((role) => role === user?.role)
  );
};

export const isAuthenticated = (user?: AuthSessionUser | null) => {
  return !!user;
};
