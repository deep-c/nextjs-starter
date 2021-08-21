import { signIn, signOut, useSession } from 'next-auth/client';
import Head from 'next/head';
import React from 'react';

const Home = (): React.ReactElement => {
  const [session] = useSession();

  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta content="Generated by create next app" name="description" />
        <link href="/favicon.ico" rel="icon" />
      </Head>
      <main>
        {!session && (
          <>
            Not signed in <br />
            <button
              data-testid="loginButton"
              onClick={() => signIn()}
              type="button"
            >
              Sign in
            </button>
          </>
        )}
        {session && (
          <>
            Signed in as {session?.user?.email} <br />
            <button onClick={() => signOut()} type="button">
              Sign out
            </button>
          </>
        )}
      </main>
    </div>
  );
};

export default Home;
