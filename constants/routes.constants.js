export const routesConstant = {
    USERROUTES : "/api/user",
    ROLEROUTER : "/api/roles",
    USERROLEROUTES : "/api/users",
    PERMISSIONROUTES : "/api/permissions",
    ATTACHMENTROUTES : "/api/boards",
    ROLEPERMISSIONS : "/api/rolePermissions",
    BOARDSROUTES : "/api/board",
    SPRINTROUTES : "/api/board/sprint",
    EPICROUTES : "/api/board/epic",
    USERSTORYROUTES : "/api/board/userStory"
}

export const userRoutes = {
    SIGNUP : "/signup",
    LOGIN : "/login"
}

export const roleRoutes = {
    GETALLROLES : "/",
    GETSPECIFICROLE : "/:roleId",
    ADDROLE : "/",
    DELETEROLE : "/:roleId",
    UPDATEROLE : "/:roleId"
}

export const permissionRoutes = {
    GETALLPERMISSIONS : "/",
    GETSPECIFICPERMISSION : "/:permissionId",
    ADDPERMISSION : "/",
    DELETEPERMISSION : "/:permissionId",
    UPDATEPERMISSION : "/:permissionId"
}

export const userRoleRoutes = {
    GETUSERROLES : "/:UserId/roles",
    ADDUSERROLE : "/:userId/roles/:roleId",
    DELETEUSERROLE : "/:userId/roles/:roleId"
}

export const permissionForRolesRoutes = {
    GETPERMISSIONFORROLE : "/:roleId/permissions",
    ADDPERMISSIONFORROLE : "/:roleId/permissions/:permissionId",
    DELETEPERMISSIONFORROLE : "/:roleId/permissions/:permissionId"
}

export const attachmentRoutes = {
    GETALLATTACHMENTS : "/:taskId/attachments",
    GETSPECIFICATTACHMENTS : "/:taskId/attachments/:attachmentId",
    ADDATTACHMENT : "/:taskId/attachments",
    DELETEATTACHMENT : "/:taskId/attachments/:attachmentId"
}