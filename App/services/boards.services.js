


import { db } from "../../connection.js";

const getBoards = async () => {
  try {
    const [rows] = await db.promise().query(
      `SELECT * FROM BoardTable WHERE isDeleted = false`
    );
    return { result: rows };
  } catch (error) {
    throw { error };
  }
};

const getUserBoard = async (userId) => {
  try {
    // console.log(userId);
    const [rows] = await db.promise().query(
      `SELECT * FROM BoardTable WHERE userId = ? AND isDeleted = false`,
      [userId]
    );
    return { result: rows };
  } catch (error) {
    throw { error };
  }
};

const getBoardById = async (boardId) => {
  try {
    const [rows] = await db.promise().query(
      `SELECT * FROM BoardTable WHERE boardId = ? AND isDeleted = false`,
      [boardId]
    );
    return { result: rows };
  } catch (error) {
    throw { error };
  }
};

const createBoardForUser = async (userId, title, assignedTo, state, type) => {
    console.log("Creating board for user...");
    
    try {
        if (!title || title.trim() === '') {
            console.error("Title is required.");
            return { error: new Error('Title is required') };
        }

        console.log("Input parameters validated.");
        
    
        assignedTo = assignedTo !== undefined ? assignedTo : "Unassigned";
        state = state !== undefined ? state : "To do";
        type = type !== undefined ? type : "Epic";

        console.log("Default values set.");

       
        const newBoard = {
            userId: userId,
            title: title,
            assignedTo: assignedTo,
            state: state,
            type: type,
            isDeleted: false 
        };

        console.log("New board object:", newBoard);

        
        const [result] = await db.promise().query(
            "INSERT INTO BoardTable SET ?",
            newBoard
        );

        console.log("Board created successfully:", result);

        
        const responseData = {
            title: newBoard.title,
            assignedTo: newBoard.assignedTo,
            state: newBoard.state,
            type: newBoard.type,
            isDeleted: newBoard.isDeleted 
        };

        return { result: responseData };
    } catch (error) {
        console.error("Error creating board:", error);
        throw { error };
    }
};



// const editBoardData=async (userId,newData={})=>{
//   try{
//    let sql='update BoardTable SET ';
//    let updates=[];

//    if(newData.title !==undefined){
//     updates.push(`title ='${newData.title}'`)
//    }
//    else if(newData.assignedTo !== undefined){
//     updates.push(`assignedTo = '${newData.assignedTo}'`);
//    }
//    else if(newData.state !== undefined){
//     updates.push(`state= ${newData.state}`);
//    }
//    else if(newData.type !== "Epic"){
//     throw new Error("Type can only be an epic");
//    }

//    else if(updates.length===0){
//     return 'No updates were made';
//    }

//    sql += updates.join(', ');
//    sql += ` WHERE userId = ${userId}`;
   
//    const [result] = await db.promise().query(sql);
//    console.log('Board data updated successfully');
//    return result;

//   }
//   catch(error){
//     console.error('Error updating board data:', error);
//     throw error;
//   }
// }

const editBoardData = async (userId, newData) => {
  try {
    console.log("Updating board data...");

    let sql = 'UPDATE BoardTable SET ';
    let updates = [];

    for (const key in newData) {
      if (newData.hasOwnProperty(key)) {
       
        if (key === 'title') {
          updates.push(`title = '${newData[key]}'`);
        } else if (key === 'assignedTo') {
          updates.push(`assignedTo = '${newData[key]}'`);
        } else if (key === 'state') {
          updates.push(`state = '${newData[key]}'`);
        } else if (key === 'type' && newData[key] !== "Epic") {
          throw new Error("Type can only be an epic");
        }
      }
    }

  
    if (updates.length === 0) {
      console.log('No updates were made');
      return { result: 'No updates were made' };
    }

    sql += updates.join(', ');

    sql += ` WHERE userId = ${userId}`;

    const [result] = await db.promise().query(sql);
    console.log('Board data updated successfully');


    const responseData = {
      title: newData.title !== undefined ? newData.title : result.title,
      assignedTo: newData.assignedTo !== undefined ? newData.assignedTo : result.assignedTo,
      state: newData.state !== undefined ? newData.state : result.state,
      type: newData.type !== undefined ? newData.type : result.type,
      isDeleted: result.isDeleted 
    };

    return { result: responseData };
  } catch (error) {
    console.error('Error updating board data:', error);
    throw { error };
  }
};

const checkBoardExistforUser=async(boardId,userId)=>{
  try{
    console.log(boardId);
    console.log(userId);
    const [rows] = await db.promise().query(
      `SELECT * FROM BoardTable WHERE boardId=? AND userId=?`,
      [boardId, userId]
    );
    console.log(rows);
  
  return {result:rows}
  }
  catch(error){
    throw error
  }
}


const deleteBoardDb=async(boardId,userId)=>{
  try{

    const [rows]=await db.promise().query(`UPDATE BoardTable
    SET isDeleted = true
    WHERE boardId = ? AND userID = ?`,[boardId,userId]);
    return {result:rows}
  }
  catch(error){
    throw error
  }
}

export {
  getBoards,
  getUserBoard,
  getBoardById,
  createBoardForUser,
  editBoardData,
  checkBoardExistforUser,
  deleteBoardDb
};


















// // import { result } from "@hapi/joi/lib/base.js"
// import {db} from "../../connection.js"


// export const getBoards =(Id,callback)=>{
//     db.query(`select * from BoardTable where isDeleted= false`,async(err,result)=>{
//         if(err){
//             callback(err)
//         }
//         else{
//             callback(result)
//         }
//     })
// }


// export const getUserBoard =(Id,callback)=>{
//     db.query(`select * from BoardTable where Id=? and isDeleted=false`,[Id],async(err,result)=>{
//         if(err){
//             callback({error:"Database error"});
//         }else{
//             return callback(result)
//         }
//     })
// }

// export const getBoardById=(Id,callback)=>{
//     db.query(`Select * from BoardTable where Id=? and isDeleted=false`,[Id],async(err,result)=>{
//         if(err){
//             callback({error:"Database error"});
//         }else{
//             return callback(result)
//         }
//     })
// }

// export const getUserBoards = async(userId, callback) => {
//     db.query("SELECT * FROM BoardTable WHERE userId = ? AND isDeleted = false", [userId], (err, result) => {
//         if (err) {
//             callback(err,null);
//         } else {
//             callback(null, result);
//         }
//     });
// };



// export const createBoardForUser = (userId, title, assignedTo, state, type, callback) => {
   
//     if (!title || title.trim() === '') {
//         const error = new Error('Title is required');
//         error.statusCode = 400; 
//         return callback(error);
//     }

   
//     assignedTo = assignedTo !== undefined ? assignedTo : "Unassigned";
//     state = state !== undefined ? state : "To do";
//     type = type !== undefined ? type : "Issue";

//     const newBoard = {
//         userId: userId,
//         title: title,
//         assignedTo: assignedTo,
//         state: state,
//         type: type
//     };

//     db.query("INSERT INTO BoardTable SET ?", newBoard, (err, result) => {
//         if (err) {
//             callback(err);
//         } else {
           
//             const responseData = {
//                 title: newBoard.title,
//                 assignedTo: newBoard.assignedTo,
//                 state: newBoard.state,
//                 type: newBoard.type
//             };
//             callback(null, responseData);
//         }
//     });
// };


// export const editBoardData=(
//     fields,
//     values,
//     callback
// )=>{
//     db.query(
//         `UPDATE BoardTable SET ${fields.join(", ")} WHERE Id = ?`,
//         values,
//         async (err, result) => {
//           if (err) {
//             callback({ error: "Database error" });
//           } else {
//             return callback(result);
//           }
//         }
//       );
// };

