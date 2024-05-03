import express from "express";

import{listAllSprints,adminSpecificSprint,createSprint,deleteSprint} from "../controllers/sprints.controllers.js"

import { authenticateJwtToken} from "../../Middlewares/jwtAuthMiddleware.js";

export const router =express.Router();

import { successStatusCodes } from "../../constants/statusCodes.js";

const {ok} = successStatusCodes

import { responseHandler } from "../../common/handlers.js";




router.get('/boardId/sprints',authenticateJwtToken,async(req,res,next)=>{
    try{
        const result=await listAllSprints(req,res);
        res.status(ok).send(new responseHandler(result))
    }catch(error){
        next(error);
    }
});

router.get('/:boardId/sprints/:sprintId'),authenticateJwtToken,async(req,res,next)=>{
    try{
        const result=await getUserSprints(boardId,sprintId,userId);
            res.status(ok).send(new responseHandler(result))
        }catch(error){
            next(error);
        }
}



router.get('boardId/sprints/sprintId',authenticateJwtToken,async(req,res,next)=>{
    try{
        const result=await adminSpecificSprint(req,res);
        res.status(ok).send(new responseHandler(result))
    }
    catch(error){
        next (error);
    }
});

router.post('/:boardId/sprints', authenticateJwtToken, async (req, res, next) => {
    try {
       
        const {body:createSprintBody,params:{boardId}} = req

        const {locals:{id}} = res;
    
        const result = await createSprint(createSprintBody, id,boardId);
        res.status(result.statusCode).send(new responseHandler(result))
    } catch (error) {
        next(error);
    }
});





router.delete('/boardId/sprints/sprintId',authenticateJwtToken,async(req,res,next)=>{
    try{
        const result= await deleteSprint(req,res)
        res.status(result.statusCode).send(new responseHandler(result))
    }catch(error){
        next (error);
    }
})


