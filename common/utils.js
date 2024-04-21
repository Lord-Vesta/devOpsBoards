import bcrypt from 'bcryptjs';
import jsonwebtoken from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const secretKey = process.env.secretKey

export const passwordHashing = async(password)=>{
    console.log(password)
    const encPassword = await bcrypt.hash(password,10)
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