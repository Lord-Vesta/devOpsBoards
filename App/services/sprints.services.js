

import { result } from "@hapi/joi/lib/base.js";
import { db } from "../../connection.js";


// const getSprints= async()=>{
//     try{
//         const [rows]=await db.promise.query(`select * from sprint where isDeleted=false`);
//         return {result:rows};
//     }catch(error){
//         throw error;
//     }
// };

const getAllSprints= async(boardId)=>{
    try{
        const [rows]=await db.promise().query(`select * from sprint where boardId=? and isDeleted=false`,[boardId,userId]);
        return {result:rows};

    }catch(error){
        throw error;
    }
};

const getSprintById=async(boardId,sprintId)=>{
    try{
        const [rows]=await db.promise().query(`select * from sprint where boardId=? and sprintId=?`,[boardId,sprintId]
    );
    return {result:rows}
    }
    catch(error){
        throw error;
    }
}

const getUserSprints=async(boardId,sprintId,userId)=>{
    try{
        const [rows]=await db.promise.query(`SELECT s.sprintId, s.boardId, su.userId
        FROM SprintUser su
        INNER JOIN sprint s ON su.sprintId = s.sprintId
        INNER JOIN BoardTable bt ON s.boardId = bt.boardId
        WHERE bt.boardId = ?
        AND s.sprintId = ?
        AND su.userId = ?;
        
        `,[boardId,sprintId,userId]);

        return {result:rows};
    }catch(error){
        throw error;
    }
}


const createSprintForUser = async (userId, boardId, sprintName, startDate, endDate) => {
    console.log("Creating Sprint for user...");

    try {
        if (sprintName === undefined && startDate === undefined && endDate === undefined) {
            throw bad_request;
        }

        const newSprint = {

            userId:userId,
            boardId: boardId,
            sprintName:sprintName,
            startDate:startDate,
            endDate:endDate,
            isDeleted:false
        };

        console.log("New sprint object: ", newSprint);

        const [result] = await db.promise().query("insert into sprint set ?", newSprint
        );

        console.log("Sprint created successfully:",result);

        const responseData={
            sprintName: newSprint.sprintName,
            startDate:newSprint.startDate,
            endDate:newSprint.endDate,
            isDeleted:newSprint.isDeleted

        };
        return {result:responseData}
    }
    catch(error){
        throw error
    }
};


const checkSprintExists=async(boardId,sprintId)=>{
    try{
        console.log(boardId);
        console.log(sprintId);
        const [rows]=await db.promise().query(`select * from sprint where boardId=? and sprintId=?`,[boardId,sprintId]
    );
    console.log(rows);
    return {result:rows}
    }
    catch(error){
        throw error;
    }
}

const deleteSprintDb=async(boardId,sprintId)=>{
    try{
        const [rows]=await db.promise().query(`update sprint set isDeleted=true where boardId=? and sprintId=?`,[boardId,sprintId]);

        return {result:rows}
    }catch(error){
        throw error;
    }
}

export {
    getAllSprints,
    getSprintById,
    getUserSprints,
    createSprintForUser,
    checkSprintExists,
    deleteSprintDb
}