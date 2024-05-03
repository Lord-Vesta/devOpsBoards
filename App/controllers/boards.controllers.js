import { verifyToken } from "../../common/utils.js";

import { getUserBoard, getBoards, getBoardById,checkUserExists, createBoardForUser, editBoardData, checkBoardExistforUser,deleteBoardDb } from "../services/boards.services.js"



import { boardsMessages } from "../messages/boards.messages.js";



const { board_fetched, conflict_message, unauthorized, board_created, board_updated, board_deleted, access_forbidden, bad_request, not_found, } = boardsMessages





export const listBoards = async (req, res) => {
    try {
        const authHeader = req.headers["authorization"];
        const decodedToken = verifyToken(authHeader);
        const userId = decodedToken.data.id;
        const role = decodedToken.data.role;


        if (role === "admin") {
            const { result } = await getBoards();
            console.log(result);

            return result.result;

        } else if (role === "user") {
            const userBoardsResponse = await getUserBoard(userId);
            // console.log(userBoardsResponse);
            return userBoardsResponse.result;
        }
    } catch (err) {
        throw err;
    }
};



export const adminSpecificBoard = async (req, res) => {
    try {
        const authHeader = req.headers["authorization"];
        const { role } = verifyToken(authHeader);

        if (role === "admin") {
            const result = await getBoardById(req.params.boardId);  //check


            return result.result;


        } else {

            throw access_forbidden;
        }
    } catch (err) {
        throw err;
    }
};


export const createBoard = async (createBoardBody,id) => {
    try {
       

        let { title, assignedTo, state, type } = createBoardBody;
      
    

        if (!title || title.trim() === '') {

            throw bad_request
        }

        state = state  ? state : "To do";
        type = type !== undefined ? type : "Epic";
        assignedTo = assignedTo !== undefined ? assignedTo : "Unassigned";
        // console.log(assignedTo);
        if(assignedTo!==undefined){
            const result=  await checkUserExists(assignedTo);
            
            if( result.result.length > 0){
                await createBoardForUser(id, title, assignedTo, state, type);
                return board_created;
            }
            else{
                console.log("False");
                    throw not_found;
            }
        }

        




    } catch (error) {
        console.error("Error creating board:", error);
        throw error;
    };
}
//-----------------------------------Post over----------------------------------
//------------------------------------Put started-------------------------------



export const editBoard = async (req, res) => {
    try {
        const authHeader = req.headers["authorization"];
        const decodedToken = verifyToken(authHeader);
        const userId = decodedToken.data.id;

        const checkBoardCount = await getUserBoard(userId);

        if (checkBoardCount.length < 0) {
            throw not_found;

        }

        else {
            const newData = {
                title,
                assignedTo,
                state,
                type
            };
            await editBoardData(userId, newData);

            res.status(responseConstants.STATUS_OK).send({
                status: responseConstants.STATUS_OK,
                message: responseConstants.MESSAGE_BOARD_EDITED_SUCCESSFULLY,
                data: result
            });
        }
    }

    catch (error) {
        console.error("Error updating board:", error);
        throw error;
    }
}



export const deleteBoard = async (req, res) => {
    try {


       
        const authHeader = req.headers["authorization"];
        const decodedToken = verifyToken(authHeader);
        const userId = decodedToken.data.id;
        const boardId = req.params.boardId;
        console.log(boardId);


        if (decodedToken.data.role === "admin") {

            console.log("Inside admin");
            await deleteBoardDb(boardId);

            return board_deleted
        }

        else if (decodedToken.data.role === "user") {
            console.log("Inside user");
          
                    
           const result= await checkBoardExistforUser(boardId,userId)
           console.log(result.result.length);
           if(result.result.length>0){
                await deleteBoardDb(boardId,userId)
                return board_deleted;
           }
           else{
            throw unauthorized
           }


        }
    }
    catch (error) {
        throw error
    }
}


