import express from 'express';

import userControllers from '../controllers/user.controller.js'
import validators from '../validators/users.validator.js'


export const router = express.Router();

router.post('/signup',validators.signup, async (req,res,next)=>{
    try {
        const singupResponse = await userControllers.signupUser(req,res)
        console.log(singupResponse);
        res.status(singupResponse.statusCode).send(singupResponse)
    } catch (error) {
        next(error)
    }
}) 

router.post('/login',validators.login,async(req,res,next)=>{
    try {
        const loginResponse = await userControllers.loginUser(req,res)
        console.log(response);
        res.status(loginResponse.statusCode).send(loginResponse)
    } catch (error) {
        next(error);
    }
})