import express from 'express';
import { getRolesOfUser,addRolesToUsers } from '../controllers/userRoles.controllers.js';

export const router = express.Router();

router.get('/:UserId/roles',getRolesOfUser)
router.post('/:userId/roles/:roleId',addRolesToUsers)

