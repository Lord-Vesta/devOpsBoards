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

  } catch (err) {
    throw err;
  }
};

const getUsers = async (Id) => {
  try {
    const [result] = await db
      .promise()
      .query(`select * from UserTable where Id = ? and isDeleted = false`, [
        Id,
      ]);
    return result;
  } catch (err) {
    return err;
  }
};

export const checkRoleExists = async (roleId) => {
  try {
    const [result] = db
      .promise()
      .query(`Select * from Roles where roleId = ?`, [roleId]);
    return result;
  } catch (err) {
    return err;
  }
};

export default {
  getRolesOfUser,
  getUsers,
  checkRoleExists,
};
