/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import {
    cleanEnv, str, port, num
  } from 'envalid';

  function validateEnv() {
    cleanEnv(process.env, {
        DB_HOST: str(),
        DB_USER: str(),
        DB_PASSWORD: str(),
        DB_NAME: str(),
        DB_PORT: str(),
        PORT: port(),
        JWT_SECRET: str(),
        SITE_CODE: str(),
        DB_BCRYPT_SALT: num(),
        NODE_ENV: str(),
        CAMEL_CASE_DTO: str(),

        ROUTER_SERVICE: str(),
        ROUTER_SERVICE_PORT: str(),
        PROXY_TARGET: str(),
        PROPERTY_SERVICE: str(),
        PROPERTY_SERVICE_PORT: str(),
    });
  }

  export default validateEnv;