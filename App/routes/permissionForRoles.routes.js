import express from 'express'
import { authenticateJwtToken } from '../../Middlewares/jwtAuthMiddleware.js'
import permissionForRoles from '../controllers/permissionForRoles.controllers.js'


export const router = express.Router()

router.get('/:roleId/permissions',permissionForRoles.getPermissionForRoles)

router.post('/:roleId/permissions/:permissionId',permissionForRoles.createPermissionForRoles)

router.delete('/:roleId/permissions/:permissionId',permissionForRoles.deletePermissionForRoles)
