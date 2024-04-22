import getPermissionForRolesServices from "../services/permissionForRoles.services.js";
import rolesServices from "../services/roles.services.js";
import permissionsService from "../services/permissions.services.js";

const getPermissionForRoles = async (req, res) => {
  try {
    const Id = req.params.roleId;

    const result = await getPermissionForRolesServices.getPermissionForRoles(
      Id
    );

    if (result.error) {
      res.status(500).json({
        status: 500,
        error: "Database error",
        message: result.error.message,
      });
    } else if (result.result.length) {
      res.status(200).json({
        status: 200,
        message: "data is fetched successfully",
        data: result.result,
      });
    } else if (!result.result.length) {
      res.status(204).json({
        status: 204,
        message: "data is not found",
        data: result.result,
      });
    }
  } catch (error) {
    res.status(500).json({
      status: 500,
      error: "Database error",
      message: result.error.message,
    });
  }
};

const createPermissionForRoles = async (req, res) => {
  try {
    const roleId = req.params.roleId;
    const permissionId = req.params.permissionId;

    console.log(roleId, permissionId);

    const isRolePresent = await rolesServices.getSpecificRole(roleId);

    const isPermissionPresent = await permissionsService.specificPermission(
      permissionId
    );
    console.log(isRolePresent, isPermissionPresent);
    if (!isRolePresent.result.length || !isPermissionPresent.result.length) {
      res.status(200).json({
        status: 200,
        message: "role or permission is not found",
      });
    } else if (
      isPermissionPresent.result.length &&
      isRolePresent.result.length
    ) {
      const permissionForRolesisPresent =
        await getPermissionForRolesServices.permissionForRolesisPresent(
          roleId,
          permissionId
        );

      if (permissionForRolesisPresent.result.length) {
        res.status(200).json({
          status: 200,
          message: "permission is already present in this role",
        });
      } else if (!permissionForRolesisPresent.result.length) {
        const result =
          await getPermissionForRolesServices.createPermissionForRoles(
            roleId,
            permissionId
          );

        if (result.error) {
          res.status(500).json({
            status: 500,
            error: "Database error",
            message: result.error.message,
          });
        } else if (result.result.affectedRows) {
          res.status(201).json({
            status: 201,
            message: "data is added successfully",
            data: result.result,
          });
        } else if (!result.result.affectedRows) {
          res.status(204).json({
            status: 204,
            message: "data is not added successfully",
            data: result.result,
          });
        }
      }
    }
  } catch (error) {
    res.status(500).json({
      status: 500,
      error: "Database error",
      message: error.message,
    });
  }
};

const deletePermissionForRoles = async (req, res) => {
  try {
    const roleId = req.params.roleId;
    const permissionId = req.params.permissionId;

    const permissionForRolesisPresent =
      await getPermissionForRolesServices.permissionForRolesisPresent(
        roleId,
        permissionId
      );

    if (permissionForRolesisPresent.result.length) {
      const result =
        await getPermissionForRolesServices.deletePermissionForRole(
          roleId,
          permissionId
        );

      if (result.result.affectedRows) {
        res.status(200).json({
          status: 200,
          message: "data is deleted successfully",
          data: result.result,
        });
      }
    }
    else if(!permissionForRolesisPresent.result.length){
        res.status(204).json({
            status: 204,
            message: "permission is not present in this role",
        })
    }
  } catch (error) {
    res.status(500).json({
      status: 500,
      error: "Database error",
      message: error.message,
    });
  }
};

export default {
  getPermissionForRoles,
  createPermissionForRoles,
  deletePermissionForRoles,
};
