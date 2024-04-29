import express from 'express';
import rolesValidator from '../validators/roles.validator.js'

import rolesRoutes from '../controllers/roles.controllers.js';
import { authenticateJwtToken } from '../../Middlewares/jwtAuthMiddleware.js';
import rolesMiddleware from '../../Middlewares/roles.middleware.js';

const combination = ['user','admin']
const admin = ['admin'] 
const user = ['user']

export const roleRouter = express.Router();

roleRouter.get('/',authenticateJwtToken,rolesMiddleware.authorize(['user','admin']),rolesRoutes.listRoles)

roleRouter.get('/:roleId',authenticateJwtToken,rolesMiddleware.authorize(['user','admin']),rolesRoutes.specificRole)

roleRouter.post('/',rolesValidator.insertRoles,rolesMiddleware.authorize(['user','admin']),authenticateJwtToken,rolesRoutes.insertRoles)

roleRouter.put('/:roleId',rolesValidator.updateRoles,authenticateJwtToken,rolesMiddleware.authorize(['user','admin']),rolesRoutes.updateRole)
// roleRouter.put('/user',authenticateJwtToken,updateRoleUser)
roleRouter.delete('/:roleId',authenticateJwtToken,rolesMiddleware.authorize(['user','admin']),rolesRoutes.deleteRole)