import roles from "../services/roles.services.js";

import { RoleMessages } from "../messages/role.messages.js";


const{
  ROLE_ALREADY_EXISTS,
  ROLE_ADDED_SUCCESSFULLY,
  UPDATE_RESTRICTED,
  UPDATE_ROLE,
  ROLE_NOT_FOUND,
  ROLE_DELETED_SUCCESSFULLY
  
} = RoleMessages

export const listRoles = async (req, res) => {
  try {
    const listOfRolesResult = await roles.getRoles();
    return listOfRolesResult.result;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const specificRole = async (req, res) => {
  try {
    const {
      params: { roleId },
    } = req;
    const listSpecificRolesResult = await roles.getSpecificRole(roleId);
    return listSpecificRolesResult.result;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const insertRoles = async (req, res) => {
  try {
    const {
      body: { Role },
    } = req;
    const roleExists = await roles.existingRoles(Role);
    if (roleExists.result.length) {
      throw ROLE_ALREADY_EXISTS
    } else {
       roles.addRole(Role);
      return ROLE_ADDED_SUCCESSFULLY;
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const updateRole = async (req, res) => {
  try {
    const { body:{Role},params:{roleId} } = req
    console.log(Role,roleId);

    if (roleId == 1 || roleId == 2) {
      throw UPDATE_RESTRICTED;
    } else {
      const RoleExists = await roles.getSpecificRole(roleId);
       if (RoleExists.result.length) {
        await roles.editRole(roleId, Role);
        return UPDATE_ROLE;
        
      } else if (!RoleExists.result.length) {
        throw ROLE_NOT_FOUND
      }
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const deleteRole = async (req, res) => {
  try {
    const Id = req.params.roleId;
    console.log(Id);

    if (Id == 1 || Id == 2) {
      throw UPDATE_RESTRICTED;
    } else {
      const RoleExists = await roles.getSpecificRole(Id);
      if(RoleExists.result.length){
        await roles.removeRole(Id);
        return ROLE_DELETED_SUCCESSFULLY
      }
      else if(!RoleExists.result.length)
      {
        throw ROLE_NOT_FOUND
      }
      
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export default {
  listRoles,
  specificRole,
  insertRoles,
  updateRole,
  deleteRole,
};
