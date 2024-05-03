import express from "express";
import { authenticateJwtToken } from "../../Middlewares/jwtAuthMiddleware.js";
import permissionForRoles from "../controllers/permissionForRoles.controllers.js";
import { responseHandler } from "../../common/handlers.js";
import { successStatusCodes } from "../../constants/statusCodes.js";
import rolesMiddleware, { deleteAuthorize, getAuthorize, postAuthorize } from '../../Middlewares/roles.middleware.js';


const { ok } = successStatusCodes;

export const router = express.Router();

const authorizationRoles = ['user','admin']


router.get("/:roleId/permissions",authenticateJwtToken,getAuthorize ,async (req, res, next) => {
  try {
    const {
      params: { roleId },
    } = req;
    const permissionForRolesResponse =
      await permissionForRoles.getPermissionForRoles(roleId);
    res.status(ok).send(new responseHandler(permissionForRolesResponse));
  } catch (error) {
    next(error);
  }
});

router.post("/:roleId/permissions/:permissionId",authenticateJwtToken,postAuthorize ,async (req, res, next) => {
  try {
    const {
      params: { roleId, permissionId },
    } = req;
    const addedPermissionForRolesResponse =
      await permissionForRoles.createPermissionForRoles(roleId, permissionId);
    res
      .status(addedPermissionForRolesResponse.statusCode)
      .send(new responseHandler(addedPermissionForRolesResponse));
  } catch (error) {
    next(error);
  }
});

router.delete(
  "/:roleId/permissions/:permissionId",authenticateJwtToken,deleteAuthorize,async(req,res,next)=>{
    try {
      const {
        params: { roleId, permissionId },
      } = req;
      const deletedPermissionForRolesResponse = await permissionForRoles.deletePermissionForRoles(roleId,permissionId);
      res.status(deletedPermissionForRolesResponse.statusCode).send(new responseHandler(deletedPermissionForRolesResponse));
    } catch (error) {
      next(error);
    }
  }
  
);
