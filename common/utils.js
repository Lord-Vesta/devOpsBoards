import bcrypt from 'bcryptjs';
import jsonwebtoken from "jsonwebtoken";
import dotenv from "dotenv";
import { errorStatusCodes } from '../constants/statusCodes.js';
import { responseHandler } from './handlers.js';
import { messageHandler } from './handlers.js';
dotenv.config();


const {badRequest} = errorStatusCodes

const secretKey = process.env.secretKey

export const passwordHashing = async(password)=>{
    const encPassword = await bcrypt.hash(password,10)
    console.log(encPassword);
    return encPassword;
}

export const passwordComparing = async(password,hash)=>{
    const result = await bcrypt.compare(password,hash)
    return result;
}

export const generateJwtToken = async(result)=>{
    
    const payload = {
        id: result.Id,
        email: result.emailId,
        role: result.Role,
        isDeleted: result.isDeleted
    }
    const options = {expiresIn:"1h"}
     return jsonwebtoken.sign(payload, secretKey,options)
}

export const verifyToken = (token)=>{
    try{
        const decoded =  jsonwebtoken.verify(token,secretKey)
        return { success: true, data: decoded };
    }
    catch(err){
        return { success: false, message: err.message };
    }
}

export const validateBody=(schema)=>{

    return(req,res,next)=>{
        const{error} = schema.validate(schema)
    if(error){
        console.log(error.details[0].message);
        throw new messageHandler(badRequest,error.details[0].message)
    }else{
        next()
    }
    }
    
}