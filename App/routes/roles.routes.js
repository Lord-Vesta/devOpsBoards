import express from 'express';

import { deleteRole,UpdateRole, insertRoles, listRoles, specificRole } from '../controllers/roles.controllers.js';
import { authenticateJwtToken } from '../../Middlewares/jwtAuthMiddleware.js';



export const router = express.Router();

router.get('/',authenticateJwtToken,listRoles)
router.get('/:roleId',authenticateJwtToken,specificRole)
router.post('/',authenticateJwtToken,insertRoles)
router.put('/:roleId',authenticateJwtToken,UpdateRole)
// router.put('/user',authenticateJwtToken,updateRoleUser)
router.delete('/:roleId',authenticateJwtToken,deleteRole)