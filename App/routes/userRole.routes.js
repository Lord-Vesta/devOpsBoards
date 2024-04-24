import express from 'express';
import userRoleControllers from '../controllers/userRoles.controllers.js';
import { authenticateJwtToken } from '../../Middlewares/jwtAuthMiddleware.js';

export const router = express.Router();

router.get('/:UserId/roles',authenticateJwtToken,userRoleControllers.getRolesOfUser)
router.post('/:userId/roles/:roleId',authenticateJwtToken,userRoleControllers.addRolesToUsers)
router.delete('/:userId/roles/:roleId',authenticateJwtToken,userRoleControllers.deleteRoleofUser)

