import express from 'express';
import rolesValidator from '../validators/roles.validator.js'

import rolesRoutes from '../controllers/roles.controllers.js';
import { authenticateJwtToken } from '../../Middlewares/jwtAuthMiddleware.js';
import rolesMiddleware from '../../Middlewares/roles.middleware.js';
import{successStatusCodes} from '../../constants/statusCodes.js'
import { responseHandler } from '../../common/handlers.js';

const {ok} = successStatusCodes

const authorizationRoles = ['user','admin']


export const roleRouter = express.Router();

roleRouter.get('/',authenticateJwtToken,rolesMiddleware.authorize(authorizationRoles),async(req,res,next)=>{
    try{
        const listOfRoles = await rolesRoutes.listRoles(req,res)
        res.status(ok).send(new responseHandler(listOfRoles))
        
    }catch(error){
        console.log(error);
        next(error)
    }
})

roleRouter.get('/:roleId',authenticateJwtToken,rolesMiddleware.authorize(authorizationRoles),async(req,res,next)=>{
    try{
        const specificRole = await rolesRoutes.specificRole(req,res)
        res.status(ok).send(new responseHandler(specificRole))
    }catch(error){
        next(error)
    }
})

roleRouter.post('/',authenticateJwtToken,rolesValidator.insertRoles,rolesMiddleware.authorize(authorizationRoles),async(req,res,next)=>{
    try {
        const roleAdded = await rolesRoutes.insertRoles(req,res);
        res.status(roleAdded.statusCode).send(new responseHandler(roleAdded))
    } catch (error) {
        next(error)
    }
}
)

roleRouter.put('/:roleId',rolesValidator.updateRoles,authenticateJwtToken,rolesMiddleware.authorize(authorizationRoles),async(req,res,next)=>{
    try {
        const updateRoles = await rolesRoutes.updateRole(req,res)
    res.status(updateRoles.statusCode).send(new responseHandler(updateRoles))
    } catch (error) {
        next(error);
    }
    
})

roleRouter.delete('/:roleId',authenticateJwtToken,rolesMiddleware.authorize(authorizationRoles),async(req,res,next)=>{
    try {
        const roleDeleted = await rolesRoutes.deleteRole(req,res)
        res.status(roleDeleted.statusCode).send(new responseHandler(roleDeleted))
    } catch (error) {
        next(error)
    }
    
})