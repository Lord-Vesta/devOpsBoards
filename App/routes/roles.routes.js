import express from 'express';
import rolesValidator from '../validators/roles.validator.js'

import rolesRoutes from '../controllers/roles.controllers.js';
import { authenticateJwtToken } from '../../Middlewares/jwtAuthMiddleware.js';
import rolesMiddleware from '../../Middlewares/roles.middleware.js';



export const router = express.Router();

router.get('/',authenticateJwtToken,rolesMiddleware.authorize(['admin']),rolesRoutes.listRoles)

router.get('/:roleId',authenticateJwtToken,rolesMiddleware.authorize(['admin']),rolesRoutes.specificRole)

router.post('/',rolesValidator.insertRoles,rolesMiddleware.authorize(['admin']),authenticateJwtToken,rolesRoutes.insertRoles)

router.put('/:roleId',rolesValidator.updateRoles,authenticateJwtToken,rolesMiddleware.authorize(['admin']),rolesRoutes.updateRole)
// router.put('/user',authenticateJwtToken,updateRoleUser)
router.delete('/:roleId',authenticateJwtToken,rolesMiddleware.authorize(['admin']),rolesRoutes.deleteRole)