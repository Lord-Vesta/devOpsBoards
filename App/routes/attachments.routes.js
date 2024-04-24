import express from 'express';
import multer from "multer"
import attachmentsControllers from '../controllers/attachments.controllers.js';
import { authenticateJwtToken } from '../../Middlewares/jwtAuthMiddleware.js';


const fileUpload = multer()

export const router = express.Router();

router.get('/:taskId/attachments',authenticateJwtToken,attachmentsControllers.getAttachments)

router.get('/:taskId/attachments/:attachmentId',authenticateJwtToken,attachmentsControllers.getSpecificAttachments)

router.post("/:taskId/attachments", fileUpload.single("file"),authenticateJwtToken,attachmentsControllers.addAttachments );

router.delete("/:taskId/attachments/:attachmentId",authenticateJwtToken,attachmentsControllers.deleteAttachments)