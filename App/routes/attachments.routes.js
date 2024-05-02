import express from 'express';
import multer from "multer"
import attachmentsControllers from '../controllers/attachments.controllers.js';
import { authenticateJwtToken } from '../../Middlewares/jwtAuthMiddleware.js';
import { responseHandler } from '../../common/handlers.js';
import { successStatusCodes } from '../../constants/statusCodes.js';
import { attachmentMessages } from '../messages/attachment.messages.js';

const {ok} = successStatusCodes

const {ATTACHMENT_ADDED_SUCCESSFULLY} = attachmentMessages

const fileUpload = multer()

export const router = express.Router();

router.get('/:taskId/attachments',authenticateJwtToken,async(req,res,next)=>{
    try {
        const listAttachmentsResponse = await attachmentsControllers.getAttachments(req,res)

        res.status(ok).send(new responseHandler(listAttachmentsResponse))
    } catch (error) {
        next(error);
    }
}
)

router.get('/:taskId/attachments/:attachmentId',authenticateJwtToken,async(req,res,next)=>{
    try {
        const listSpecificAttachmentResponse = await attachmentsControllers.getSpecificAttachments(req,res);

        res.status(ok).send(new responseHandler(listSpecificAttachmentResponse))
    } catch (error) {
        next(error);
    }
}
)

router.post("/:taskId/attachments", fileUpload.single("file"),authenticateJwtToken,
async(req,res,next)=>{
    try {
        const file = req.file
        const addAttachmentResponse =  await attachmentsControllers.addAttachments(file,res)
        // console.log(addAttachmentResponse);
        if(addAttachmentResponse.affectedRows){
            res.status(ATTACHMENT_ADDED_SUCCESSFULLY.statusCode).send(new responseHandler(ATTACHMENT_ADDED_SUCCESSFULLY))
        }
    } catch (error) {
        next(error);
    }
}
 );

router.delete("/:taskId/attachments/:attachmentId",authenticateJwtToken,attachmentsControllers.deleteAttachments)