import UserRoles from "../services/userRoles.services.js";
import permissionForRoles from "../services/permissionForRoles.services.js";
import { userRoleMessages } from "../messages/userRoles.messages.js";
import { responseHandler } from "../../common/handlers.js";
const { roleOfUserDeletedSuccessfully } = userRoleMessages;


const getRolesOfUser = async (req, res) => {
  try {
    const Id = req.params.UserId;
    const rolesOfUsers = await UserRoles.getRolesOfUser(Id);
    console.log(rolesOfUsers);
    return rolesOfUsers.result;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const addRolesToUsers = async (req, res) => {
  try {
    const{params:{userId, roleId}} = req;

      
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const deleteRoleofUser = async (req, res) => {
  try {
    const {
      params: { userId, roleId },
    } = req;
    const roleOfUserDeleted = await UserRoles.deleteRoleofUser(userId, roleId);

    const deletedRoles = new responseHandler(
      roleOfUserDeletedSuccessfully.statusCode,
      roleOfUserDeleted.result,
      roleOfUserDeletedSuccessfully.message
    );

    return deletedRoles;
  } catch (error) {
    throw error.message;
  }
};

export default {
  getRolesOfUser,
  addRolesToUsers,
  deleteRoleofUser,
};
