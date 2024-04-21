import express from 'express';

import userControllers from '../controllers/user.controller.js'
import validators from '../validators/users.validator.js'


export const router = express.Router();

router.post('/signup',validators.signup,userControllers.signupUser)
router.post('/login',validators.login,userControllers.loginUser)