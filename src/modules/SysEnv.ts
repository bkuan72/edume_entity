export class SystemEnvironment {
    DB_HOST: string;
    DB_USER: string;
    DB_PASSWORD: string;
    DB_NAME: string;
    DB_PORT: string;
    PORT: number;
    JWT_SECRET: string;
    DB_BCRYPT_SALT: number;
    SITE_CODE: string;
    NODE_ENV: string;

    TOOBUSY_MAX_LAG: number;
    TOOBUSY_CHECK_INTERVAL: number;

    CAMEL_CASE_DTO: string;
    ROUTER_SERVICE: string;
    ROUTER_SERVICE_PORT: string;
    PROXY_TARGET: string;

    PROPERTY_SERVICE: string;
    PROPERTY_SERVICE_PORT: string;

    constructor () {
        this.DB_HOST = 'localhost';             // database URL
        this.DB_USER = 'webservice';            // database user id
        this.DB_PASSWORD = ''                   // database password
        this.DB_NAME = 'ls10_net';                // database name
        this.DB_PORT = '3306';                    // database port
        this.PORT = 3000;                       // this server port
        this.JWT_SECRET = '';                   // JWT secret key
        this.DB_BCRYPT_SALT = 10;               // Bcrypt salt number
        this.SITE_CODE = 'TEST';                // this server's site code
        this.NODE_ENV = 'debug';          // SysLog mode : debug, development or production
        this.CAMEL_CASE_DTO = 'N';
        this.TOOBUSY_MAX_LAG = 1000;            // maximum lag tolerable in ms
        this.TOOBUSY_CHECK_INTERVAL = 500;      // check interval in ms

        this.ROUTER_SERVICE = 'localhost';
        this.ROUTER_SERVICE_PORT = '33002';
        this.PROXY_TARGET = 'ls10_net_entity';

        this.PROPERTY_SERVICE = 'localhost';
        this.PROPERTY_SERVICE_PORT = '33003';
    }
    init(): void {
        if (process.env.DB_HOST !== undefined) {
            this.DB_HOST = process.env.DB_HOST;
        }
        if (process.env.DB_USER !== undefined) {
            this.DB_USER = process.env.DB_USER;
        }
        if (process.env.DB_PASSWORD !== undefined) {
            this.DB_PASSWORD = process.env.DB_PASSWORD;
        }
        if (process.env.DB_NAME !== undefined) {
            this.DB_NAME = process.env.DB_NAME;
        }
        if (process.env.DB_PORT !== undefined) {
            this.DB_PORT = process.env.DB_PORT;
        }
        if (process.env.PORT !== undefined) {
            this.PORT = parseInt(process.env.PORT);
        }
        if (process.env.JWT_SECRET !== undefined) {
            this.JWT_SECRET = process.env.JWT_SECRET;
        }
        if (process.env.DB_BCRYPT_SALT !== undefined) {
            this.DB_BCRYPT_SALT = parseInt(process.env.DB_BCRYPT_SALT);
        }
        if (process.env.SITE_CODE !== undefined) {
            this.SITE_CODE = process.env.SITE_CODE;
        }
        if (process.env.NODE_ENV !== undefined) {
            this.NODE_ENV = process.env.NODE_ENV;
        }
        if (process.env.TOOBUSY_MAX_LAG !== undefined) {
            this.TOOBUSY_MAX_LAG = parseInt(process.env.TOOBUSY_MAX_LAG);
        }
        if (process.env.TOOBUSY_CHECK_INTERVAL !== undefined) {
            this.TOOBUSY_CHECK_INTERVAL = parseInt(process.env.TOOBUSY_CHECK_INTERVAL);
        }
        if (process.env.ROUTER_SERVICE !== undefined) {
            this.ROUTER_SERVICE = process.env.ROUTER_SERVICE;
        }
        if (process.env.ROUTER_SERVICE_PORT !== undefined) {
            this.ROUTER_SERVICE_PORT = process.env.ROUTER_SERVICE_PORT;
        }
        if (process.env.PROXY_TARGET !== undefined) {
            this.PROXY_TARGET = process.env.PROXY_TARGET;
        }
        if (process.env.PROPERTY_SERVICE !== undefined) {
            this.PROPERTY_SERVICE = process.env.PROPERTY_SERVICE;
        }
        if (process.env.PROPERTY_SERVICE_PORT !== undefined) {
            this.PROPERTY_SERVICE_PORT = process.env.PROPERTY_SERVICE_PORT;
        }
    }
}

const SysEnv = new SystemEnvironment();

export default SysEnv;