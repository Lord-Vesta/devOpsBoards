import express from 'express';

import userControllers from '../controllers/user.controller.js'
import validators from '../validators/users.validator.js'
import {responseHandler} from '../../common/handlers.js'

import {successStatusCodes} from '../../constants/statusCodes.js'

const {ok} = successStatusCodes;


export const router = express.Router();

router.post('/signup',validators.signup, async (req,res,next)=>{
    try {
        const singupResponse = await userControllers.signupUser(req,res)
        res.status(singupResponse.statusCode).send(new responseHandler(singupResponse))
    } catch (error) {
        next(error)
    }
}) 

router.post('/login',validators.login,async(req,res,next)=>{
    try {
        const loginResponse = await userControllers.loginUser(req,res)
        // console.log(loginResponse);
        res.status(ok).send(new responseHandler(loginResponse))
    } catch (error) {
        next(error);
    }
})