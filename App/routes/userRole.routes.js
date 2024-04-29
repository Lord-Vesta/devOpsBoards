import express from 'express';
import userRoleControllers from '../controllers/userRoles.controllers.js';
import { authenticateJwtToken } from '../../Middlewares/jwtAuthMiddleware.js';
import {responseHandler} from '../../common/handlers.js'

import {successStatusCodes} from '../../constants/statusCodes.js'

const {ok} = successStatusCodes;

export const router = express.Router();

router.get('/:UserId/roles',authenticateJwtToken,async(req,res,next)=>{
    try {
        const rolesOfUserList = await userRoleControllers.getRolesOfUser(req,res)
        res.status(ok).send(new responseHandler(rolesOfUserList))
    } catch (error) {
        next(error);
    }
})

router.post('/:userId/roles/:roleId',authenticateJwtToken,userRoleControllers.addRolesToUsers)

router.delete('/:userId/roles/:roleId',authenticateJwtToken,async(req,res,next)=>{
    try{
        const deletedRolesResponse =await userRoleControllers.deleteRoleofUser(req,res)

    res.status(deletedRolesResponse.statusCode).send(deletedRolesResponse)
    }catch(error){
        next(error);
    }
})

