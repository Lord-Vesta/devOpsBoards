import UserRoles from "../services/userRoles.services.js";

 const getRolesOfUser = async (req, res) => {
  try {
    const Id = req.params.UserId;
    const checkUserExists = await UserRoles.getUsers(Id);
    console.log(checkUserExists);
    if (checkUserExists.error) {
      res.status(500).json({
        status: 500,
        error: "Database error",
        message: checkUserExists.error.message,
      });
    }
    else if(checkUserExists.result.length){
      const rolesOfUsers = await UserRoles.getRolesOfUser(Id);
      res.status(200).json({
        status: 200,
        message: "data is fetched successfully",
        data: rolesOfUsers.result,
      });
    }
    else if(!checkUserExists.result.length){
      res.status(201).json({
        status: 201,
        message: "User doesnot exists",
        data: [],
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

 const addRolesToUsers = async(req, res) => {
  try {
    const userId = req.params.userId;
    const roleId = req.params.roleId;
    const checkUserExits = await UserRoles.getUsers(userId)
    const checkRoleExists = await UserRoles.checkRoleExists(roleId)
    console.log(checkRoleExists.result.length);
    console.log(checkUserExits.result.length)
    if(!checkUserExits.result.length){
      res.status(201).json({
        status: 201,
        message: "User doesnot exists",
        data: [],
      });
    }
    else if(!checkRoleExists.result.length){
      res.status(201).json({
        status: 201,
        message: "Role doesnot exists",
        data: [],
      });
    }
    else if(checkUserExits.result.length && checkRoleExists.result.length){
      const roleAddedToUser = await UserRoles.addRolesToUsers(userId,roleId)
      console.log(roleAddedToUser);
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

export default{
  getRolesOfUser,
  addRolesToUsers,
}
