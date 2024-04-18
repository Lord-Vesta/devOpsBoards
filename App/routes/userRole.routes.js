import express from 'express';
import { getRolesOfUser } from '../controllers/userRoles.controllers.js';

export const router = express.Router();

router.get('/:UserId/roles',getRolesOfUser)

