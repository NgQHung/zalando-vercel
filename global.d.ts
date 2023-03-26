namespace NodeJS {
  interface ProcessEnv {
    CLIENT_URI: string;
    PORT: number;
    MONGO_URI: string;
    ACCESS_TOKEN_SECRET: string;
    REFRESH_TOKEN_SECRET: string;
  }
}
