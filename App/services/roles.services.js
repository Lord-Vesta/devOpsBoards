import { db } from "../../connection.js";

export const getRoles = (callback)=>{
    db.query(`select * from Boards`,async(err,result)=>{
        if(err){
            callback(err)
        }
        else{
            console.log(result);
        }
    })
}

