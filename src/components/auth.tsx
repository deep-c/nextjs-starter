import React, { useEffect } from 'react';
import type { NextPage } from 'next';
import type { UrlObject } from 'url';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/client';
import routes from '@/routes';

export interface AuthProps {
  loginUrl?: UrlObject | string;
}

export type NextAuthPage<P> = NextPage<P, P> & { auth?: AuthProps };

const Auth: React.FC<AuthProps> = ({ children, loginUrl }) => {
  const [session, loading] = useSession();
  const hasUser = !!session?.user;
  const router = useRouter();
  useEffect(() => {
    if (!loading && !hasUser && loginUrl) {
      router.push(loginUrl);
    }
  }, [loading, hasUser, router, loginUrl]);
  if (loading || !hasUser) {
    return <div />;
  }
  return <>{children}</>;
};

Auth.defaultProps = {
  loginUrl: routes.APP.LOGIN,
};

export default Auth;
