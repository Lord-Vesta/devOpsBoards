import { verifyToken } from "../../common/utils.js";

import {getAllSprints,getUserSprints,getSprintById,createSprintForUser,deleteSprintDb,checkBoardForThatUserExists} from "../services/sprints.services.js"

import { sprintMessages } from "../messages/sprints.messages.js";




const {
    sprint_created,sprint_updated,sprint_deleted,unauthorized,not_found,access_forbidden,bad_request,no_content
}=sprintMessages



export const listAllSprints= async(req,res)=>{
    try{
        const authHeader=req.headers["authorization"];
        const decodedToken=verifyToken(authHeader);
        
        const role=decodedToken.data.role;
        const boardId=req.params.boardId;
        const sprintId=req.params.sprintId;
        const userId=decodedToken.data.id;

        if(role==="admin"){
            const result=await getAllSprints(boardId)
            return result.result
        } else if(role==="user"){
            const userSprintsResponse=await getUserSprints(boardId,sprintId,userId);
            return userSprintsResponse.result
        }
        else{
            throw unauthorized;
        }
    }
    catch(error){
        throw error;
    }
}


export const adminSpecificSprint = async (req, res) => {
    try {

        const authHeader = req.headers["authorization"];
        const { role } = verifyToken(authHeader);
        const boardId=req.params.boarId;
        const sprintId=req.params.sprintId;

        if (role === "admin") {
            const result = await getSprintById(boardId,sprintId)  

            return result.result
        } else {
            throw access_forbidden;
        }


    }
    catch (error) {
        throw error;
    }
}


export const createSprint=async(createSprintBody,id,boardId)=>{
    try{
        const {sprintName,startDate,endDate}=createSprintBody

        if(sprintName=== undefined && startDate===undefined && endDate===undefined){
            throw bad_request;
        }

      const check= await checkBoardForThatUserExists(boardId,id)
      if(check.result.length > 0){
        await createSprintForUser(boardId,sprintName,startDate,endDate);

        return sprint_created;
      } else{
        throw unauthorized
      }

        
    }
    catch(error){
        throw error;
    }
}


export const deleteSprint = async (req,res)=>{
    try {
        const authHeader=req.headers["authorization"];
        const decodedToken=verifyToken(authHeader);

        const userId=decodedToken.data.id;
        const boardId=req.params.boarId;
        const sprintId=req.params.sprintId;

        if(decodedToken.data.role==="admin"){
            console.log("Inside admin");
            await deleteSprintDb(boardId,sprintId);
            return sprint_deleted;
        }
        else if(decodedToken.data.role==="user"){
            console.log("Inside user");
            const result=await checkSprintExists(boardId,sprintId);

            if(result.length > 0){
                await deleteSprintDb(boardId,sprintId);
                return board_deleted;
            }
            else{
                throw unauthorized
            }
        }
    }
    catch(error){
        throw error;
    }
}

