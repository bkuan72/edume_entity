import http  from 'http';
import SysEnv from '../modules/SysEnv';

export enum RouteAuthEnum {
    NONE,
    ADMIN,
    DEV,
    NORMAL
}
export enum RouteOtherAuthEnum {
    USER_ACCOUNT,
    LICENSE,
    NONE
}

export class RouterService {
    constructor ( ) {
        return;
    }

    /**
     * Put route using router microservie
     * @returns routes DTO array
     */
    putRoute( url_path: string,
              authType: RouteAuthEnum,
              otherAuth: RouteOtherAuthEnum
            ): Promise<any[]> {
        return new Promise<any[]>((resolve) => {
            const body: Uint8Array[] = [];
            let routes: any[] | PromiseLike<any[]> = [];
            const data = {
                url_path: url_path,
                auth: false,
                auth_admin: false,
                auth_dev: false,
                auth_user_account: false,
                license_check: false,
                proxy_target: SysEnv.PROXY_TARGET,
                proxy_change_origin: true
            }
            switch(authType) {
                case RouteAuthEnum.ADMIN:
                    data.auth_admin = true;
                break;
                case RouteAuthEnum.DEV:
                    data.auth_dev = true;
                break;
                case RouteAuthEnum.NORMAL:
                    data.auth = true;
                break;
                default:
                    break;
            }
            switch(otherAuth) {
                case RouteOtherAuthEnum.LICENSE:
                    data.license_check = true;
                    break;
                case RouteOtherAuthEnum.USER_ACCOUNT:
                    data.auth_user_account = true;
                    break;
                default:
                    break;
            }
            const jsonData = JSON.stringify(data);
            const options: http.RequestOptions = {
                host: SysEnv.ROUTER_SERVICE + ':' + SysEnv.ROUTER_SERVICE_PORT,
                hostname: SysEnv.ROUTER_SERVICE,
                port: SysEnv.ROUTER_SERVICE_PORT,
                path: '/api/routes/putRoute',
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Content-Length': jsonData.length
                  }
              }

              console.info(options)
              const req = http.request(options, res => {
                console.log(`statusCode: ${res.statusCode}`)

                res.on('data', d => {
                    body.push(d);
                    const data = Buffer.concat(body).toString();
                    routes = JSON.parse(data);
                    console.info(data);
                    resolve(routes);
                });
                res.on('end', ()=>{
                    resolve(routes);
                  });
            });
            req.on('error', error => {
                console.error(error)
                resolve(routes);
              });
            console.info(jsonData)
            req.write(jsonData)
            req.end();
        })
    }

        /**
     * Get All microservice routes
     * @returns routes DTO array
     */
         getRoutes(): Promise<any[]> {
            return new Promise<any[]>((resolve) => {
                const body: Uint8Array[] = [];
                let routes: any[] | PromiseLike<any[]> = [];
                const options: http.RequestOptions = {
                    host: SysEnv.ROUTER_SERVICE + ':' + SysEnv.ROUTER_SERVICE_PORT,
                    hostname: SysEnv.ROUTER_SERVICE,
                    port: SysEnv.ROUTER_SERVICE_PORT,
                    path: '/api/routes/all',
                    method: 'GET',
                  }
                  console.info(options)
                  const req = http.request(options, res => {
                    console.log(`statusCode: ${res.statusCode}`)
    
                    res.on('data', d => {
                        body.push(d);
                    })
                    res.on('end', () => {
                        const data = Buffer.concat(body).toString();
                        console.info(data);
                        routes = JSON.parse(data);
                        console.info(routes);
                        resolve(routes);
                    });
                });
                req.on('error', error => {
                    console.error(error)
                    resolve(routes);
                  });
                req.end();
    
            })
        }
}