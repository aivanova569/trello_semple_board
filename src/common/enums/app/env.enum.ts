import { config } from "dotenv";

config();

const {
  PORT,
  DB_USERNAME,
  DB_PASSWORD,
  DB_NAME,
  DB_HOST,
  DB_PORT,
  DB_DIALECT,
  SECRET_KEY,
} = process.env;

const ENV = {
  APP: {
    SERVER_PORT: PORT,
  },
  DB: {
    USERNAME: DB_USERNAME,
    PASSWORD: DB_PASSWORD,
    NAME: DB_NAME,
    HOST: DB_HOST,
    DIALECT: DB_DIALECT,
    PORT: DB_PORT,
  },
  API: {
    V1_PREFIX: '/api/v1/',
  },
  JWT: {
    SECRET: SECRET_KEY,
  },
};

export { ENV };
