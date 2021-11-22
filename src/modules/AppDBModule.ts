import Session from 'mysqlx/lib/Session';
import { ServerDefaultProperties, ServerPropertyTypeEnum } from '../config/server.default.properties';
import SysEnv from './SysEnv';
import dbConnection from './DbModule';
import { PropertyService } from '../services/property.service';



export class AppDbModule {
    dbConnection = dbConnection;
    properties = new PropertyService();
    private firstContact: boolean;

    serverCfg!: {
        host: string | undefined;
        user: string | undefined;
        password: string | undefined;
    };

    constructor() {
      this.firstContact = true;
    }

    public connectDB(): Promise<Session> {
        return new Promise((resolve) => {
            this.dbConnection.DBM_connectDB().then((connection) => {
                if (this.firstContact) {
                  this.firstContact = true;
                  this.createDefaultProperties(0).finally(() => {
                    resolve(connection);
                  });
                } else {
                    resolve(connection);
                }
            })
        });
    }

    private createDefaultProperties(index: number): Promise<void> {
      return new Promise<void>((resolve) => {
          if (index >= ServerDefaultProperties.length) {
            resolve();
          } else {
            const prop = ServerDefaultProperties[index];
            const propName = SysEnv.SITE_CODE +'.'+ prop.name
            const newProperty = {
              name: '',
              property_type: '',
              value: '',
              numValue: 0
            };
            newProperty.name = propName;
            switch(prop.type) {
              case ServerPropertyTypeEnum.INT:
                if (prop.numValue) {
                  newProperty.numValue = prop.numValue;
                }
                newProperty.property_type = 'INT';
                break;
              case ServerPropertyTypeEnum.TEXT:
                if (prop.value) {
                  newProperty.value = prop.value;
                }
                newProperty.property_type = 'TEXT';
              break;
            }
            this.properties.getProperty (newProperty).then((propertyDTO) => {
              if (propertyDTO.length > 0) {
                ServerDefaultProperties[index].numValue = propertyDTO[0].numValue;
                ServerDefaultProperties[index].value = propertyDTO[0].value;
              }
              this.createDefaultProperties(index + 1);
            })
          }
      });
    }
}



const appDbConnection = new AppDbModule ();

export default appDbConnection;
