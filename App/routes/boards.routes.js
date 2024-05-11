import express from "express";
import { listBoards,adminSpecificBoard,createBoard,addAuserToAExistingBoard,deleteBoard,createBoardByAdmin, editBoard,getMembersofSpecificBoard,editBoardAdmin } from "../controllers/boards.controllers.js";

import { authenticateJwtToken } from "../../Middlewares/jwtAuthMiddleware.js";

export const router = express.Router();

import {successStatusCodes} from '../../constants/statusCodes.js'


import { responseHandler } from "../../common/handlers.js";
import validators from '../validators/boards.validators.js';
import {validateBody} from '../../common/utils.js';


const {createBoardSchema,editBoardSchema}=validators;


const {ok} = successStatusCodes

router.get('/getBoards',authenticateJwtToken,async(req,res,next)=>{
    try {
        const {locals:{userId,role}}=res
        const result = await listBoards(userId,role)

        res.status(ok).send(new responseHandler(result))
    } catch (error) {
        next(error);
    }
});
        
router.get('/:boardId',authenticateJwtToken,async (req,res,next)=>{
    try{
        const{locals:{role}}=res;
        const{params:{boardId}}=req;
       
        const result =await adminSpecificBoard(role,boardId)
        res.status(ok).send(new responseHandler(result))
    }
    catch(error){
        next(error);
    }
});

router.get('/getMemberSpecificBoard/boardId/:boardId',authenticateJwtToken,async(req,res,next)=>{
    try{
        const {locals:{userId,role}}=res;
        const {params:{boardId}}=req;
        const result=await getMembersofSpecificBoard(role,userId,boardId)
        res.status(ok).send(new responseHandler(result))
    }catch(error){
        next(error);
    }
});


router.post('/createBoardByAdmin/',validateBody(createBoardSchema),authenticateJwtToken,async(req,res,next)=>{
    try{
    const {body:createBoardBody} = req;
    
    const {locals:{role}}=res;
    // const {params:userId}=req;
    const result=await createBoardByAdmin(role,createBoardBody)
    res.status(result.statusCode).send(new responseHandler(result))
}
catch(error){
    next(error);
}
});


router.post('/createBoard',validateBody(createBoardSchema),authenticateJwtToken,async (req,res,next)=>{
    try{
        const {body:createBoardBody} = req
        
        const{locals:{userId}}=res
        const result=await createBoard(createBoardBody,userId)

        res.status(result.statusCode).send(new responseHandler(result))
    } catch(error){
        next(error);
    }
});



router.post('/adduserToExistingBoard/:userId/:boardId',authenticateJwtToken,async(req,res,next)=>{
    try{
        
        const {locals:{role}}=res;
     
        const {params:{userId,boardId}}=req;
       
       
   
        const result=await addAuserToAExistingBoard(role,userId,boardId);
  
        res.status(result.statusCode).send(new responseHandler(result))
    }catch(error){
        next(error);
    }
});

router.put('/updateBoard/:boardId',validateBody(editBoardSchema),authenticateJwtToken,async(req,res,next)=>{
    try{
        let {body:requiredColumns}=req;
        const{locals:{role,userId}}=res;
        const {params:{boardId}}=req;
        const result=await editBoard(requiredColumns,role,userId,boardId)
        res.status(result.statusCode).send(new responseHandler(result))
    }catch(error){
        next(error);
    }
})


router.put('/updateBoardAdmin/:boardId',validateBody(editBoardSchema),authenticateJwtToken,async(req,res,next)=>{
    try{
        let {body:requiredColumns}=req;
        const{locals:{role}}=res;
        const {params:{boardId}}=req;
        const result=await editBoardAdmin(requiredColumns,role,boardId)
        res.status(result.statusCode).send(new responseHandler(result))
    }catch(error){
        next(error);
    }
})


router.delete('/:boardId',authenticateJwtToken,async(req,res,next)=>{
    try{
    const{locals:{userId,role}}=res;
  
    const{params:{boardId}}=req;
        
        const result=await deleteBoard(userId,role,boardId)
        res.status(result.statusCode).send(new responseHandler(result))
    }catch(error){
        next(error);
    }
});
