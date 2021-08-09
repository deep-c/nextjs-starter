import { useSession } from 'next-auth/client';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

import { LOGIN, UNAUTHORIZED, Url } from 'src/routes';
import { isAuthenticated, isAuthorized } from 'src/utils/auth';

import type { Role } from '@prisma/client';

export interface AuthSettings {
  allowedRoles?: Role[];
  loginUrl?: Url;
}
export type AuthProps = AuthSettings;
export type Session = ReturnType<typeof useSession>[0];
export interface AuthChildProps {
  session: Session;
}

const Auth: React.FC<AuthProps> = ({ allowedRoles, children, loginUrl }) => {
  const [session, loading] = useSession();
  const hasAuth = isAuthenticated(session?.user);
  const router = useRouter();
  useEffect(() => {
    if (!loading) {
      if (!hasAuth) {
        // eslint-disable-next-line no-void
        void router.push(loginUrl ?? LOGIN.path);
      } else if (
        session &&
        allowedRoles &&
        !isAuthorized(allowedRoles, session?.user)
      ) {
        // eslint-disable-next-line no-void
        void router.push(UNAUTHORIZED.path);
      }
    }
    if (!loading && !hasAuth && loginUrl) {
      // eslint-disable-next-line no-void
      void router.push(loginUrl);
    }
  }, [loading, hasAuth, router, loginUrl, allowedRoles, session]);
  if (loading || !hasAuth) {
    return <div />;
  }
  return (
    <>
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, { session });
        }
        return child;
      })}
    </>
  );
};

Auth.defaultProps = {
  loginUrl: LOGIN.path,
};

export default Auth;
