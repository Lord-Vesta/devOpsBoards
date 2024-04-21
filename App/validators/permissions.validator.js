import Joi from "joi";

const addPermission = (req,res,next)=>{
    const schema = Joi.object({
        Permission:Joi.string().required()
    })

    const{error,value} = schema.validate(req.body)
    if(error){
        res.status(400).json({
            status:400,
            error:error.details[0].message,
            message: "Please check the following fields: " + error.details.map((error) => error.message).join(", "),
        })
    }else{
        next()
    }
}


const editPermission = (req,res,next)=>{
    const schema = Joi.object({
        permission:Joi.string().required()
    })
    
    const {error,value} = schema.validate(req.body)
    if(error){
        res.status(400).json({
            status:400,
            error:error.details[0].message,
            message: "Please check the following fields: " + error.details.map((error) => error.message).join(", "),
        })
    }else{
        next()
    }
}

export default{
    addPermission,
    editPermission
}