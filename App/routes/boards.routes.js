import express from "express";
import { listBoards,adminSpecificBoard,createBoard, editBoard,deleteBoard } from "../controllers/boards.controllers.js";

import { authenticateJwtToken } from "../../Middlewares/jwtAuthMiddleware.js";

export const router = express.Router();

import {successStatusCodes} from '../../constants/statusCodes.js'

import { responseHandler } from "../../common/handlers.js";


const {ok} = successStatusCodes

router.get('/getBoards',authenticateJwtToken,async(req,res,next)=>{
    try {
        const result = await listBoards(req,res)

        res.status(ok).send(new responseHandler(result))
    } catch (error) {
        next(error);
    }
});
        
router.get('/:Id',authenticateJwtToken,async (req,res,next)=>{
    try{
        const result =await adminSpecificBoard(req,res)
        res.status(ok).send(new responseHandler(result))
    }
    catch(error){
        next(error);
    }
});

router.post('/createBoard',authenticateJwtToken,async (req,res,next)=>{
    try{
        const result=await createBoard(req,res)
        res.status(result.statusCode).send(new responseHandler(result))
    } catch(error){
        next(error);
    }
});

router.put('/updateBoard',authenticateJwtToken,editBoard);



router.delete('/:boardId',authenticateJwtToken,async(req,res,next)=>{
    try{
        // console.log(res.locals.data.id);
        
        const result=await deleteBoard(req,res)
        res.status(result.statusCode).send(new responseHandler(result))
    }catch(error){
        next(error);
    }
});
