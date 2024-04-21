import express from 'express';
import rolesValidator from '../validators/roles.validator.js'

import rolesRoutes from '../controllers/roles.controllers.js';
import { authenticateJwtToken } from '../../Middlewares/jwtAuthMiddleware.js';



export const router = express.Router();

router.get('/',authenticateJwtToken,rolesRoutes.listRoles)
router.get('/:roleId',authenticateJwtToken,rolesRoutes.specificRole)
router.post('/',rolesValidator.insertRoles,authenticateJwtToken,rolesRoutes.insertRoles)
router.put('/:roleId',rolesValidator.updateRoles,authenticateJwtToken,rolesRoutes.updateRole)
// router.put('/user',authenticateJwtToken,updateRoleUser)
router.delete('/:roleId',authenticateJwtToken,rolesRoutes.deleteRole)