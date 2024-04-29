import UserRoles from "../services/userRoles.services.js";
import permissionForRoles from '../services/permissionForRoles.services.js'

 const getRolesOfUser = async (req, res) => {
  try {
    const Id = req.params.UserId;
    const checkUserExists = await UserRoles.getUsers(Id);
    // console.log(checkUserExists);
    if (checkUserExists.error) {
      res.status(500).json({
        status: 500,
        error: "Database error",
        message: checkUserExists.error.message,
      });
    }
    else if(checkUserExists.result.length){
      const rolesOfUsers = await UserRoles.getRolesOfUser(Id);
      res.status(200).json({
        status: 200,
        message: "data is fetched successfully",
        data: rolesOfUsers.result,
      });
    }
    else if(!checkUserExists.result.length){
      res.status(204).json({
        status: 204,
        message: "User doesnot exists",
        data: [],
      });
    }
  } catch (err) {
    res.status(500).json({
      status: 500,
      error: "server error",
      message: err.message,
    });
  }
};

 const addRolesToUsers = async(req, res) => {
  try {
    const userId = req.params.userId;
    const roleId = req.params.roleId;
    const checkUserExits = await UserRoles.getUsers(userId)
    const checkRoleExists = await UserRoles.checkRoleExists(roleId)
    if(!checkUserExits.result.length){
      res.status(204).json({
        status: 204,
        message: "User doesnot exists",
        data: [],
      });
    }
    else if(!checkRoleExists.result.length){
      res.status(204).json({
        status: 204,
        message: "Role doesnot exists",
        data: [],
      });
    }
    if(checkUserExits.result.length && checkRoleExists.result.length){

      const roleOfuser = await UserRoles.getRolesOfUser(userId)

      const rolepermission = await permissionForRoles.getPermissionForRoles(roleId)
      roleOfuser.result.forEach(e=>{
        console.log(e.Role);
      })
      console.log(rolepermission.result);
      // console.log(roleForUsers);

      let roleWithMaxPermissions = null;
      let maxPermissionsCount = -1;
      

    // console.log(rolesWithPermissions.result);

    // rolesWithPermissions.result.forEach(role => {
    //   const permissionsCount = role.permission.length;
    //   if (permissionsCount > maxPermissionsCount) {
    //     maxPermissionsCount = permissionsCount;
    //     roleWithMaxPermissions = role;
    //   }
    // });

    // console.log(roleWithMaxPermissions);

      const roleForUserExists = await UserRoles.roleForUserExits(userId, roleId)
      // console.log(roleForUserExists);
      if(roleForUserExists.result.length){
        res.status(200).json({
          status: 200,
          message: "User already has this role",
          data: [],
        });
      }
      else if(!roleForUserExists.result.length){
        // const getRoleOfUser = await UserRoles.getRolesOfUser(userId)

        // // console.log(getRoleOfUser.result[0].Role);
        
        // const getRoleIdOfRole = await UserRoles.getRoleIdFromRole(getRoleOfUser.result[0].Role)

        // // console.log(getRoleIdOfRole.result[0].Id);

        // const deleteRoleOfUser = await UserRoles.deleteRoleofUser(userId,getRoleIdOfRole.result[0].Id)

        // console.log(deleteRoleOfUser.result);


        const roleAddedToUser = await UserRoles.addRolesToUsers(userId,roleId)
        if(roleAddedToUser.error){
          res.status(500).json({
            status: 500,
            error: "Database error",
            message: roleAddedToUser.error.message,
          });
        }
        else if(roleAddedToUser.result.affectedRows){
          res.status(201).json({
            status: 201,
            message: "data is added successfully",
            data: roleAddedToUser.result,
          })
        }
      }
    }
    
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: 500,
      error: "server error",
      message: err.message,
    });
  }
};

const deleteRoleofUser = async(req,res)=>{
  try{
  const userId = req.params.userId;
  const roleId = req.params.roleId;

  const roleForUserExists = await UserRoles.roleForUserExits(userId, roleId)
  console.log(roleForUserExists);
  if(roleForUserExists.error){
    res.status(500).json({
      status: 500,
      error: "Database error",
      message: roleForUserExists.error.message,
    });
  }
  else if(roleForUserExists.result.length){
    const roleOfUserDeleted = await UserRoles.deleteRoleofUser(userId,roleId);
    console.log(roleOfUserDeleted);
    if(roleOfUserDeleted.error){
      res.status(500).json({
              status: 500,
              error: "Database error",
              message: roleOfUserDeleted.error.message,
            });
    }
    else if(roleOfUserDeleted.result.affectedRows){
      res.status(200).json({
        status: 200,
        message: "data is deleted successfully",
        data: roleOfUserDeleted.result,
      })
    }

  }
  else if(!roleForUserExists.result.length){
    res.status(204).json({
      status: 204,
      message: "role for user doesnot exists",
      data: [],
    });
  }
}
catch(error){
  res.status(500).json({
    status: 500,
    error: "server error",
    message: error.message,
  });
}
}

export default{
  getRolesOfUser,
  addRolesToUsers,
  deleteRoleofUser
}
