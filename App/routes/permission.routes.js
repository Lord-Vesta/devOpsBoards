import express from 'express';
import { authenticateJwtToken } from '../../Middlewares/jwtAuthMiddleware.js';
import permissionContollers from '../controllers/permissions.controllers.js'
import permissionValidator from '../validators/permissions.validator.js'
import { responseHandler } from '../../common/handlers.js';
import { successStatusCodes } from '../../constants/statusCodes.js';
import rolesMiddleware from '../../Middlewares/roles.middleware.js';
import {validateBody} from '../../common/utils.js'


const {ok} = successStatusCodes
const authorizationRoles = ['user','admin']
const {addPermissionSchema,editPermission} = permissionValidator
export const router = express.Router();

router.get('/',authenticateJwtToken,rolesMiddleware.authorize(authorizationRoles),async(req,res,next)=>{
    try {
        const listOfPermissions = await permissionContollers.listPermissions()
        res.status(ok).send(new responseHandler(listOfPermissions))
    } catch (error) {
        next(error);
    }
});

router.get('/:permissionId',authenticateJwtToken,rolesMiddleware.authorize(authorizationRoles),async(req,res,next)=>{ 
    try {
        const {params:{permissionId}} = req
        const listOfSpeificPermissions = await permissionContollers.specificPermission(permissionId)
        res.status(ok).send(new responseHandler(listOfSpeificPermissions))
    } catch (error) {
        next(error);
    }
});

router.post('/',authenticateJwtToken,rolesMiddleware.authorize(authorizationRoles),validateBody(addPermissionSchema),async(req,res,next)=>{
    try {
        const {body:{permission}} = req;
        const permissionAddedResponse = await permissionContollers.addPermission(permission)
        res.status(permissionAddedResponse.statusCode).send(new responseHandler(permissionAddedResponse))
    } catch (error) {
        next(error)
    }
})

router.put('/:permissionId',authenticateJwtToken,rolesMiddleware.authorize(authorizationRoles),validateBody(editPermission),async(req,res,next)=>{
    try {
        const {
            params: { permissionId },
            body: { permission },
          } = req;
        const editPermissionResponse = await permissionContollers.editPermission(permissionId,permission)
        res.status(editPermissionResponse.statusCode).send(new responseHandler(editPermissionResponse))
    } catch (error) {
        next(error)
    }
}
)

router.delete('/:permissionId',authenticateJwtToken,rolesMiddleware.authorize(authorizationRoles),async(req,res,next)=>{
    try {
        const {
            params: { permissionId },
          } = req;
        const editPermissionResponse = await permissionContollers.deletePermission(permissionId)
        res.status(editPermissionResponse.statusCode).send(new responseHandler(editPermissionResponse))
    } catch (error) {
        next(error)
    }
}
)