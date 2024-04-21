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
    return { error: null, result: result };
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

export default {
  getRolesOfUser,
  getUsers,
  checkRoleExists,
  addRolesToUsers
};
