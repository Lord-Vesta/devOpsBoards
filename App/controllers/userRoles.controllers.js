import UserRoles from "../services/userRoles.services.js";
import { userRoleMessages } from "../messages/userRoles.messages.js";
const { ROLE_OF_USER_DELETED_SUCCESSFULLY } = userRoleMessages;

const getRolesOfUser = async (req, res) => {
  try {
    const Id = req.params.UserId;
    const rolesOfUsers = await UserRoles.getRolesOfUser(Id);
    console.log(rolesOfUsers);
    return rolesOfUsers.result;
  } catch (error) {
    console.log(error);
    throw error.message;
  }
};

const addRolesToUsers = async (req, res) => {
  try {
    const {
      params: { userId, roleId },
    } = req;

    const addRolesToUser = await UserRoles.addRolesToUsers(userId,roleId);
    console.log(addRolesToUser);
  } catch (error) {
    console.log(error);
    throw error.message;
  }
};

const deleteRoleofUser = async (req, res) => {
  try {
    const {
      params: { userId, roleId },
    } = req;

    const listSpecificRoleOfUser = await UserRoles.getSpecificRoleOfUser(
      userId,
      roleId
    );

    if (listSpecificRoleOfUser.result.length) {
      await UserRoles.deleteRoleofUser(userId, roleId);
      return ROLE_OF_USER_DELETED_SUCCESSFULLY;
    } else {
      throw ROLE_OF_USER_NOT_FOUND;
    }
  } catch (error) {
    console.log(error);
    throw error.message;
  }
};

export default {
  getRolesOfUser,
  addRolesToUsers,
  deleteRoleofUser,
};
