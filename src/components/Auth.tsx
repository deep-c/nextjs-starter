import type { Role } from '@prisma/client';
import { useSession } from 'next-auth/client';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { LOGIN, UNAUTHORIZED, Url } from 'src/routes';
import { isAuthenticated, isAuthorized } from 'utils/auth';

export interface AuthSettings {
  loginUrl?: Url;
  allowedRoles?: Role[];
}
export interface AuthProps extends AuthSettings {}
export type Session = ReturnType<typeof useSession>[0];
export interface AuthChildProps {
  session: Session;
}

const Auth: React.FC<AuthProps> = ({ children, loginUrl, allowedRoles }) => {
  const [session, loading] = useSession();
  const hasAuth = isAuthenticated(session?.user);
  const router = useRouter();
  useEffect(() => {
    if (!loading) {
      if (!hasAuth) {
        router.push(loginUrl ?? LOGIN.path);
      } else if (
        session &&
        allowedRoles &&
        !isAuthorized(allowedRoles, session?.user)
      ) {
        router.push(UNAUTHORIZED.path);
      }
    }
    if (!loading && !hasAuth && loginUrl) {
      router.push(loginUrl);
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
