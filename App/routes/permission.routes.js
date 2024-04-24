import express from 'express';
import { authenticateJwtToken } from '../../Middlewares/jwtAuthMiddleware.js';
import permissionContollers from '../controllers/permissions.controllers.js'
import permissionValidator from '../validators/permissions.validator.js'

export const router = express.Router();

router.get('/',authenticateJwtToken,permissionContollers.listPermissions);

router.get('/:permissionId',authenticateJwtToken,permissionContollers.specificPermission);

router.post('/',permissionValidator.addPermission,authenticateJwtToken,permissionContollers.addPermission)

router.put('/:permissionId',permissionValidator.editPermission,authenticateJwtToken,permissionContollers.editPermission)

router.delete('/:permissionId',authenticateJwtToken,permissionContollers.deletePermission)