import express from 'express';
import rolesValidator from '../validators/roles.validator.js'
import rolesRoutes from '../controllers/roles.controllers.js';
import { authenticateJwtToken } from '../../Middlewares/jwtAuthMiddleware.js';
import rolesMiddleware from '../../Middlewares/roles.middleware.js';
import{successStatusCodes} from '../../constants/statusCodes.js'
import { responseHandler } from '../../common/handlers.js';
import { validateBody } from '../../common/utils.js';


const {insertRolesSchema,updateRolesSchema} = rolesValidator

const {ok} = successStatusCodes

const authorizationRoles = ['user','admin']


export const roleRouter = express.Router();

roleRouter.get('/',authenticateJwtToken,rolesMiddleware.authorize(authorizationRoles),async(req,res,next)=>{
    try{
        const listOfRolesResponse = await rolesRoutes.listRoles(req,res)
        res.status(ok).send(new responseHandler(listOfRolesResponse))
        
    }catch(error){
        next(error)
    }
})

roleRouter.get('/:roleId',authenticateJwtToken,rolesMiddleware.authorize(authorizationRoles),async(req,res,next)=>{
    try{
        const specificRoleResponse = await rolesRoutes.specificRole(req,res)
        res.status(ok).send(new responseHandler(specificRoleResponse))
    }catch(error){
        next(error)
    }
})

roleRouter.post('/',authenticateJwtToken,rolesMiddleware.authorize(authorizationRoles),
validateBody(insertRolesSchema),async(req,res,next)=>{
    try {
        // console.log("insd");
        const roleAddedResponse = await rolesRoutes.insertRoles(req,res);
        res.status(roleAddedResponse.statusCode).send(new responseHandler(roleAddedResponse))
    } catch (error) {
        next(error)
    }
}
)

roleRouter.put('/:roleId',authenticateJwtToken,rolesMiddleware.authorize(authorizationRoles),
validateBody(updateRolesSchema),async(req,res,next)=>{
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