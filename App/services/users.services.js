import { db } from "../../connection.js";

const checkAlreadyPresent = async (emailId) => {
  try {
    const [result] = await db
      .promise()
      .query(
        "Select emailID,isDeleted,Id from UserTable where emailId = ? and isDeleted = false",
        [emailId]
      );
    return { error: null, result: result };
  } catch (error) {
    console.error("Error during checkAlreadyPresent:", error);
    return {error:error};
  }
};

const login = async (emailId) => {
  console.log(emailId);
  try {
    const [result] = await db.promise().query(
      `SELECT u.emailID,u.password, u.Id,u.isDeleted, r.Role
      FROM UserTable u
      JOIN rolesForUsers ru ON u.Id = ru.userId
      JOIN Roles r ON ru.RoleId = r.Id
      WHERE u.emailId = ? AND u.isDeleted = false`,
      [emailId]
    );
    return { error: null, result: result };
  } catch (error) {
    console.error("Error during login:", error);
    return {error:error};
  }
};

const signup = async (emailId, password, isdeleted) => {
  try {
    const [userResult] = await db
      .promise()
      .query(
        `insert into UserTable (emailID,password,isDeleted) values (?,?,?)`,
        [emailId, password, isdeleted]
      );
    if (userResult.affectedRows) {
      const userId = userResult.insertId;
      const [roleResult] = await db
        .promise()
        .query(
          `insert into rolesForUsers(userID,roleId,isDeleted) values (?,?,?)`,
          [userId, 1, false]
        );
        if(roleResult.affectedRows) {     
            return { error: null, result: userResult, roleResult };
        }
      }
  } catch (error) {
    console.error("Error during signup:", error);
    return {error:error};
  }
};

export default {
  checkAlreadyPresent,
  login,
  signup,
};
