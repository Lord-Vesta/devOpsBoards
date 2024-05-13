import { verifyToken } from "../common/utils.js";
import permissionForRoles from "../App/services/permissionForRoles.services.js";
import { roleIdFromRole } from "../App/services/roles.services.js";

import dotenv from "dotenv";
import { messageHandler, responseHandler } from "../common/handlers.js";
import { errorStatusCodes } from "../constants/statusCodes.js";
import { errorMessages } from "../constants/resMessages.js";
dotenv.config();

const { forbiddenMessage } = errorMessages;

const { forbidden } = errorStatusCodes;

const { permissionForRolesisPresent } = permissionForRoles;

const authorize = async (permissionId, role) => {
  try {
    const getRoleIdFromRole = await roleIdFromRole(role);
    const permissionForRolesisPresentResult = await permissionForRolesisPresent(
      getRoleIdFromRole.result[0].Id,
      permissionId
    );
    if (permissionForRolesisPresentResult.result.length) {
      return permissionForRolesisPresentResult.result.length;
    } else {
      throw new messageHandler(forbidden, forbiddenMessage);
    }
  } catch (error) {
    throw error;
  }
};

export const getAuthorize = async (req, res, next) => {
  try {
    const {
      locals: { role },
    } = res;
    const result = await authorize(4, role);
    if (result) {
      next();
    }
  } catch (error) {
    next(error);
  }
};

export const postAuthorize = (req, res, next) => {
  try {
    const {
      locals: { role },
    } = res;
    const result = authorize(1, role);
    if (result) {
      next();
    }
  } catch (error) {
    throw error;
  }
};

export const editAuthorize = () => {
  try {
    const {
      locals: { role },
    } = res;
    const result = authorize(3, role);
    if (result) {
      next();
    }
  } catch (error) {
    throw error;
  }
};

export const deleteAuthorize = () => {
  try {
    const {
      locals: { role },
    } = res;
    const result = authorize(2);
    if (result) {
      next();
    }
  } catch (error) {
    throw error;
  }
};

export default {
  authorize,
};
