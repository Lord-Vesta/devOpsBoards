import express from 'express';
import userRoleControllers from '../controllers/userRoles.controllers.js';

export const router = express.Router();

router.get('/:UserId/roles',userRoleControllers.getRolesOfUser)
router.post('/:userId/roles/:roleId',userRoleControllers.addRolesToUsers)

