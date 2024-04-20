import UserRoles from "../services/userRoles.services.js";

export const getRolesOfUser = async (req, res) => {
  try {
    const Id = req.params.UserId;
    const checkUserExists = await UserRoles.getUsers(Id);
    const rolesOfUsers = await UserRoles.getRolesOfUser(Id);
    if (checkUserExists.error) {
      res.status(500).json({
        status: 500,
        error: "Database error",
        message: checkUserExists.error.message,
      });
    } else if (rolesOfUsers.error) {
      res.status(500).json({
        status: 500,
        error: "Database error",
        message: rolesOfUsers.error.message,
      });
    } else if (checkUserExists.length) {
      if (rolesOfUsers.result.length) {
        res.status(200).json({
          status: 200,
          message: "Roles of user are found",
          data: rolesOfUsers.result,
        });
      }
    } else {
      res.status(404).json({
        status: 404,
        message: "User not found",
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

export const addRolesToUsers = (req, res) => {
  try {
    const userId = req.params.userId;
    const roleId = req.params.roleId;
  } catch (err) {
    res.status(500).json({
      status: 500,
      error: "server error",
      message: err.message,
    });
  }
};
