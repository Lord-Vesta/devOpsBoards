import { db } from "../../connection.js";

export const getSpecificRole = async (Id) => {
  try {
    const [result] = await db
      .promise()
      .query(`select Id,Role from Roles where Id = ? and isDeleted = false`, [
        Id,
      ]);
    return { error: null, result: result };
  } catch (error) {
    return {error:error};
  }
};

export const getRoles = async () => {
  try {
    const [result] = await db
      .promise()
      .query(`select Id,Role from Roles where isDeleted = false`);
    return { error: null, result: result };
  } catch (error) {
    return { error: error };
  }
};

export const addRole = async (Role, isDeleted) => {
  try {
    const [result] = await db
      .promise()
      .query(`insert into Roles (Role,isDeleted) values (?,?)`, [
        Role,
        isDeleted,
      ]);

    return { error: null, result: result };
  } catch (error) {
    return {error: error};
  }
};

export const existingRoles = async (Role) => {
  console.log(Role);
  try {
    const [result] = await db
      .promise()
      .query(`select * from Roles where Role = ? and isDeleted = false`, [
        Role,
      ]);
      
    return { error: null, result: result };
  } catch (error) {
    return {error:error};
  }
};

export const editRole = async (Id, Role) => {
  try {
    const [result] = await db
      .promise()
      .query(`update Roles set Role = ? where Id = ? and isDeleted = false`, [
        Role,
        Id,
      ]);

    return { error: null, result: result };
  } catch (error) {
    return {error:error};
  }
};

export const removeRole = async (Id) => {
  try {
    const [result] = await db
      .promise()
      .query(`update Roles set isDeleted = true where Id = ?`, [Id]);
      // console.log(result.affectedRows);
     if(result.affectedRows) {
      const roleId = Id;
      const userRoleDelete = await db
        .promise()
        .query(`update RolesForUsers set isDeleted = true where roleId = ?`, [
          roleId,
        ]);
        // console.log("userRoleDelete");
        return { error: null, result: result, userRoleDelete };
    }
    else{
      return { error: "Role not found or not updated", result: null, userRoleDelete: null };
    }
  } catch (error) {
    return {error:error};
  }
};

export default {
  getSpecificRole,
  getRoles,
  addRole,
  existingRoles,
  editRole,
  removeRole,
};
