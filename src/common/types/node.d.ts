declare namespace NodeJS {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface Global {}
  // See .env.local.example. This should be kept in sync with
  // variables added and removed
  interface ProcessEnv {
    APP_HOSTNAME: string;
    COGNITO_CLIENT_ID: string;
    COGNITO_CLIENT_SECRET: string;
    COGNITO_DOMAIN: string;
    DATABASE_URL: string;
    DEBUG: string;
    NEXTAUTH_URL: string;
    NEXT_PUBLIC_HOST: string;
    PORT?: string;
    POSTGRES_DB: string;
    POSTGRES_PASSWORD: string;
    POSTGRES_USER: string;
    TESTCAFE_BASE_URL: string;
  }
}
