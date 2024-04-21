import Joi from "joi";

const insertRoles = (req,res,next)=>{
    const schema = Joi.object({
        Role:Joi.string().required()
    })

    const{error,value} = schema.validate(req.body)
    if(error){
        res.status(400).json({
            status:400,
            error:error.details[0].message,
            message: "Please check the following fields: " + error.details.map((error) => error.message).join(", "),
        })
    }
    else{
        next()
    }
}

const updateRoles = (req,res,next)=>{
    const schema = Joi.object({
        Role:Joi.string().required()
    })

    const{error,value} = schema.validate(req.body)
    if(error){
        res.status(400).json({
            status:400,
            error:error.details[0].message,
            message: "Please check the following fields: " + error.details.map((error) => error.message).join(", "),
        })
    }
    else{
        next()
    }
}

export default{
    insertRoles,
    updateRoles
}