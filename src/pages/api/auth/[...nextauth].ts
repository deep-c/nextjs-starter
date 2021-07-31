import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { Status } from '@prisma/client';
import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';
import prisma from 'src/database/connection';

export default NextAuth({
  providers: [
    Providers.Cognito({
      clientId: process.env.COGNITO_CLIENT_ID,
      clientSecret: process.env.COGNITO_CLIENT_SECRET,
      domain: process.env.COGNITO_DOMAIN,
    }),
  ],
  adapter: PrismaAdapter(prisma),
  session: {
    jwt: false,
  },
  callbacks: {
    async signIn(user, account, profile) {
      if (user.status === Status.DISABLED) {
        return false;
      }
      return true;
    },
    async session(session, userOrToken) {
      // Add UserId to session object. NOTE: No great way to check for token or user.
      // We arent using JWT if JWT is enabled this will need to be modified.
      if (session?.user) {
        session.user = Object.assign({}, session.user, {
          id: userOrToken.id || session.user.id,
          role: userOrToken.role || session.user.role,
        });
      }
      return session;
    },
  },
});
