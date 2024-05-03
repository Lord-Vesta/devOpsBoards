import express from 'express';

import userControllers from '../controllers/user.controller.js'
import validators from '../validators/users.validator.js'
import { responseHandler } from '../../common/handlers.js'
import {successStatusCodes} from '../../constants/statusCodes.js'
import {validateBody} from '../../common/utils.js'

const {signupSchema,loginSchema} = validators

const {ok} = successStatusCodes;







export const router = express.Router();

router.post('/signup',validateBody(signupSchema), async (req,res,next)=>{
    try {
        const singupResponse = await userControllers.signupUser(req,res)

        res.status(singupResponse.statusCode).send(new responseHandler(singupResponse))
    } catch (error) {
        next(error)
    }
}) 

router.post('/login',validateBody(loginSchema),async(req,res,next)=>{
    try {
        const loginResponse = await userControllers.loginUser(req,res)

        res.status(ok).send(new responseHandler(loginResponse))
    } catch (error) {
        next(error);
    }
})