import { verifyToken } from "../common/utils.js";
import dotenv  from "dotenv"
dotenv.config()

const authorize= (roles = []) =>{
    if (typeof roles === "string") {
        roles = [roles];
    }

    // const secret = process.env.secretKey;
    // console.log(secret);
    return (req,res,next)=>{
        const jwtToken = req.headers['authorization'];
        const decoded = verifyToken(jwtToken)
        const role = decoded.data.role
        console.log(role);

        if (!role || (roles.length && !roles.includes(role))) {
            // user's role is not authorized
            return res.status(401).json({ message: `Only ${roles} is Authorized!` 
        });
          }
        next()
    }

    
} 

export default{
    authorize
}