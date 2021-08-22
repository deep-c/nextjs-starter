import { useSession } from 'next-auth/client';

export type Session = ReturnType<typeof useSession>[0];
