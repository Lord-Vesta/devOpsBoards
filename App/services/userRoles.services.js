export const getRolesOfUser = (Id,callback)=>{
    db.query(`select r.Role
    from Roles r
   join RolesForUsers ru on ru.roleId = r.Id
   where ru.userId = ? and ru.isdeleted = false;`,[Id],async(err,result)=>{
    if(err){
        callback(err)
    }
    else{
        callback(result)
    }
   })
}