import { db } from "../../connection.js";

export const  getSpecificRole = (Id,callback)=>{
    db.query(`select Id,Role from Roles where Id = ? and isDeleted = false`,[Id],async(err,result)=>{
        if(err){
            callback(err)
        }
        else{
            return callback(result)
        }
    })
}

export const getRoles = (callback)=>{
    db.query(`select Id,Role from Roles where isDeleted = false`,async(err,result)=>{
        if(err){
            callback(err)
        }
        else{
            return callback(result)
        }
    })
}


export const addRole = (Role,isDeleted,callback)=>{ 
    console.log(Role,isDeleted);
    db.query(`insert into Roles (Role,isDeleted) values (?,?)`,[Role,isDeleted],async (err,result)=>{
        if(err){
            callback(err)
        }
        else{
            return callback(result)
        }
    })
}

export const existingRoles = (Role,callback)=>{
    db.query(`select * from Roles where Role = ? and isDeleted = false`,[Role],async(err,result)=>{
        if(err){
            callback(err)
        }
        else{
            return callback(result)
        }
    })
}

export const editRole = (Id,Role,callback)=>{
    db.query(`update Roles set Role = ? where Id = ? and isDeleted = false`,[Role,Id],async (err,result)=>{
        if(err){
            callback(err)
        }
        else{
            return callback(result)
        }
    })
}

export const removeRole = (Id,callback)=>{
    db.query(`update Roles set isDeleted = true where Id = ?`,[Id],async(err,deleteRoleResult)=>{
        if(err){
            callback(err)
        }
        else{
            const roleId = Id;
            db.query(`update RolesForUsers set isDeleted = true where roleId = ?`,[roleId],async(err,updateRolesForUsersResult)=>{
                if(err){
                    callback(err)
                }
                else{
                    callback(null,{updateRolesForUsersResult,updateRolesForUsersResult})
                }
            })
        }
    })
}