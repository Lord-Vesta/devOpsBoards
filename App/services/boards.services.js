// import { result } from "@hapi/joi/lib/base.js"
import {db} from "../../connection.js"


export const getBoards =(Id,callback)=>{
    db.query(`select * from BoardTable where isDeleted= false`,async(err,result)=>{
        if(err){
            callback(err)
        }
        else{
            callback(result)
        }
    })
}


export const getUserBoard =(Id,callback)=>{
    db.query(`select * from BoardTable where Id=? and isDeleted=false`,[Id],async(err,result)=>{
        if(err){
            callback({error:"Database error"});
        }else{
            return callback(result)
        }
    })
}

export const getBoardById=(Id,callback)=>{
    db.query(`Select * from BoardTable where Id=? and isDeleted=false`,[Id],async(err,result)=>{
        if(err){
            callback({error:"Database error"});
        }else{
            return callback(result)
        }
    })
}

export const getUserBoards = (userId, callback) => {
    db.query("SELECT * FROM BoardTable WHERE userId = ? AND isDeleted = false", [userId], (err, result) => {
        if (err) {
            callback(err,null);
        } else {
            callback(null, result);
        }
    });
};



export const createBoardForUser = (userId, title, assignedTo, state, type, callback) => {
   
    if (!title || title.trim() === '') {
        const error = new Error('Title is required');
        error.statusCode = 400; 
        return callback(error);
    }

   
    assignedTo = assignedTo !== undefined ? assignedTo : "Unassigned";
    state = state !== undefined ? state : "To do";
    type = type !== undefined ? type : "Epic";

    const newBoard = {
        userId: userId,
        title: title,
        assignedTo: assignedTo,
        state: state,
        type: type
    };

    db.query("INSERT INTO BoardTable SET ?", newBoard, (err, result) => {
        if (err) {
            callback(err);
        } else {
           
            const responseData = {
                title: newBoard.title,
                assignedTo: newBoard.assignedTo,
                state: newBoard.state,
                type: newBoard.type
            };
            callback(null, responseData);
        }
    });
};


export const editBoardData=(
    fields,
    values,
    callback
)=>{
    db.query(
        `UPDATE BoardTable SET ${fields.join(", ")} WHERE Id = ?`,
        values,
        async (err, result) => {
          if (err) {
            callback({ error: "Database error" });
          } else {
            return callback(result);
          }
        }
      );
};

