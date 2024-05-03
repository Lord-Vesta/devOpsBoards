import streamifier from "streamifier";

import { v2 as cloudinary } from "cloudinary";
import attachmentsServices from "../services/attachments.services.js";
import { attachmentMessages } from "../messages/attachment.messages.js";
import { Cloudinary } from "../../connection.js";

const { ATTACHMENT_DELETED_SUCCESSFULLY,
  ATTACHMENT_NOT_FOUND } = attachmentMessages;



const addAttachments = async (req, res) => {
  try {
    const streamUpload = async(req) => {
      console.log("inside stream upload");
      return new Promise((resolve, reject) => {
        let stream = cloudinary.uploader.upload_stream((error, result) => {
          if (result) {
            resolve(result);
          } else {
            reject(error);
          }
        });

        streamifier.createReadStream(req.file.buffer).pipe(stream);
      })
    
    };

    async function upload(req) {
      const result = await streamUpload(req);
      const taskId = req.params.taskId;
      const Url = result.secure_url;

      const addAttachmentResult = await attachmentsServices.addAttachments(taskId, Url);
      if(addAttachmentResult.result.affectedRows){
        return addAttachmentResult.result
      }
      
    }
    const uploadResult = await upload(req);
    return uploadResult;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const getAttachments = async (req, res) => {
  try {
    const taskId = req.params.taskId;
    const getAttachmentsResult = await attachmentsServices.getAttachments(
      taskId
    );
    return getAttachmentsResult.result;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const getSpecificAttachments = async (req, res) => {
  try {
    const {
      params: { taskId, attachmentId },
    } = req;

    const getSpecificAttachmentsResult =
      await attachmentsServices.getSpecificAttachments(taskId, attachmentId);

    return getSpecificAttachmentsResult.result;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const deleteAttachments = async (req, res) => {
  try {
    const {
      params: { taskId, attachmentId },
    } = req;
  
    const getSpecificAttachments = await attachmentsServices.getSpecificAttachments(taskId,attachmentId)
  
    if(getSpecificAttachments.result.length){
      await attachmentsServices.deleteAttachments(
        taskId,
        attachmentId
      );
      return ATTACHMENT_DELETED_SUCCESSFULLY;
    }
    else{
      throw ATTACHMENT_NOT_FOUND
    }
  
  } catch (error) {
    throw error;
  }
  
};

export default {
  addAttachments,
  getAttachments,
  getSpecificAttachments,
  deleteAttachments,
};
