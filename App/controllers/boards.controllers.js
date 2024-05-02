// import { result } from "@hapi/joi/lib/base.js";

// import { func } from "joi";



import { verifyToken } from "../../common/utils.js";
import { getUserBoard, getBoards, getBoardById, createBoardForUser, editBoardData, checkBoardExistforUser,deleteBoardDb } from "../services/boards.services.js"


import * as  responseConstants from "../Constants/responseConstants.js"
import { boardsMessages } from "../messages/boards.messages.js";


const { board_fetched, conflict_message, unauthorized, board_created, board_updated, board_deleted, notFoundMessage, access_forbidden, bad_request, not_found } = boardsMessages




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

// -----------------Get over--------------------------------------------
// ----------------Post started-----------------------------------------


export const createBoard = async (req, res) => {
    try {
        const { title, assignedTo, state, type } = req.body;


        if (!title || title.trim() === '') {

            throw bad_request
        }

        const authHeader = req.headers["authorization"];
        const decodedToken = verifyToken(authHeader);
        const userId = decodedToken.data.id;

        await createBoardForUser(userId, title, assignedTo, state, type);


        return board_created;

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

// //-------------------------------------Post over--------------------------------

// //------------------------------------Put started-------------------------------


// export const editBoard = async (req, res) => {
//     try {
//         const Id = parseInt(req.params.ID);
//         let allowedColumns = [
//             "title",
//             "assignedTo",
//             "state",
//             "type"
//         ];
//         let fields = [];
//         let values = [];
//         const authHeader = req.headers["authorization"];
//         let decodedToken = verifyToken(authHeader);

//         if (decodedToken.data.roles === "admin") {
//             for (let c in allowedColumns) {
//                 if (c in req.body) {
//                     fields.push(`${c} = ?`), values.push(req.body[c]);
//                 }
//             }
//             if (fields.length == 0) {
//                 return res.sendStatus(204);
//             }

//             values.push(Id);
//             editBoardData(fields, values, async function (result) {
//                 if (result) {
//                     res.status(200).json({
//                         status: "Successfully Editted",
//                         data: result,
//                     });

//                 } else {
//                     res.status(400).json({
//                         status: "No data found",
//                     });
//                 }

//             });


//         } else {
//             if (decodedToken.data.ID == req.params.id) {
//                 for (let c of allowedColumns) {
//                     if (c in req.body) {
//                         fields.push(`${c} = ?`), values.push(req.body[c]);
//                     }
//                 }
//                 if (fields.length == 0) {
//                     return res.sendStatus(204);
//                 }

//                 values.push(Id);
//                 editBoardData(fields, values, async function (result) {
//                     if (result) {
//                         res.status(200).json({
//                             status: "Successfully Editted",
//                             data: result,
//                         });
//                     } else {
//                         res.status(400).json({
//                             status: "No data found",
//                         });
//                     }
//                 });
//             }
//             else{
//                 res.status(403).json({
//                     status: 403,
//                     error: "Invalid User Role",
//                     message: "You are not authorized to perform this action."
//                 });
//             }
//         }
//     }
//     catch(err){
//         res.status(500).json({
//             status:500,
//             error:"Server error",
//             message:err.message
//         })
//     }
// }


//-----------------------------------------------Put Board over---------------------------

//-----------------------------------------------Delete Board started---------------------





