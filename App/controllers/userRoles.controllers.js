import UserRoles from "../services/userRoles.services.js";
import permissionForRoles from "../services/permissionForRoles.services.js";
import {userRoleMessages} from "../messages/userRoles.messages.js"
import {responseHandler} from "../../common/handlers.js"
const{roleOfUsersFetchedSuccessfully,roleOfUserDeletedSuccessfully} = userRoleMessages 
const getRolesOfUser = async (req, res) => {
  try {
    const Id = req.params.UserId;

      const rolesOfUsers = await UserRoles.getRolesOfUser(Id);
      const rolesOfUserList = new responseHandler(roleOfUsersFetchedSuccessfully.statusCode,rolesOfUsers.result,roleOfUsersFetchedSuccessfully.message)
    return rolesOfUserList
   } catch (error) {
    console.log(error);
    throw error
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
    const {
      params: {userId,roleId}
    } = req;
    const roleOfUserDeleted = await UserRoles.deleteRoleofUser(
      userId,
      roleId
    );

    const deletedRoles = new responseHandler(roleOfUserDeletedSuccessfully.statusCode,roleOfUserDeleted.result,roleOfUserDeletedSuccessfully.message)

    return deletedRoles;

  } catch (error) {
    throw error.message
  }
};

export default {
  getRolesOfUser,
  addRolesToUsers,
  deleteRoleofUser,
};
