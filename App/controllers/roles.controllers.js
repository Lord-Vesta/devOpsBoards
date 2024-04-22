import roles from "../services/roles.services.js";

export const listRoles = async (req, res) => {
  try {
    const result = await roles.getRoles();
    console.log(result);
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
    }
    else if(!result.result.length){
      res.status(204).json({
        status: 204,
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

export const specificRole = async (req, res) => {
  try {
    const roleId = req.params.roleId;
    const result = await roles.getSpecificRole(roleId);
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
      });
    }
  } catch (error) {
    res.status(500).json({
      status: 500,
      error: "server error",
      message: error.message,
    });
  }
};

export const insertRoles = async (req, res) => {
  try {
    const {
      body: { Role },
    } = req;
    console.log("inside insertRoles");
    const isDeleted = false;
    const roleExists = await roles.existingRoles(Role);
    // console.log(roleExists);
    if (roleExists.error) {
      res.status(500).json({
        status: 500,
        error: "Database error",
        message: roleExists.error.message,
      });
    } else if (roleExists.result.length) {
      res.status(409).json({
        status: 409,
        message: "role already exists",
        error:"requested role already exists"
      });
    } else {
      const insertRole = await roles.addRole(Role, isDeleted);
      if (insertRole.error) {
        res.status(500).json({
          status: 500,
          error: "Database error",
          message: insertRole.error.message,
        });
      } else if (insertRole.result.affectedRows) {
        console.log("added");
        res.status(201).json({
          status: 201,
          message: "Role is successfully added",
          data: insertRole.result,
        });
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: 500,
      error: "server error",
      message: error.message,
    });
  }
};

export const updateRole = async (req, res) => {
  try {
    const { Role } = req.body;
    const Id = req.params.roleId;

    if (Id == 1 || Id == 2) {
      res.status(403).json({
        status: 403,
        message: "You are not allowed to update this role",
      });
    } else {
      const roleOfUser = await roles.getSpecificRole(Id);
      if (roleOfUser.error) {
        res.status(500).json({
          status: 500,
          error: "Database error",
          message: roleOfUser.error.message,
        });
      } else if (roleOfUser.result.length) {
        const edittedRole = await roles.editRole(Id, Role);
        if (edittedRole.error) {
          res.status(500).json({
            status: 500,
            error: "Database error",
            message: edittedRole.error.message,
          });
        } else if (edittedRole.result.affectedRows) {
          res.status(200).json({
            status: 200,
            message: "data is successfully updated",
            data: edittedRole.result,
          });
        }
      } else if (!roleOfUser.result.length) {
        res.status(409).json({
          status: 409,
          message: "role not found",
        });
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

export const deleteRole = async (req, res) => {
  try {
    const Id = req.params.roleId;

    if (Id == 1 || Id == 2) {
      res.status(403).json({
        status: 403,
        message: "You are not allowed to delete this role",
      });
    } else {
      const result = await roles.removeRole(Id);
      console.log(result);
      if (result.error) {
        res.status(500).json({
          status: 500,
          error: "Role not found or not updated",
        });
      } else if (result.result.affectedRows) {
        res.status(200).json({
          status: 200,
          message: "data is successfully deleted",
          data: result.result,
        });
      }
    }
  } catch (error) {
    res.status(500).json({
      status: 500,
      error: "server error",
      message: error.message,
    });
  }
};

export default {
  listRoles,
  specificRole,
  insertRoles,
  updateRole,
  deleteRole,
};
