import streamifier from 'streamifier'
import {v2 as cloudinary} from 'cloudinary';
import {cloudobj} from '../../config.js'
import attachmentsServices from '../services/attachments.services.js';

cloudinary.config(cloudobj);

const addAttachments = (req,res)=>{
  let streamUpload = (req) => {
    return new Promise((resolve, reject) => {
        let stream = cloudinary.uploader.upload_stream(
          (error, result) => {
            if (result) {
              resolve(result);
            } else {
              reject(error);
            }
          }
        );

      streamifier.createReadStream(req.file.buffer).pipe(stream);
    })
}
async function upload(req) {
    let result = await streamUpload(req);
    console.log(result.secure_url);
    // res.status(200).json({data:result});
    const taskId = req.params.taskId;
    const Url = result.secure_url

    const addAttachmentResult = await attachmentsServices.addAttachments(taskId,Url)

    if(addAttachmentResult.error){
      res.status(500).json({
        status: 500,
        error: "Database error",
        message: addAttachmentResult.error.message,
      });
    }
    else if(addAttachmentResult.result.affectedRows){
      res.status(200).json({
        status: 200,
        message: "attachment added",
        data:addAttachmentResult.result
      })
    }
}
upload(req);
}


const getAttachments = async (req, res) => {
  const taskId = req.params.taskId;
  const getAttachmentsResult = await attachmentsServices.getAttachments(taskId);
  if(getAttachmentsResult.error){
    res.status(500).json({
      status: 500,
      error: "Database error",
      message: getAttachmentsResult.error.message,
    });
  }
  else if(!getAttachmentsResult.result.length){
    res.status(204).json({
      status: 204,
      message: "no attachment found",
    });
  }
  else{
    res.status(200).json({
      status: 200,
      message: "attachment listed",
      data: getAttachmentsResult.result,
    });
  }
}

const getSpecificAttachments = async(req,res)=>{
  const taskId = req.params.taskId;
  const attachmentId = req.params.attachmentId;
  const getSpecificAttachmentsResult = await attachmentsServices.getSpecificAttachments(taskId,attachmentId);
  if(getSpecificAttachmentsResult.error){
    res.status(500).json({
      status: 500,
      error: "Database error",
      message: getSpecificAttachmentsResult.error.message,
    });
  }
  else if(!getSpecificAttachmentsResult.result.length){
    res.status(204).json({
      status: 204,
      message: "no attachment found",
    });
  }
  else{
    res.status(200).json({
      status: 200,
      message: "attachment listed",
      data: getSpecificAttachmentsResult.result,
    });
  }
}

const deleteAttachments = async (req, res) => {
  const taskId = req.params.taskId;
  const attachmentId = req.params.attachmentId;
  const deleteAttachmentsResult = await attachmentsServices.deleteAttachments(taskId,attachmentId);
  if(deleteAttachmentsResult.error){
    res.status(500).json({
      status: 500,
      error: "Database error",
      message: deleteAttachmentsResult.error.message,
    });
  }
  else if(!deleteAttachmentsResult.result.affectedRows){
    res.status(204).json({
      status: 204,
      message: "no attachment found",
    });
  }
  else{
    res.status(200).json({
      status: 200,
      message: "attachment deleted",
      data: deleteAttachmentsResult.result,
    });
  }
}

export default {
  addAttachments,
  getAttachments,
  getSpecificAttachments,
  deleteAttachments
}