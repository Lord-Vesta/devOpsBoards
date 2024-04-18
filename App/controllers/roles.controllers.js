import { verifyToken } from "../../common/utils.js";
import {
  addRole,
  getRoles,
  getSpecificRole,
  existingRoles,
  editRole,
  removeRole,
} from "../services/roles.services.js";

export const listRoles = (req, res) => {
  try {
    getRoles(async function (result) {
      if (result.length) {
        res.status(201).json({
          status: 201,
          message: "data is fetched successfully",
          data: result,
        });
      } else {
        res.status(200).json({
          status: 200,
          data: result,
        });
      }
    });
  } catch (err) {
    res.status(500).json({
      status: 500,
      error: "server error",
      message: err.message,
    });
  }
};

export const specificRole = (req, res) => {
  try {
    const roleId = req.params.roleId;
    getSpecificRole(roleId, async function (result) {
      if (result.length) {
        res.status(201).json({
          status: 201,
          message: "data is fetched successfully",
          data: result,
        });
      } else {
        res.status(204).json({
          status: 204,
          data: result,
        });
      }
    });
  } catch (err) {
    res.status(500).json({
      status: 500,
      error: "server error",
      message: err.message,
    });
  }
};

export const insertRoles = (req, res) => {
  try {
    const {
      body: { Role },
    } = req;
    console.log("inside insertRoles");
    const isDeleted = false;
    existingRoles(Role, async function (result) {
      console.log("inisde existing roles");
      if (result.length) {
        res.status(200).json({
          status: 200,
          message: "role already exists",
          data: result,
        });
      } else {
        addRole(Role, isDeleted, async function (result) {
          if (result) {
            res.status(200).json({
              status: 200,
              message: "Role is successfully added",
              data: result,
            });
          }
        });
      }
    });
  } catch (err) {
    res.status(500).json({
      status: 500,
      error: "server error",
      message: err.message,
    });
  }
};

export const UpdateRole = (req, res) => {
  try {
    const { role } = req.body;
    console.log(role);
    const Id = req.params.roleId;

    if (Id == 1 || Id == 2) {
      res.status(403).json({
        status: 403,
        message: "You are not allowed to update this role",
      });
    } else {
      getSpecificRole(Id, async function (result) {
        if (result.length) {
          editRole(Id, role, async function (result) {
            if (result) {
              res.status(200).json({
                status: 200,
                message: "data is successfully updated",
                data: result,
              });
            }
          });
        } else {
          res.status(404).json({
            status: 404,
            message: "role not found",
          });
        }
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

// export const updateRoleUser = (req, res) => {
//   try {
//     const { role } = req.body;
//     const authHeader = req.headers["authorization"];
//     const decoded = verifyToken(authHeader);
//     const Id = decoded.data.id;
//     editRole(Id, role, async function (result) {
//       if (result) {
//         res.status(200).json({
//           status: 200,
//           message: "data is successfully updated",
//           data: result,
//         });
//       }
//     });
//   } catch (err) {
//     res.status(500).json({
//       status: 500,
//       error: "server error",
//       message: err.message,
//     });
//   }
// };

export const deleteRole = (req, res) => {
  try {
    const Id = req.params.roleId;

    if (Id == 1 || Id == 2) {
      res.status(403).json({
        status: 403,
        message: "You are not allowed to delete this role",
      });
    } else {
      removeRole(Id, async function (err,result) {
        if (err) {
          res.status(200).json({
            status: 200,
            message: "Database Error",
            error: err.message,
          });
        }
        else{
          res.status(200).json({
            status: 200,
            message: "data is successfully deleted",
            data: result,
          });
        }
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
