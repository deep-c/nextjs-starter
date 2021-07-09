declare namespace NodeJS {
  interface Global {}
  // See .env.local.example. This should be kept in sync with variables added and removed
  interface ProcessEnv {
    APP_HOSTNAME: string;
    PORT?: string;
    NEXT_PUBLIC_HOST: string;
    POSTGRES_PASSWORD: string;
    POSTGRES_USER: string;
    POSTGRES_DB: string;
    DATABASE_URL: string;
    NEXTAUTH_URL: string;
    COGNITO_CLIENT_ID: string;
    COGNITO_CLIENT_SECRET: string;
    COGNITO_DOMAIN: string;
    DEBUG: string;
  }
}
