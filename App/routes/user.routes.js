import express from 'express';

import {signupUser,loginUser} from '../controllers/user.controller.js'


export const router = express.Router();

router.post('/signup',signupUser)
router.post('/login',loginUser)