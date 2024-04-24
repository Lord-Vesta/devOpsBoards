// import { result } from "@hapi/joi/lib/base.js";

// import { func } from "joi";
import { verifyToken } from "../../common/utils.js"
import { getUserBoard, getBoards, getBoardById, getUserBoards, createBoardForUser,editBoardData } from "../services/boards.services.js"

export const listBoards = (req, res) => {
    try {
        const authHeader = req.headers["authorization"];
        let decodedToken = verifyToken(authHeader);
        if (decodedToken.data.roles === "admin") {
            getBoards(async function (result) {
                if (result.length > 0) {
                    res.status(201).json({
                        status: 201,
                        message: "All the Boards are fetched ",
                        data: result
                    });
                }
                else if (result.length <= 0) {
                    res.status(201).json({
                        status: 201,
                        message: "No boards to display",
                        data: result
                    });
                }

            });
        }
        else if (decodedToken.data.roles === "user") {
            const Id = parseInt(decodedToken.data.ID)
            getUserBoard(Id, async function (result) {
                if (result.length > 0) {
                    res.status(201).json({
                        status: 201,
                        message: "This is your board user!",
                        data: result
                    });
                } else if (result.length <= 0) {
                    res.status(204).json({
                        status: "No boards to display",
                        data: result
                    });
                }
            })
        }

    } catch (err) {
        res.status(200).json({
            status: 500,
            error: "server error",
            message: err.message
        });
    }
};


export const adminSpecificBoard = (req, res) => {
    try {
        const authHeader = req.headers["authorization"];
        let decodedToken = verifyToken(authHeader);
        if (decodedToken.data.roles === "admin") {
            getBoardById(Id, async function (result) {
                if (result.length > 0) {
                    res.status({
                        status: 201,
                        message: "This is the specific board you need Admin",
                        data: result
                    })

                }
                else {
                    res.status(204).json({
                        status: "No boards to display",
                        data: result
                    })
                }
            })
        }
        else {
            res.status(401).json({
                status: "Unauthorized",
                message: "Sorry you are not authorized to use this functionality"
            })
        }
    }
    catch (err) {
        res.status(200).json({
            status: 500,
            error: "server error",
            message: err.message
        });
    }
}

// -----------------------------------Get Over-----------------------------------

//-----------------------------------Post started--------------------------------



export const createBoard = async (req, res) => {
    try {
        const { title, assignedTo, state, type } = req.body;

        if (!title || title.trim() === '') {
            return res.status(400).json({
                status: 400,
                error: "Bad Request",
                message: "Title is required"
            });
        }

        const authHeader = req.headers["authorization"];
        const decodedToken = verifyToken(authHeader);
        const userId = decodedToken.data.ID;

        const userBoards = await getUserBoards(userId);
        if (userBoards.length > 0) {
            return res.status(409).json({
                status: 409,
                error: "Conflict",
                message: "A board has already been created by you"
            });
        }

        createBoardForUser(userId, title, assignedTo, state, type, (err, result) => {
            if (err) {
                return res.status(500).json({
                    status: 500,
                    error: "Server error",
                    message: err.message
                });
            }

            res.status(201).json({
                status: 201,
                message: "Board created successfully",
                data: result
            });
        });
    } catch (err) {
        console.error("Error creating board:", err);
        res.status(500).json({
            status: 500,
            error: "Server error",
            message: err.message
        });
    }
};

//-------------------------------------Post over--------------------------------

//------------------------------------Put started-------------------------------


export const editBoard = async (req, res) => {
    try {
        const Id = parseInt(req.params.ID);
        let allowedColumns = [
            "title",
            "assignedTo",
            "state",
            "type"
        ];
        let fields = [];
        let values = [];
        const authHeader = req.headers["authorization"];
        let decodedToken = verifyToken(authHeader);

        if (decodedToken.data.roles === "admin") {
            for (let c in allowedColumns) {
                if (c in req.body) {
                    fields.push(`${c} = ?`), values.push(req.body[c]);
                }
            }
            if (fields.length == 0) {
                return res.sendStatus(204); //nothing to do
            }

            values.push(Id);
            editBoardData(fields, values, async function (result) {
                if (result) {
                    res.status(200).json({
                        status: "Successfully Editted",
                        data: result,
                    });

                } else {
                    res.status(400).json({
                        status: "No data found",
                    });
                }

            });


        } else {
            if (decodedToken.data.ID == req.params.id) {
                for (let c of allowedColumns) {
                    if (c in req.body) {
                        fields.push(`${c} = ?`), values.push(req.body[c]);
                    }
                }
                if (stmts.length == 0) {
                    return res.sendStatus(204); //nothing to do
                }

                values.push(Id);
                editBoardData(fields, values, async function (result) {
                    if (result) {
                        res.status(200).json({
                            status: "Successfully Editted",
                            data: result,
                        });
                    } else {
                        res.status(400).json({
                            status: "No data found",
                        });
                    }
                });
            }
            else{
                res.status(403).json({
                    status: 403,
                    error: "Invalid User Role",
                    message: "You are not authorized to perform this action."
                });
            }
        }
    }
    catch(err){
        res.status(500).json({
            status:500,
            error:"Server error",
            message:err.message
        })    
    }
}


//-----------------------------------------------Put Board over---------------------------

//-----------------------------------------------Delete Board started---------------------





    