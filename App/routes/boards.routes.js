import express from "express";
import { listBoards,adminSpecificBoard,createBoard } from "../controllers/boards.controllers.js";

import { authenticateJwtToken } from "../../Middlewares/jwtAuthMiddleware.js";

export const router = express.Router();

router.get('/',authenticateJwtToken,listBoards);

router.get('/:Id',authenticateJwtToken,adminSpecificBoard);

router.post('/',authenticateJwtToken,createBoard);

