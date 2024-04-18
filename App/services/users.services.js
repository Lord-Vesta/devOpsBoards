import { db } from "../../connection.js";

export const checkAlreadyPresent = (emailId, callback) => {
    db.query(
      "Select emailId,isDeleted,Id from UserTable where emailId = ? and isDeleted = false; ",
      [emailId],
      async (err, result) => {
        if (err) {
            // console.log(err);
            callback(err);
        } else {
            // console.log(result);
          return callback(null,result);
        }
      }
    );
  };

export const login = (emailId, callback)=>{
  // console.log(typeof emailId);
  db.query(`SELECT u.emailId,u.password, u.Id,u.isDeleted, r.Role
  FROM UserTable u
  JOIN rolesForUsers ru ON u.Id = ru.userId
  JOIN Roles r ON ru.RoleId = r.Id
  WHERE u.emailId = ? AND u.isDeleted = false`,[emailId],async function(err,result){
    if(err){
      callback(err)
    }
    else{
      return callback(null,result)
    }
  })
}

export const signup = (emailId, password, isdeleted, callback) => {
  db.query(
    `insert into UserTable (emailId,password,isDeleted) values (?,?,?)`,
    [emailId, password, isdeleted],
    async (err, userResult) => {
      if (err) {
        callback(err);
      } else {
        const userId = userResult.insertId;
        db.query(`insert into rolesForUsers(userId,roleId) values (?,?)`,[userId,1],(err, roleResult) => {
          if(err){
            callback(err)
          }
          else{
            return callback(null, { userResult, roleResult });
          }
        })
      }
    }
  );
};


