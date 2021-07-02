import React, { useEffect, ReactNode } from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/client';
import type { Session } from 'next-auth';
import type { Role } from '@prisma/client';
import type { UrlObject } from 'url';
import { LOGIN, UNAUTHORIZED } from '@/routes';

export interface AuthSettings {
  loginUrl?: UrlObject | string;
  allowedRoles?: Role[];
}

export interface AuthProps extends AuthSettings {}

export const roleHasAccess = (session: Session, roles: Role[]) => {
  return !!roles.find((role) => role === session?.user?.role);
};

const Auth: React.FC<AuthProps> = ({ children, loginUrl, allowedRoles }) => {
  const [session, loading] = useSession();
  const hasUser = !!session?.user;
  const router = useRouter();
  useEffect(() => {
    if (!loading) {
      if (!hasUser) {
        router.push(loginUrl ?? LOGIN.path);
      } else if (
        session &&
        allowedRoles &&
        !roleHasAccess(session, allowedRoles)
      ) {
        router.push(UNAUTHORIZED.path);
      }
    }
    if (!loading && !hasUser && loginUrl) {
      router.push(loginUrl);
    }
  }, [loading, hasUser, router, loginUrl, allowedRoles, session]);
  if (loading || !hasUser) {
    return <div />;
  }
  return <>{children}</>;
};

Auth.defaultProps = {
  loginUrl: LOGIN.path,
};

export default Auth;
