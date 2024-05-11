

import { checkUserExists } from '../services/epics.services.js';
import {listAlluserStory,listUsersUstory,getMembersOfSpecificUserStoryDb,getMemberSpecificUS,ifEpicExistsForThatUser,checkUserStoryExistsAdmin,addAuserToAExistingUserStoryDb,createUserStoryDb} from '../services/userStories.services.js'





export const listAllUserStories=async(userId,role,userstoryId)=>{
    try{
        if(role==="admin"){
            const result=await listAlluserStory();
            return result.result
        }else if(role==="user"){
            const result =await listUsersUstory(epicId,userId)
            return result.result
        }
    }catch(error){
        throw error
    }
};

export const getUserStoriesSpecificMembers=async(role,userId,userstoryId)=>{
    try{
        if(role==="admin"){
            const result=await getMembersOfSpecificUserStoryDb(userstoryId)
            return result.result;
        }else if(role==="user"){
            const result=await getMemberSpecificUS(userstoryId,userId)
            return result.result
        }
    }catch(error){
        throw error
    }
}


export const createUserStory=async(createUserStoryBody,epicId,userId)=>{
    try{
        const {userStoryName,description,state,priority,estimateHours}=createUserStoryBody

        const checkEpicExists=await ifEpicExistsForThatUser(epicId,userId)
        if(checkEpicExists.result.length){
            await createUserStoryDb(userStoryName,description,state,priority,estimateHours,epicId,userId);
            return user_story_created;
        }else{
            throw unauthorized
        }
    }catch(error){
        throw error
    }
}

export const addAuserToAExistingUserStory=async(role,userId,userstoryId)=>{
    try{
        if(role==="admin"){
            const check=await checkUserStoryExistsAdmin(userstoryId);
            if(check.result.length){
                await addAuserToAExistingUserStoryDb(userId,userstoryId)
                return user_added_to_user_story
            }else{
                throw access_forbidden
            }
        }
    }catch(erorr){
        throw error
    }
    
}


export const createUserStoryByAdmin=async(role,createUserStoryBody,epicId)=>{
    try{
        const {userStoryName,description,state,priority,estimateHours}=createUserStoryBody

        if(role==="admin"){
            const ifUserExists=await checkUserExists(Id,epicId);
            if(ifUserExists.result.length){
                await createUserStoryByAdminDb(Id,epicId,userStoryName,description,state,priority,estimateHours)
                return user_story_created
            }else{
                throw not_found
            }
        }else{
            throw access_forbidden
        }
    }catch(error){
        throw error;
    }
}


export const editUserStory=async(role,requiredColumns,userstoryId)=>{
    try{
        if(role==="admin"){
            const ifUserStoryExists=checkUserStoryExistsAdmin(userstoryId);
            if(ifEpicExists.result.length){
                await editUserStoryDb(requiredColumns,userstoryId);

                return user_story_updated

            }else{
                throw not_found
            }
        }else if(role)
    }catch(error){
        throw error
    }
}