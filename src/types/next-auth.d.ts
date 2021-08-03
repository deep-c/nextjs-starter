import type { User as AppUser, Role } from '@prisma/client';
import 'next-auth';

export interface AuthSessionUser {
  email: string | null;
  id: string;
  image: string | null;
  name: string | null;
  role: Role;
}

declare module 'next-auth' {
  interface Session {
    user?: AuthSessionUser;
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface User extends AppUser {}
}
