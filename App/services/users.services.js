import { db } from "../../connection.js";

export const checkAlreadyPresent = (emailId, callback) => {
    db.query(
      "Select * from UserTable where emailId = ? and isDeleted = false; ",
      [emailId],
      async (err, result) => {
        if (err) {
            // console.log(err);
          callback({ error: "Database error" });
        } else {
            // console.log(result);
          return callback(result);
        }
      }
    );
  };

export const signup = (emailId, password, roleId, isdeleted, callback) => {
  db.query(
    `insert into UserTable (emailId,password,roleId,isDeleted) values (?,?,?,?)`,
    [emailId, password, roleId, isdeleted],
    async (err, result) => {
      if (err) {
        callback({ error: "Database error" });
      } else {
        return callback(result);
      }
    }
  );
};


