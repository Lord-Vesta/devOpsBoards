import express from "express";
import { listBoards,adminSpecificBoard,createBoard, editBoard } from "../controllers/boards.controllers.js";

import { authenticateJwtToken } from "../../Middlewares/jwtAuthMiddleware.js";

export const router = express.Router();

router.get('/getBoards',authenticateJwtToken,listBoards);
        
router.get('/:Id',authenticateJwtToken,adminSpecificBoard);

router.post('/createBoard',authenticateJwtToken,createBoard);

router.put('/updateBoard',authenticateJwtToken,editBoard);

