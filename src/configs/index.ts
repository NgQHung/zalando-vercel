import dotenv from 'dotenv';
import dotenvSafe from 'dotenv-safe';

dotenv.config({ path: `.env.${process.env.NODE_ENV}` });
dotenvSafe.config({
  allowEmptyValues: true,
});

export default {
  port: process.env.PORT,
  mongodb: {
    uri: process.env.MONGO_URI,
  },
  jwt: {
    accessTokenSecret: process.env.ACCESS_TOKEN_SECRET || '',
    refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET || '',
  },
};
