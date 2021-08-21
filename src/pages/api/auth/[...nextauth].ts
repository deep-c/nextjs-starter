import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { Role, Status } from '@prisma/client';
import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';

import prisma from 'src/prisma/connection';

export default NextAuth({
  adapter: PrismaAdapter(prisma),
  callbacks: {
    session(session, userOrToken) {
      // Add UserId and role to session object.
      // NOTE: No great way to check for token or user.
      // We arent using JWT if JWT is enabled this will need to be modified.
      if (session?.user) {
        // eslint-disable-next-line no-param-reassign
        session.user = {
          ...session.user,
          id: (userOrToken.id as string) || session.user.id,
          role: (userOrToken.role as Role) || session.user.role,
        };
      }
      return session;
    },
    signIn(user) {
      if (user.status === Status.DISABLED) {
        return false;
      }
      return true;
    },
  },
  providers: [
    Providers.Cognito({
      clientId: process.env.COGNITO_CLIENT_ID,
      clientSecret: process.env.COGNITO_CLIENT_SECRET,
      domain: process.env.COGNITO_DOMAIN,
    }),
  ],
  session: {
    jwt: false,
  },
});
