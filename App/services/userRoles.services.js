import { db } from "../../connection.js";

const getRolesOfUser = async (Id) => {
  try {
    
    const [result] = await db.promise().query(
      `select r.Role
            from Roles r
           join RolesForUsers ru on ru.roleId = r.Id
           where ru.userId = ? and ru.isdeleted = false;`,
      [Id]
    );

    const rolesArr = result.map(element => element.Role);

    return { error: null, result: rolesArr };
  } catch (error) {
    return { error: error };
  }
};

const getUsers = async (Id) => {
  try {
    const [result] = await db
      .promise()
      .query(`select * from UserTable where Id = ? and isDeleted = false`, [Id]);
    return { error: null, result: result };
  } catch (error) {
    return { error: error };
  }
};

 const checkRoleExists = async (roleId) => {
  try {
    const [result] = await db
      .promise()
      .query(`Select * from Roles where Id = ? and isDeleted = false`, [roleId]);
    return { error: null, result: result };
  } catch (err) {
    return err;
  }
};

 const addRolesToUsers = async(userId,roleId) => {
  try{
    const [result] = await db.promise().query(`insert into RolesForUsers(roleId,userId,isDeleted) values (?,?,?)`,[roleId,userId,false]);

    return{error:null, result: result};
  }
  catch(error){
    return {error:error}
  }
};

const roleForUserExits = async(userId,roleId)=>{
  try{
    const [result] = await db.promise().query(`select Id from RolesForUsers where userId = ? and roleId = ? and isDeleted = false`,[userId,roleId]);
    return {error:null, result: result};
  }catch(error){
    return {error:error}
  }
}

const deleteRoleofUser = async(userId,roleId)=>{
  try{
    const [result] = await db.promise().query(`update RolesForUsers set isDeleted = false where userId = ? and roleId = ?`,[userId,roleId])
    return{error:null, result: result};
  }catch(error){
    return {error:error}
  }
}

const getRoleIdFromRole = async(role)=>{
  try{
    const [result] = await db.promise().query(`select Id from Roles where Role = ? and isDeleted = false`,[role]);
    return{error:null, result: result};
  }catch(error){
    return {error:error}
  }
}

export default {
  getRolesOfUser,
  getUsers,
  checkRoleExists,
  addRolesToUsers,
  roleForUserExits,
  deleteRoleofUser,
  getRoleIdFromRole
};
