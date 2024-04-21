import express from 'express';
import { authenticateJwtToken } from '../../Middlewares/jwtAuthMiddleware.js';
import permissionContollers from '../controllers/permissions.controllers.js'

export const router = express.Router();

router.get('/',authenticateJwtToken,permissionContollers.listPermissions);
router.get('/:permissionId',authenticateJwtToken,permissionContollers.specificPermission);
router.post('/',authenticateJwtToken,permissionContollers.addPermission)
router.put('/:permissionId',authenticateJwtToken,permissionContollers.editPermission)
router.delete('/:permissionId',authenticateJwtToken,permissionContollers.deletePermission)