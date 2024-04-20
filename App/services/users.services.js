import { db } from "../../connection.js";

 const checkAlreadyPresent = async (emailId) => {
  try {
    const [result] = await db
      .promise()
      .query(
        "Select emailId,isDeleted,Id from UserTable where emailId = ? and isDeleted = false",
        [emailId]
      );
    return { error: null, result: result };
  } catch (err) {
    console.error("Error during checkAlreadyPresent:", err);
    return err;
  }
};

 const login = async (emailId) => {
  try {
    const [result] = await db.promise().query(
      `SELECT u.emailId,u.password, u.Id,u.isDeleted, r.Role
      FROM UserTable u
      JOIN rolesForUsers ru ON u.Id = ru.userId
      JOIN Roles r ON ru.RoleId = r.Id
      WHERE u.emailId = ? AND u.isDeleted = false`,
      [emailId]
    );
    return { error: null, result: result };
  } catch (err) {
    console.error("Error during login:", err);
    return err;
  }
};

 const signup = async (emailId, password, isdeleted) => {
  try{
    const [userResult] = await db
      .promise()
      .query(
        `insert into UserTable (emailId,password,isDeleted) values (?,?,?)`,
        [emailId, password, isdeleted]
      );
    const userId = userResult.insertId;
    const [roleResult] = await db
      .promise()
      .query(`insert into rolesForUsers(userId,roleId) values (?,?)`, [
        userId,
        1,
      ]);
    return { error: null, result: userResult,roleResult };
  }
  catch(err){
    console.error("Error during signup:", err);
    return err;
  }
};

export default {
  checkAlreadyPresent,
  login,
  signup
}
