import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/client';
import type { Role } from '@prisma/client';
import type { NextPage } from 'next';
import type { UrlObject } from 'url';
import routes from '@/routes';
import { Session } from 'next-auth';

export interface AuthProps {
  loginUrl?: UrlObject | string;
  allowedRoles?: Role[];
}

export type NextAuthPage<P> = NextPage<P, P> & { auth?: AuthProps };

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
        router.push(loginUrl ?? routes.APP.LOGIN);
      } else if (
        session &&
        allowedRoles &&
        !roleHasAccess(session, allowedRoles)
      ) {
        router.push(routes.UNAUTHORIZED);
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
  loginUrl: routes.APP.LOGIN,
};

export default Auth;
