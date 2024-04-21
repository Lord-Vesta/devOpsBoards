import permissionServices from "../services/permissions.services.js";

const listPermissions = async (req, res) => {
  const result = await permissionServices.listPermissions();

  if (result.error) {
    res.status(500).json({
      status: 500,
      error: "Database error",
      message: result.error.message,
    });
  } else if (result.result.length) {
    res.status(200).json({
      status: 200,
      message: "permissions listed",
      data: result.result,
    });
  } else if (!result.result.length) {
    res.status(204).json({
      status: 204,
      message: "no permissions found",
    });
  }
};

const specificPermission = async (req, res) => {
  try {
    const Id = req.params.permissionId;

    const result = await permissionServices.specificPermission(Id);
    console.log(result.result.length);
    if (result.error) {
      res.status(500).json({
        status: 500,
        error: "Database error",
        message: result.error.message,
      });
    } else if (result.result.length) {
      console.log(result.result);
      res.status(200).json({
        status: 200,
        message: "permission listed",
        data: result.result,
      });
    } else if (!result.result.length) {
      res.status(204).json({
        status: 204,
        message: "no permission found",
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

const addPermission = async (req, res) => {
  try {
    const {
      body: { Permission },
    } = req;

    const result = await permissionServices.searchBypermissions(Permission);
    if(result.error){
        res.status(500).json({
            status: 500,
            error: "Database error",
            message: result.error.message,
        });
    }
    else if(result.result.length){
        res.status(409).json({
            status: 409,
            error: "Permission already exists",
        });
    }
    else if(!result.result.length){
        const addPermission = await permissionServices.addPermission(Permission);

        if(addPermission.error){
            res.status(500).json({
                status: 500,
                error: "Database error",
                message: addPermission.error.message,
            });
        }
        else if(addPermission.result.affectedRows){
            res.status(200).json({
                status: 200,
                message: "permission added",
                data:addPermission.result
            })
        }
    }
  } catch (error) {
    res.status(500).json({
      status: 500,
      error: "Database error",
      message: result.error.message,
    });
  }
};

const editPermission = async (req, res) => {
    try{    
        const Id = req.params.permissionId;
        const {permission} = req.body

        const result = await permissionServices.specificPermission(Id);

        if(result.error){
            res.status(500).json({
                status: 500,
                error: "Database error",
                message: result.error.message,
            });
        }
        else if(result.result.length){
            const editPermission = await permissionServices.editPermission(Id,permission);
            if(editPermission.error){
                res.status(500).json({
                    status: 500,
                    error: "Database error",
                    message: editPermission.error.message,
                });
            }
            else if(editPermission.result.affectedRows){
                res.status(200).json({
                    status: 200,
                    message: "permission edited",
                    data:editPermission.result
                })
            }
        }
        else if(!result.result.length){
            res.status(204).json({
                status: 204,
                message: "permission not found",
            })
        }


    }catch(error){
        res.status(500).json({
            status: 500,
            error: "Database error",
            message: error.message,
        });
    }
}

const deletePermission = async(req,res)=>{
    try{
        const Id = req.params.permissionId;
        const result = await permissionServices.specificPermission(Id);

        if(result.error){
            res.status(500).json({
                status: 500,
                error: "Database error",
                message: result.error.message,
            });
        }
        else if(result.result.length){
            const deletePermission = await permissionServices.deletePermission(Id)

            if(deletePermission.error){
                res.status(500).json({
                    status: 500,
                    error: "Database error",
                    message: deletePermission.error.message,
                });
            }
            else if(deletePermission.result.affectedRows){
                res.status(200).json({
                    status: 200,
                    message: "permission deleted",
                    data:deletePermission.result
                })
            }
        }
        else if(!result.result.length){
            res.status(204).json({
                status: 204,
                message: "permission not found",
            })
        }
    }catch(error){
        res.status(500).json({
            status: 500,
            error: "Database error",
            message: result.error.message,
        });
    }
}

export default {
  listPermissions,
  specificPermission,
  addPermission,
  editPermission,
  deletePermission
};
