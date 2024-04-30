import { verifyToken } from "../../common/utils.js";
import { getUserBoard, getBoards, getBoardById, createBoardForUser,editBoardData } from "../services/boards.services.js"

export const listBoards = async (req, res) => {
    try {
        const authHeader = req.headers["authorization"];
        const decodedToken = verifyToken(authHeader);
        const userId = decodedToken.data.id;
        const role = decodedToken.data.role;

        if (role === "admin") {
            const { result } = await getBoards();
            if (result.length > 0) {
                res.status(responseConstants.STATUS_OK).send({
                    status: responseConstants.STATUS_OK,
                    message: responseConstants.MESSAGE_BOARDS_FETCHED,
                    data: result
                });
            } else {
                res.status(responseConstants.STATUS_NO_CONTENT).send({
                    status: responseConstants.STATUS_NO_CONTENT,
                    message: responseConstants.MESSAGE_NO_BOARDS,
                    data: result
                });
            }
        } else if (role === "user") {
            const userBoardsResponse = await getUserBoard(userId);
            const userBoards = userBoardsResponse.result;
            if (userBoards.length > 0) {
                res.status(responseConstants.STATUS_OK).send({
                    status: responseConstants.STATUS_OK,
                    message: responseConstants.MESSAGE_YOUR_BOARD_USER,
                    data: userBoards
                });
            } else {
                res.status(responseConstants.STATUS_NO_CONTENT).send({
                    status: responseConstants.STATUS_NO_CONTENT,
                    message: responseConstants.MESSAGE_NO_BOARDS,
                    data: userBoards
                });
            }
        }
    } catch (err) {
        console.error("Error in listBoards:", err);
        res.status(responseConstants.STATUS_SERVER_ERROR).send({
            status: responseConstants.STATUS_SERVER_ERROR,
            error: responseConstants.ERROR_SERVER,
            message: err.message || "Unknown error"
        });
    }
};



export const adminSpecificBoard = async (req, res) => {
    try {
        const authHeader = req.headers["authorization"];
        const { role } = verifyToken(authHeader);

        if (role === "admin") {
            const result = await getBoardById(req.params.ID);

            if (result.length > 0) {
                res.status(responseConstants.STATUS_CREATED).send({
                    status: responseConstants.STATUS_CREATED,
                    message: responseConstants.MESSAGE_SPECIFIC_BOARD_ADMIN,
                    data: result
                });
            } else {
                res.status(responseConstants.STATUS_NO_CONTENT).send({
                    status: responseConstants.STATUS_NO_CONTENT,
                    message: responseConstants.MESSAGE_NO_BOARDS,
                    data: result
                });
            }
        } else {
            res.status(responseConstants.STATUS_UNAUTHORIZED).send({
                status: responseConstants.STATUS_UNAUTHORIZED,
                message: responseConstants.MESSAGE_UNAUTHORIZED,
            });
        }
    } catch (err) {
        res.status(responseConstants.STATUS_SERVER_ERROR).send({
            status: responseConstants.STATUS_SERVER_ERROR,
            error: responseConstants.ERROR_SERVER,
            message: err.message
        });
    }
};


export const createBoard = async (req, res) => {
    try {
        const { title, assignedTo, state, type } = req.body;

      
        if (!title || title.trim() === '') {
            return res.status(400).send({
                status: responseConstants.STATUS_BAD_REQUEST,
                error: responseConstants.ERROR_BAD_REQUEST,
                message: responseConstants.MESSAGE_TITLE_REQUIRED
            });
        }

        const authHeader = req.headers["authorization"];
        const decodedToken = verifyToken(authHeader);
        const userId = decodedToken.data.id;

        await createBoardForUser(userId, title, assignedTo, state, type);

        res.status(responseConstants.STATUS_CREATED).send({
            status: responseConstants.STATUS_CREATED,
            message: responseConstants.MESSAGE_BOARD_CREATED_SUCCESSFULLY,
            data: { title, assignedTo, state, type, isDeleted: false } 
        });
    } catch (error) {
        console.error("Error creating board:", error);
        res.status(responseConstants.STATUS_SERVER_ERROR).send({
            status: responseConstants.STATUS_SERVER_ERROR,
            error: responseConstants.ERROR_SERVER,
            message: error.message
        });
    }
};


export const editBoard= async (req,res)=>{
    try{
        const authHeader=req.headers["authorization"];
        const decodedToken = verifyToken(authHeader);
        const userId = decodedToken.data.id;

        const checkBoardCount=await getUserBoard(userId);

        if(checkBoardCount.length < 0){
            return res.status(409).send({
                status: responseConstants.STATUS_NO_DATA_FOUND,
                error: responseConstants.ERROR_NO_DATA_FOUND,
                message: responseConstants.MESSAGE_BOARD_NOT_FOUND
            });
        }

   
        else{
            const newData = {
                title,
                assignedTo,
                state,
                type
              };
            await editBoardData(userId,newData);

            res.status(responseConstants.STATUS_OK).send({
                status: responseConstants.STATUS_OK,
                message: responseConstants.MESSAGE_BOARD_EDITED_SUCCESSFULLY,
                data: result
            });
        }
    }

    catch(error){
        console.error("Error updating board:", error);
        res.status(responseConstants.STATUS_SERVER_ERROR).send({
            status: responseConstants.STATUS_SERVER_ERROR,
            error: responseConstants.ERROR_SERVER,
            message: error.message
        });
    }
}




    