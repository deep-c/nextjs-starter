import type { Role, User as AppUser } from '@prisma/client';
import 'next-auth';

export interface AuthSessionUser {
  id: string;
  name: string | null;
  email: string | null;
  image: string | null;
  role: Role;
}

declare module 'next-auth' {
  interface Session {
    user?: AuthSessionUser;
  }

  interface User extends AppUser {}
}
