import { EntityDTO, UpdEntityDTO } from './../../dtos/entities.DTO';
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

import {EntityModel} from "../models/entity.model";
import * as express from 'express';
import Controller from "../../interfaces/controller.interface";
import DataNotFoundException from "../../exceptions/DataNotFoundException";
import NoDataException from "../../exceptions/NoDataExceptions";
import { entities_schema } from "../../schemas/entities.schema";
import validationUpdateMiddleware from "../../middleware/validate.update.dto.middleware";
import validationMiddleware from "../../middleware/validation.middleware";

import PostDataFailedException from "../../exceptions/PostDataFailedException";
import SysEnv from "../../modules/SysEnv";
import { RouteAuthEnum, RouteOtherAuthEnum, RouterService } from '../../services/router.service';



export class EntitiesController implements Controller{
  public path='/entities';
  public router= express.Router();
  private entities = new EntityModel();
  private routerService = new RouterService();
  siteCode = SysEnv.SITE_CODE;


  constructor() {
      this.siteCode = SysEnv.SITE_CODE;
      this.initializeRoutes();
  }

  public initializeRoutes() {
    this.routerService.putRoute('/api'+this.path+'/post', RouteAuthEnum.NORMAL, RouteOtherAuthEnum.NONE).finally(() => {
      this.router.post(this.path+'/post', validationMiddleware(entities_schema), this.newEntity);
        this.routerService.putRoute('/api'+this.path+'/all', RouteAuthEnum.NORMAL, RouteOtherAuthEnum.NONE).finally(() => {
          this.router.get(this.path+'/all', this.getAll);
          this.routerService.putRoute('/api'+this.path+'/byId/:id', RouteAuthEnum.NORMAL, RouteOtherAuthEnum.NONE).finally(() => {
            this.router.get(this.path+'/byId/:id', this.findById);
            this.routerService.putRoute('/api'+this.path+'/patch/:id', RouteAuthEnum.NORMAL, RouteOtherAuthEnum.NONE).finally(() => {
              this.router.patch(this.path+'/patch/:id',  validationUpdateMiddleware(entities_schema), this.update);
              this.routerService.putRoute('/api'+this.path+'/DTO', RouteAuthEnum.DEV, RouteOtherAuthEnum.NONE).finally(() => {
                this.router.get(this.path+'/DTO', this.apiDTO);
                this.routerService.putRoute('/api'+this.path+'/updDTO', RouteAuthEnum.NORMAL, RouteOtherAuthEnum.NONE).finally(() => {
                  this.router.get(this.path+'/updDTO', this.apiUpdDTO);
                  this.routerService.putRoute('/api'+this.path+'/schema', RouteAuthEnum.DEV, RouteOtherAuthEnum.NONE).finally(() => {
                    this.router.get(this.path+'/schema', this.apiSchema);
                  })
                })
              })
            })
          })
        })
    })
    return;
  }

  apiDTO  = (request: express.Request, response: express.Response) => {
    const dto = new EntityDTO();
    response.send(dto);
  }
  apiUpdDTO  = (request: express.Request, response: express.Response) => {
    const dto = new UpdEntityDTO();
    response.send(dto);
  }
  apiSchema  = (request: express.Request, response: express.Response) => {
    response.send(entities_schema);
  }

  newEntity  = (request: express.Request, response: express.Response, next: express.NextFunction) => {
      this.entities.create(request.body).then((respEntityDTO) => {
        if (respEntityDTO) {
            response.send(respEntityDTO);
          } else {
            next(new PostDataFailedException())
          }
      })
  };

  findById  = (request: express.Request, response: express.Response, next: express.NextFunction) => {
    this.entities.findById(request.params.id).then((respEntityDTO) => {
      if (respEntityDTO) {
        response.send(respEntityDTO);
      } else {
        next(new DataNotFoundException(request.params.id))
      }
    })
  }

  getAll  = (request: express.Request, response: express.Response, next: express.NextFunction) => {
    this.entities.getAll().then((respEntityDTOArray) => {
      if (respEntityDTOArray) {
        response.send(respEntityDTOArray);
      } else {
        next(new NoDataException())
      }
    })
  }

  update  = (request: express.Request, response: express.Response, next: express.NextFunction) => {
    this.entities.updateById(request.params.id, request.body).then((respEntityDTO) => {
      if (respEntityDTO) {
        response.send(respEntityDTO);
      } else {
        next(new DataNotFoundException(request.params.id))
      }
    })
  }
}