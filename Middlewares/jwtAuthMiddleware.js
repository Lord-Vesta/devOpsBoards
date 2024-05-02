import { verifyToken } from "../common/utils.js";

export const authenticateJwtToken = async (req,res,next)=>{
    const authHeader = req.headers['authorization']
    const result = await verifyToken(authHeader)
    res.locals = result;
    if(!authHeader){
        res.status(401).json({
            status:401,
            message:"you are not authenticated to use please enter jwt token",
   
        })
    }
    else{
        if(!result.success){
            res.status(401).json({
                status:401,
                error:result.err,
                message:"jwt token is invalid"
            })
        }
        else{
            next();
        }
    }

}

