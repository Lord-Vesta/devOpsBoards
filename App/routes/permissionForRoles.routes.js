import express from "express";
import { authenticateJwtToken } from "../../Middlewares/jwtAuthMiddleware.js";
import permissionForRoles from "../controllers/permissionForRoles.controllers.js";
import { responseHandler } from "../../common/handlers.js";
import { successStatusCodes } from "../../constants/statusCodes.js";

const { ok } = successStatusCodes;

export const router = express.Router();

router.get("/:roleId/permissions",authenticateJwtToken, async (req, res, next) => {
  try {
    const permissionForRolesResponse =
      await permissionForRoles.getPermissionForRoles(req, res);
    res.status(ok).send(new responseHandler(permissionForRolesResponse));
  } catch (error) {
    next(error);
  }
});

router.post("/:roleId/permissions/:permissionId",authenticateJwtToken ,async (req, res, next) => {
  try {
    const addedPermissionForRolesResponse =
      await permissionForRoles.createPermissionForRoles(req, res);
    res
      .status(addedPermissionForRolesResponse.statusCode)
      .send(new responseHandler(addedPermissionForRolesResponse));
  } catch (error) {
    next(error);
  }
});

router.delete(
  "/:roleId/permissions/:permissionId",authenticateJwtToken,async(req,res,next)=>{
    try {
      const deletedPermissionForRolesResponse = await permissionForRoles.deletePermissionForRoles(req,res);

      res.status(deletedPermissionForRolesResponse.statusCode).send(new responseHandler(deletedPermissionForRolesResponse));
    } catch (error) {
      next(error);
    }
  }
  
);
